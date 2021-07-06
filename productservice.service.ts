import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {


  private baseUrl= 'http://localhost:8080/api/products';
  private catUrl= 'http://localhost:8080/api/product-category';
  constructor(private httpClient:HttpClient) { }




            getResponsePaginated(thePage:number,
                                 thePageSize:number,
                                  catId:number): Observable<GetResponseProduct>{
            const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${catId}`+`&page=${thePage}&size=${thePageSize}`;
            return this.httpClient.get<GetResponseProduct>(searchUrl);
            }
           getResponse(catId:number): Observable<Product[]>{
           const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${catId}`;
           return this.newMethod(searchUrl);
           }

           getProductCategories(): Observable<ProductCategory[]>{
            return this.httpClient.get<GetResponseProductCategory>(this.catUrl).pipe(map(response => response._embedded.productCategory));
           }

           searchProducts(keyword: String):Observable<Product[]> {
             const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
            return this.newMethod(searchUrl);
          }
          searchProductPaginated(thePage:number,
            thePageSize:number,
             keyword:String): Observable<GetResponseProduct>{
const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${keyword}`+`&page=${thePage}&size=${thePageSize}`;
return this.httpClient.get<GetResponseProduct>(searchUrl);
}

          getProduct(id: number):Observable<Product> {
            const searchUrl=`${this.baseUrl}/${id}`;
            return this.httpClient.get<Product>(searchUrl);
          }

  private newMethod(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(response => response._embedded.products));
  }
  }


interface GetResponseProduct{
  _embedded:{
    products:Product[];
  },
  page:{
    size:number;
    totalElements:number,
    totalPages:number,
    pages:number
  }
}
interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
