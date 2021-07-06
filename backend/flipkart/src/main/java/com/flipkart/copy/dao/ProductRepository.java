package com.flipkart.copy.dao;

import com.flipkart.copy.entities.product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<product, Long> {

    Page<product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
    Page<product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
