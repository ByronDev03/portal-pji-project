import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PjiFlowService } from '../../../services/pji-flow.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PaymentService } from '../../../services/payment.service';
import { Payment } from '../../../models/payment.dto';

function expiryValidator(control: AbstractControl): ValidationErrors | null 
{
  const value = control.value;

  if (!value || value.length < 5) return { invalidFormat: true };

  const [monthStr, yearStr] = value.split('/');
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
    return { invalidMonth: true };
  }

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { expired: true };
  }

  return null;
}

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PagoComponent implements OnInit {

  productId: string | null = null;
  productName: string | null = null;

  form!: FormGroup;

  isLoading = false;
  paymentSuccess = false;

  // Solo para UI (detección visual de tarjeta)
  cardType: 'visa' | 'mastercard' | 'amex' | null = null;
  maxCardLength = 16;
  cvvLength = 3;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private readonly flow: PjiFlowService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.flow.setStep(3);
    this.productName = this.route.snapshot.queryParamMap.get('productName');

    this.form = this.fb.group({
      titular: ['', Validators.required],
      cardNumber: ['', Validators.required],
      exp: ['', [Validators.required, expiryValidator]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  formatCardNumber(event: Event): void 
  {
    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, '');

    // Detectar tipo (solo visual)
    if (value.startsWith('4')) {
      this.cardType = 'visa';
      this.maxCardLength = 16;
      this.cvvLength = 3;
    } else if (value.startsWith('5')) {
      this.cardType = 'mastercard';
      this.maxCardLength = 16;
      this.cvvLength = 3;
    } else if (value.startsWith('3')) {
      this.cardType = 'amex';
      this.maxCardLength = 15;
      this.cvvLength = 4;
    } else {
      this.cardType = null;
      this.maxCardLength = 16;
      this.cvvLength = 3;
    }

    this.form.get('cvv')?.setValidators([
      Validators.required,
      Validators.pattern(new RegExp(`^\\d{${this.cvvLength}}$`))
    ]);

    this.form.get('cvv')?.updateValueAndValidity({ emitEvent: false });

    value = value.substring(0, this.maxCardLength);

    let formatted = '';

    if (this.cardType === 'amex') {
      const part1 = value.substring(0, 4);
      const part2 = value.substring(4, 10);
      const part3 = value.substring(10, 15);
      formatted = [part1, part2, part3].filter(Boolean).join(' ');
    } else {
      formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    }

    this.form.get('cardNumber')?.setValue(formatted, { emitEvent: false });
  }

  formatExpiry(event: Event): void 
  {
    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, ''); // solo números

    value = value.substring(0, 4); // máximo 4 dígitos

    // Validar mes mientras escribe
    if (value.length >= 1) 
    {
      const firstDigit = value.charAt(0);

      if (parseInt(firstDigit) > 1) {
        value = '0' + firstDigit;
      }
    }

    if (value.length >= 2) {
      const month = parseInt(value.substring(0, 2));

      if (month === 0) {
        value = '01' + value.substring(2);
      }

      if (month > 12) {
        value = '12' + value.substring(2);
      }
    }

    let formatted = '';

    if (value.length > 2) {
      formatted = value.substring(0, 2) + '/' + value.substring(2);
    } else {
      formatted = value;
    }

    this.form.get('exp')?.setValue(formatted, { emitEvent: false });
  }

  back() {
    this.router.navigate(['/contratar/product'], {
      queryParams: { productId: this.productId },
    });
  }

  pay() 
  {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const customer_id = this.flow.getCustomerId();
    const product_id = this.route.snapshot.queryParamMap.get('productId');

    if (!customer_id || !product_id) {
      alert('Error de sesión. Intenta nuevamente.');
      return;
    }

    this.isLoading = true;

    this.paymentService.createPayment({
      customer_id,
      product_id,
      method: 'oxxo'
    }).subscribe({
      next: (res) => {
        this.paymentService.updatePayment(res.payment_id, {
          status: 'paid'
        }).subscribe((updated: Payment) => {
          console.log('Pago creado:', res);

          this.flow.setPaymentSummary({
            planName: this.flow.snapshot.productName ?? '',
            amount: updated.amount,
            method: updated.method,
            paidAt: updated.paid_at ?? null,
            externalRef: updated.external_ref,
          });

          this.isLoading = false;
          this.paymentSuccess = true;

          setTimeout(() => {
            this.router.navigate(['/contratar/success']);
          }, 1200);
        });
      },
      error: (err) => {
        console.error('Error creando pago', err);
        this.isLoading = false;
        alert('Error al procesar el pago');
      }
    });
  }

  // Getters para el template
  get titularCtrl() {
    return this.form.get('titular');
  }

  get cardNumberCtrl() {
    return this.form.get('cardNumber');
  }

  get expCtrl() {
    return this.form.get('exp');
  }

  get cvvCtrl() {
    return this.form.get('cvv');
  }
}