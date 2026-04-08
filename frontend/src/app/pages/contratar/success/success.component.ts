import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PjiFlowService } from '../../../services/pji-flow.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit
{
  paymentSummary: any;

  constructor(
    private router: Router,
    private flow: PjiFlowService
  ) {}

  ngOnInit(): void
  {
    this.flow.setStep(3);

    this.paymentSummary = this.flow.getPaymentSummary();

    if(!this.paymentSummary) {
      this.router.navigate(['/']);
    }
  }

  goHome() {
    this.flow.clear();
    this.router.navigate(['/']);
  }
}