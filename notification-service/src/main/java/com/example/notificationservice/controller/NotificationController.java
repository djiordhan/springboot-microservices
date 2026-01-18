package com.example.notificationservice.controller;

import com.example.common.event.OrderCreatedEvent;
import com.example.notificationservice.consumer.OrderConsumer;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Simple REST controller to view received notifications.
 */
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final OrderConsumer orderConsumer;

    @GetMapping
    @Operation(summary = "Get all received notifications")
    public List<OrderCreatedEvent> getNotifications() {
        return orderConsumer.getReceivedNotifications();
    }
}
