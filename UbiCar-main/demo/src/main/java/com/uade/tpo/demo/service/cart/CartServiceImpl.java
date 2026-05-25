package com.uade.tpo.demo.service.cart;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.uade.tpo.demo.controllers.cart.CartItemRequest;
import com.uade.tpo.demo.entity.BlockedDate;
import com.uade.tpo.demo.entity.Cart;
import com.uade.tpo.demo.entity.CartItem;
import com.uade.tpo.demo.entity.Product;
import com.uade.tpo.demo.entity.Reservation;
import com.uade.tpo.demo.entity.ReservationStatus;
import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.repository.BlockedDateRepository;
import com.uade.tpo.demo.repository.CartItemRepository;
import com.uade.tpo.demo.repository.CartRepository;
import com.uade.tpo.demo.repository.ProductRepository;
import com.uade.tpo.demo.repository.ReservationRepository;
import com.uade.tpo.demo.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.security.core.Authentication;

import com.uade.tpo.demo.exceptions.cart.CartNotFoundException;
import com.uade.tpo.demo.exceptions.cart.EmptyCartException;
import com.uade.tpo.demo.exceptions.cart.ProductInCartException;
import com.uade.tpo.demo.exceptions.cart.ProductNotFoundException;
import com.uade.tpo.demo.exceptions.cart.ProductNotInCartException;
import com.uade.tpo.demo.exceptions.cart.UserNotFoundException;


@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BlockedDateRepository blockedDateRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    private static final int CART_EXPIRATION_MINUTES = 15;

    // obtener usuario logueado
    private User getUserFromToken() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
    }

    private Cart getCartForUser(User user) {
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(CartNotFoundException::new);

        if (cart.getExpiresAt() != null && LocalDateTime.now().isAfter(cart.getExpiresAt())) {
            cart.getItems().clear();
            cart.setExpiresAt(null);
            cartRepository.save(cart);
        }

        return cart;
    }

    // obtener carrito actual
    @Override
    public Cart getCart() {

        User user = getUserFromToken();

        return getCartForUser(user);
    }

    // agregar producto al carrito
    @Override
    public Cart addProduct(CartItemRequest request) {

        User user = getUserFromToken();

        Cart cart = getCartForUser(user);

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(ProductNotFoundException::new);

        if (!product.isActive()) {
            throw new RuntimeException("El producto no está activo");
        }

        if (request.getStartDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("La fecha de inicio no puede ser en el pasado");
        }

        if (!request.getEndDate().isAfter(request.getStartDate())) {
            throw new RuntimeException("La fecha de fin debe ser posterior a la de inicio");
        }

        LocalDate current = request.getStartDate();
        while (!current.isAfter(request.getEndDate())) {
            if (blockedDateRepository.existsByProductIdAndDate(request.getProductId(), current)) {
                throw new RuntimeException("La cochera no está disponible el " + current);
            }
            current = current.plusDays(1);
        }

        boolean alreadyInCart = cart.getItems().stream()
                .anyMatch(item -> item.getProduct().getId().equals(request.getProductId())
                        && !item.getEndDate().isBefore(request.getStartDate())
                        && !item.getStartDate().isAfter(request.getEndDate()));
        if (alreadyInCart) {
            throw new ProductInCartException();
        }

        // Crear nuevo item
        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        item.setStartDate(request.getStartDate());
        item.setEndDate(request.getEndDate());
        cart.getItems().add(item);

        cart.setExpiresAt(LocalDateTime.now().plusMinutes(CART_EXPIRATION_MINUTES));

        return cartRepository.save(cart);
    }
    // modificar fecha de un producto en el carrito
    @Override
    public Cart modifyCart(CartItemRequest request) {

        User user = getUserFromToken();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(CartNotFoundException::new);

        LocalDate current = request.getStartDate();
        while (!current.isAfter(request.getEndDate())) {
            if (blockedDateRepository.existsByProductIdAndDate(request.getProductId(), current)) {
                throw new RuntimeException("La cochera no está disponible el " + current);
            }
            current = current.plusDays(1);
        }

        for (CartItem item : cart.getItems()) {
            if (item.getProduct().getId().equals(request.getProductId())) {
                item.setStartDate(request.getStartDate());
                item.setEndDate(request.getEndDate());
                return cartRepository.save(cart);
            }
        }

        throw new ProductNotInCartException();
    }

    // confirmar compra y vaciar carrito
    @Transactional
    @Override
    public Cart confirmCart() {

        User user = getUserFromToken();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(CartNotFoundException::new);

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new EmptyCartException();
        }
        //crear reserva
        for (CartItem item : cart.getItems()) {

            // verificar que ningún día del rango esté bloqueado
            LocalDate current = item.getStartDate();
            while (!current.isAfter(item.getEndDate())) {
                if (blockedDateRepository.existsByProductIdAndDate(item.getProduct().getId(), current)) {
                    throw new RuntimeException("La cochera " + item.getProduct().getTitle() 
                        + " ya no está disponible el " + current);
                }
                current = current.plusDays(1);
            }

            //calcular total x cantidad de días
            long days = ChronoUnit.DAYS.between(item.getStartDate(), item.getEndDate()) + 1;
            double total = item.getProduct().getPrice() * days;

            Reservation reservation = Reservation.builder()
                    .user(user)
                    .product(item.getProduct())
                    .startDate(item.getStartDate())
                    .endDate(item.getEndDate())
                    .total(total)
                    .status(ReservationStatus.PENDING)
                    .build();
            reservationRepository.save(reservation);

            LocalDate day = item.getStartDate();
            while (!day.isAfter(item.getEndDate())) {
                BlockedDate blockedDate = BlockedDate.builder()
                        .product(item.getProduct())
                        .date(day)
                        .build();
                blockedDateRepository.save(blockedDate);
                day = day.plusDays(1);
            }
        }

        cart.getItems().clear();
        cart.setExpiresAt(null);

        return cartRepository.save(cart);
        }  

    @Scheduled(fixedRate = 10 * 60 * 1000)
    @Transactional
    public void clearExpiredCarts() {
        List<Cart> expiredCarts = cartRepository.findByExpiresAtBefore(LocalDateTime.now());
        for (Cart cart : expiredCarts) {
            cart.getItems().clear();
            cart.setExpiresAt(null);
        }
        cartRepository.saveAll(expiredCarts);
    }
}