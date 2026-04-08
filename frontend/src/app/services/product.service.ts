import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment';
import { Product } from '../models/product.dto';

@Injectable({ providedIn: 'root' })

export class ProductService 
{
  private readonly baseUrl = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  // GET /products
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // GET /api/products/:id
  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  // POST /products
  create(dto: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, dto);
  }
}