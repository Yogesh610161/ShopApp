import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductserviceService } from 'src/app/services/productservice.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products:Product[]=[];
  id:number=1
  searchMode:boolean=false;
  previousCategoryId:number=1;

  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;
  previousKeyword:String=null;

  constructor(private productservice:ProductserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listItems();
    })
  }
  listItems(){

          this.searchMode=this.route.snapshot.paramMap.has('keyword');
          if(this.searchMode){
                  this.handleSearchProducts()
          }
          else{
            this.handleListProducts();
          }
  }

   handleSearchProducts(){
     const keyword:String=this.route.snapshot.paramMap.get('keyword');


     if(this.previousKeyword != keyword){
       this.thePageNumber=1;
     }

     this.previousKeyword=keyword;
     this.productservice.searchProductPaginated(this.thePageNumber-1,this.thePageSize,keyword).subscribe(this.processResult())
   }

  handleListProducts(){
    const hasId:boolean = this.route.snapshot.paramMap.has('id');
    if(hasId){
      this.id=+this.route.snapshot.paramMap.get('id');
    }
    else{
      this.id=1;
    }

    if(this.previousCategoryId != this.id){
      this.thePageNumber=1;
    }

    this.previousCategoryId=this.id;
        this.productservice.getResponsePaginated(this.thePageNumber-1,this.thePageSize,this.id).subscribe(
      this.processResult()
    )
  }
  processResult(){
    return data=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    }
  }
  updatePageSize(pageSize:number){
    this.thePageSize=pageSize;
    this.thePageNumber=1;
    this.listItems();
  }
}
