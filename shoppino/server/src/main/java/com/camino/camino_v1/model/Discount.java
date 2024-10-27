package com.camino.camino_v1.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "discounts")
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String details;
    
    @Column(nullable = false)
    private int percentage;

    @Column(nullable = false)
    private LocalDateTime discountStartDate;

    @Column(nullable = false)
    private LocalDateTime discountEndDate;

    @OneToMany
    @JoinColumn(name = "productIds", referencedColumnName = "id")
    private List<Product> productsId;
}
