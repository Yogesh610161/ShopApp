import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductserviceService } from 'src/app/services/productservice.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[];
  constructor(private productService: ProductserviceService) { }

  ngOnInit(): void {
    this.listProductCategories()
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data =>{
        console.log("data"+ JSON.stringify(data));
        this.productCategories=data;
      }
    )
  }

}
