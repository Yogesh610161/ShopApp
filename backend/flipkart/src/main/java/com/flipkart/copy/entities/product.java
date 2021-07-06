package com.flipkart.copy.entities;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@Table(name="product")
public class product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
     private long id;

    @ManyToOne
    @JoinColumn(name="category_id",nullable = false)
    private product_category category;
    @Column(name="sku")
     private String sku;
 @Column(name="name")
     private String name;
 @Column(name="description")
     private String description;
 @Column(name="unit_price")
     private BigDecimal unit_price;
 @Column(name="image_url")
     private String image_url;
 @Column(name="active")
     private boolean active;
 @Column(name="units_in_stock")
     private int units_in_stock;
 @Column(name="date_created")
 @CreationTimestamp
     private Date date_created;
 @Column(name="last_updated")
 @UpdateTimestamp
     private Date last_updated;

}
