import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.dto';
// Servicio de flujo (wizard) que guarda el estado entre pantallas
import { PjiFlowService } from '../../../services/pji-flow.service';

type BtnColor = 'green' | 'dark';

interface PlanCard {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  incluye: string[];
  extrasMas?: number;
  popular?: boolean;
  btnColor?: BtnColor;
}

const PLAN_UI: Record<string, { incluye: string[]; extrasMas?: number }> = {
  Esencial: {
    incluye: [
      'Intervención extrajudicial al primer atraso',
      'Intervención judicial al segundo mes de atraso',
      'Recuperación de inmueble por abandono',
      'Recuperación de inmueble por entrega voluntaria',
    ],
    extrasMas: 3,
  },
  Premium: {
    incluye: [
      'Todos los beneficios de Esencial',
      'Intervención al término del contrato',
      'Recuperación por negativa a entregar inmueble',
      'Recuperación por negativa a salir del inmueble',
    ],
    extrasMas: 3,
  },
  Diamante: {
    incluye: [
      'Todos los beneficios de Esencial y Premium',
      'Recuperación contenciosa en juicio',
      'Cobro de rentas vencidas',
      'Cobro de servicios pendientes',
    ],
    extrasMas: 4,
  },
};

@Component({
  selector: 'app-estado-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstadoPlanComponent implements OnInit {
  planes: PlanCard[] = [];
  loading = false;
  error: string | null = null;

  // Selecciones del usuario
  selectedProductId: string | null = null;
  selectedProductName: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private readonly flow: PjiFlowService,  
  ) {}

  ngOnInit(): void {
    this.flow.setStep(2);
    // Si venías con productId desde /customer, lo precargamos (opcional)
    this.selectedProductId = this.route.snapshot.queryParamMap.get('productId');

    this.cargarPlanes();
  }

  private cargarPlanes(): void {
    this.loading = true;
    this.error = null;
    this.cdr.markForCheck();

    this.productService.getAll().subscribe({
      next: (products: Product[]) => {
        this.planes = products.map((p, index) => {
          const ui = PLAN_UI[p.name] ?? { incluye: [], extrasMas: undefined };

          return {
            id: p.product_id,
            nombre: p.name,
            descripcion: p.description,
            precio: Number(p.min_monthly_rent ?? p.max_monthly_rent ?? 0),
            incluye: ui.incluye ?? [],
            extrasMas: ui.extrasMas,
            popular: p.name === 'Premium' || index === 1,
            btnColor: (p.name === 'Premium' || index === 1) ? 'dark' : 'green',
          };
        });

        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: unknown) => {
        console.error(err);
        this.error = 'No se pudieron cargar los planes.';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  seleccionarPlan(plan: PlanCard): void {
    this.selectedProductId = plan.id;
    this.selectedProductName = plan.nombre;
    this.cdr.markForCheck();
  }

  anterior(): void {
    this.router.navigate(['/contratar/customer'], {
      queryParams: { productId: this.selectedProductId },
    });
  }

  siguiente(): void 
  {
    if (!this.selectedProductId || !this.selectedProductName) return;

    this.flow.setPlan({
      id: this.selectedProductId,
      name: this.selectedProductName,
    });

    this.router.navigate(['/contratar/payment'], {
      queryParams: {
        productId: this.selectedProductId,
        productName: this.selectedProductName,
      },
    });
  }
}