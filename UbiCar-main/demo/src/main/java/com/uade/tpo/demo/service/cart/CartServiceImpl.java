package com.uade.tpo.demo.service.cart;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BlockedDateRepository blockedDateRepository;

    @Deprecated
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

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(CartNotFoundException::new);

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(ProductNotFoundException::new);

        if (!product.isActive()) {
            throw new RuntimeException("El producto no está activo");
        }
        if (request.getDate().isBefore(LocalDate.now())) {
        throw new RuntimeException("No podés reservar en una fecha pasada");
        }
        boolean blocked = blockedDateRepository.existsByProductIdAndDate(
                request.getProductId(), request.getDate());
        if (blocked) {
            throw new RuntimeException("La cochera no está disponible para esa fecha");
        }

        boolean alreadyInCart = cart.getItems().stream()
                .anyMatch(item -> item.getProduct().getId().equals(request.getProductId())
                        && item.getDate().equals(request.getDate()));
        if (alreadyInCart) {
            throw new ProductInCartException();
        }

        // crear nuevo item
        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        item.setDate(request.getDate());
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

        boolean blocked = blockedDateRepository.existsByProductIdAndDate(
                request.getProductId(), request.getDate());
        if (blocked) {
            throw new RuntimeException("La cochera no está disponible para esa fecha");
        }

        for (CartItem item : cart.getItems()) {
            if (item.getProduct().getId().equals(request.getProductId())) {
                item.setDate(request.getDate());
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
            boolean blocked = blockedDateRepository.existsByProductIdAndDate(
                    item.getProduct().getId(), item.getDate());
            if (blocked) {throw new RuntimeException("La cochera " + item.getProduct().getTitle() + " ya no está disponible para " + item.getDate());
            }

            Reservation reservation = Reservation.builder()
                    .user(user)
                    .product(item.getProduct())
                    .date(item.getDate())
                    .total(item.getProduct().getPrice())
                    .status(ReservationStatus.PENDING)
                    .build();
            reservationRepository.save(reservation);

            BlockedDate blockedDate = BlockedDate.builder()
                    .product(item.getProduct())
                    .date(item.getDate())
                    .build();
            blockedDateRepository.save(blockedDate);
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