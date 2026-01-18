package com.example.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Data Transfer Object for Order information.
 * Shared across microservices.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO implements Serializable {
    private Long id;
    private Long userId;
    private String product;
    private Integer quantity;
    private BigDecimal price;
    private String status;
}
