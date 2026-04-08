import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.dto';

interface Plan 
{
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  incluye: string[];
  extrasMas?: number;
  complementos?: string[];
  popular?: boolean;
  btnColor?: 'green' | 'dark';
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
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanesComponent implements OnInit {
  planes: Plan[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarPlanesDesdeApi();
  }

  private cargarPlanesDesdeApi(): void 
  {
    this.loading = true;
    this.error = null;
    this.cdr.markForCheck();

    this.productService.getAll().subscribe({
      next: (products: Product[]) => {
        this.planes = products.map((p: Product, index: number) => 
          this.mapProductToPlan(p, index));
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: unknown) => {
        console.error('Error cargando products', err);
        this.error = 'No se pudieron cargar los planes.';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private mapProductToPlan(product: Product, index: number): Plan {
  const ui = PLAN_UI[product.name] ?? {
    incluye: [],
    extrasMas: undefined,
  };

  return {
    id: product.product_id,
    nombre: product.name,
    descripcion: product.description,
    precio: Number(product.min_monthly_rent ?? product.max_monthly_rent ?? 0),
    incluye: ui.incluye ?? [],
    extrasMas: ui.extrasMas,
    popular: index === 1,
    btnColor: index === 1 ? 'dark' : 'green',
  };
}

  seleccionarPlan(plan: Plan): void 
  {
    // Aquí decides qué hacer con el plan seleccionado:
    // navegar al siguiente paso, guardar en un servicio, etc.
    this.router.navigate(['/contratar/customer'], {
      queryParams: { productId: plan.id },
    });

    // Si quieres ver que funciona, puedes dejar temporalmente:
    // console.log('Plan seleccionado', plan);
  }
}