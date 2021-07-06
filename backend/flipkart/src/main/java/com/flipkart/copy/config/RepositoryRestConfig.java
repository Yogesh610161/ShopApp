package com.flipkart.copy.config;

import com.flipkart.copy.entities.product;
import com.flipkart.copy.entities.product_category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class RepositoryRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public RepositoryRestConfig (EntityManager theentitymanager){
        entityManager=theentitymanager;
    }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        HttpMethod[] restrictedMethods={HttpMethod.DELETE,HttpMethod.POST,HttpMethod.PUT};

        config.getExposureConfiguration().forDomainType(product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(restrictedMethods))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(restrictedMethods));

        config.getExposureConfiguration().forDomainType(product_category.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(restrictedMethods))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(restrictedMethods));

        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entityType=entityManager.getMetamodel().getEntities();
        List<Class> entityTypes=new ArrayList<>();
        for(EntityType entity:entityType){
            entityTypes.add(entity.getJavaType());

            Class[] domaintypes =entityTypes.toArray(new Class[0]);
            config.exposeIdsFor(domaintypes);
        }
    }
}

