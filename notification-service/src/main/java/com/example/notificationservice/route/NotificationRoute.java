package com.example.notificationservice.route;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

/**
 * Apache Camel route definition.
 * Routes messages from a direct endpoint to a log and potentially other destinations.
 * Demonstrates Camel's routing capabilities.
 */
@Component
public class NotificationRoute extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        // Simple direct route that logs the notification message
        from("direct:sendNotification")
            .routeId("notificationRoute")
            .log("Camel Routing: Sending notification for order ${body.orderId}")
            .process(exchange -> {
                // Example processing logic
                Object body = exchange.getIn().getBody();
                log.info("Processing notification in Camel for: {}", body);
            })
            .to("log:com.example.notificationservice?level=INFO");
    }
}
