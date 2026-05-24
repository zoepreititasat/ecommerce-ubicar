package com.uade.tpo.demo.service.product;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.demo.controllers.product.ProductRequest;
import com.uade.tpo.demo.controllers.product.ProductResponse;
import com.uade.tpo.demo.controllers.product.ProductStatusRequest;
import com.uade.tpo.demo.controllers.product.ProductUpdateRequest;
import com.uade.tpo.demo.entity.Image;
import com.uade.tpo.demo.entity.Product;
import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.VehicleType;
import com.uade.tpo.demo.exceptions.cart.ProductNotFoundException;
import com.uade.tpo.demo.exceptions.product.ProductAlreadyExistsException;
import com.uade.tpo.demo.exceptions.product.ProductUnauthorizedException;
import com.uade.tpo.demo.repository.ImageRepository;
import com.uade.tpo.demo.repository.ProductRepository;
import com.uade.tpo.demo.repository.UserRepository;
import com.uade.tpo.demo.service.AuthenticationService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private ImageRepository imageRepository;


    private ProductResponse toResponse(Product product, boolean aplicarDescuentoPrimeraCompra) {
        List<Long> imageIds = imageRepository.findByProductId(product.getId())
                .stream().map(Image::getId).toList();

        Double finalPrice = product.getPrice();
        if (aplicarDescuentoPrimeraCompra) {
            finalPrice = finalPrice * 0.85;
        }

        return ProductResponse.builder()
                .id(product.getId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .finalPrice(finalPrice)
                .vehicleType(product.getVehicleType())
                .active(product.isActive())
                .sellerId(product.getSeller().getId())
                .imageIds(imageIds)
                .build();
    }


    public List<ProductResponse> getAvailableProducts(LocalDate date) {
        User user = authenticationService.getCurrentUser();
        boolean descuento = !user.isPrimeraCompraRealizada();
        return productRepository.findAvailableProducts(date)
                .stream()
                .map(p -> toResponse(p, descuento))
                .toList();
    }

    public List<ProductResponse> getActiveProducts() {
        User user = authenticationService.getCurrentUser();
        boolean descuento = !user.isPrimeraCompraRealizada();
        return productRepository.findByActiveTrue()
                .stream()
                .map(p -> toResponse(p, descuento))
                .toList();
    }

    public ProductResponse getProductById(Long id) {
        User user = authenticationService.getCurrentUser();
        boolean descuento = !user.isPrimeraCompraRealizada();
        return toResponse(
                productRepository.findById(id).orElseThrow(ProductNotFoundException::new),
                descuento
        );
    }

    public List<ProductResponse> getProductsBySellerId(Long sellerId) {
        User user = authenticationService.getCurrentUser();
        boolean descuento = !user.isPrimeraCompraRealizada();
        return productRepository.findBySellerId(sellerId)
                .stream()
                .map(p -> toResponse(p, descuento))
                .toList();
    }

    public List<ProductResponse> getProductsByVehicleType(VehicleType vehicleType) {
        User user = authenticationService.getCurrentUser();
        boolean descuento = !user.isPrimeraCompraRealizada();
        return productRepository.findByVehicleType(vehicleType)
                .stream()
                .map(p -> toResponse(p, descuento))
                .toList();
    }

    public List<ProductResponse> getProductsByPriceRange(Double minPrice, Double maxPrice) {
        User user = authenticationService.getCurrentUser();
        boolean descuento = !user.isPrimeraCompraRealizada();
        return productRepository.findByPriceBetween(minPrice, maxPrice)
                .stream()
                .map(p -> toResponse(p, descuento))
                .toList();
    }

    public ProductResponse createProduct(ProductRequest request) {
        User seller = authenticationService.getCurrentUser();

        Optional<Product> existingProduct = productRepository.findByTitleAndAddressAndSellerId(
                request.getTitle(), request.getAddress(), seller.getId()
        );
        if (existingProduct.isPresent()) throw new ProductAlreadyExistsException();

        Product product = Product.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .address(request.getAddress())
                .active(request.getActive())
                .vehicleType(VehicleType.valueOf(request.getVehicleType().toUpperCase()))
                .seller(seller)
                .build();

        productRepository.save(product);
        return toResponse(product, false);
    }

    public ProductResponse updateProduct(Long id, ProductUpdateRequest request) {
        User seller = authenticationService.getCurrentUser();
        Product product = productRepository.findById(id).orElseThrow(ProductNotFoundException::new);

        if (!product.getSeller().getId().equals(seller.getId())) throw new ProductUnauthorizedException();

        if (request.getTitle() != null) product.setTitle(request.getTitle());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getAddress() != null) product.setAddress(request.getAddress());
        if (request.getVehicleType() != null) product.setVehicleType(VehicleType.valueOf(request.getVehicleType().toUpperCase()));

        productRepository.save(product);
        return toResponse(product, false);
    }

    public ProductResponse updateProductState(Long id, ProductStatusRequest request) {
        Product product = productRepository.findById(id).orElseThrow(ProductNotFoundException::new);
        product.setActive(request.getActive());
        productRepository.save(product);
        return toResponse(product, false);
    }
}