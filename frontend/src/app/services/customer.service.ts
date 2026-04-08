import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Customer} from '../models/customer.dto';

@Injectable({ providedIn: 'root' })

export class CustomerService 
{
  private readonly baseUrl = `${environment.apiBaseUrl}/customers`;

  constructor(private http: HttpClient) {}

  create(dto: Partial<Customer>): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, dto);
  }
}
