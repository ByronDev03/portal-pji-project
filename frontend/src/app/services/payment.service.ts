import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Payment } from '../models/payment.dto';
import { CreatePaymentDto } from '../models/create-payment.dto';

@Injectable({ providedIn: 'root' })

export class PaymentService 
{
  private readonly baseUrl = `${environment.apiBaseUrl}/payments`;

  constructor(private http: HttpClient) {}

  createPayment(dto: CreatePaymentDto): Observable<Payment> {
    return this.http.post<Payment>(this.baseUrl, dto);
  }

  updatePayment(id: string, dto: { status: string }): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}/${id}`, dto);
  }
}