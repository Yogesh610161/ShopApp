import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductserviceService } from 'src/app/services/productservice.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product=new Product();
  constructor(private route: ActivatedRoute, private productService: ProductserviceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const id:number=+this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(data=>{
      this.product=data;
    })
  }

}
