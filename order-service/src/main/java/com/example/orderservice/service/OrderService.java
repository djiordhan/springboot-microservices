package com.example.orderservice.service;

import com.example.common.dto.OrderDTO;
import com.example.common.event.OrderCreatedEvent;
import com.example.orderservice.entity.Order;
import com.example.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class handling business logic for Orders.
 * Publishes events to Kafka upon order creation.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate;

    private static final String TOPIC = "orders-topic";

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        log.info("Creating new order for user: {}", orderDTO.getUserId());
        
        Order order = Order.builder()
                .userId(orderDTO.getUserId())
                .product(orderDTO.getProduct())
                .quantity(orderDTO.getQuantity())
                .price(orderDTO.getPrice())
                .status("CREATED")
                .build();
        
        Order savedOrder = orderRepository.save(order);
        
        OrderCreatedEvent event = OrderCreatedEvent.builder()
                .orderId(savedOrder.getId())
                .userId(savedOrder.getUserId())
                .product(savedOrder.getProduct())
                .build();
        
        log.info("Publishing OrderCreatedEvent to Kafka: {}", event);
        kafkaTemplate.send(TOPIC, event);
        
        return convertToDTO(savedOrder);
    }

    private OrderDTO convertToDTO(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .product(order.getProduct())
                .quantity(order.getQuantity())
                .price(order.getPrice())
                .status(order.getStatus())
                .build();
    }
}
