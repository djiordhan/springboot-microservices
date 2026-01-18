package com.example.notificationservice.consumer;

import com.example.common.event.OrderCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.camel.ProducerTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Kafka Consumer that listens for OrderCreatedEvent.
 * Forwards the event to an Apache Camel route for processing.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class OrderConsumer {

    private final ProducerTemplate producerTemplate;
    
    // In-memory list to keep track of received notifications (for demo purposes)
    private final List<OrderCreatedEvent> receivedNotifications = new ArrayList<>();

    @KafkaListener(topics = "orders-topic", groupId = "notification-group")
    public void consumeOrderEvent(OrderCreatedEvent event) {
        log.info("Received Kafka Event: {}", event);
        receivedNotifications.add(event);
        
        // Handover to Apache Camel route
        producerTemplate.sendBody("direct:sendNotification", event);
    }
    
    public List<OrderCreatedEvent> getReceivedNotifications() {
        return new ArrayList<>(receivedNotifications);
    }
}
