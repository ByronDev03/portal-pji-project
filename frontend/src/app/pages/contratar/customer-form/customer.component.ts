// Importa los elementos base para definir un componente Angular
import { Component, OnInit } from '@angular/core';

// Importa utilidades para formularios reactivos:
// - FormBuilder: facilita la creación del formulario
// - FormGroup: representa el formulario completo
// - Validators: validaciones síncronas (required, email, minLength, etc.)
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// Importa herramientas de routing:
// - ActivatedRoute: leer parámetros de la URL
// - Router: navegar entre vistas
import { ActivatedRoute, Router } from '@angular/router';

// CommonModule: directivas básicas como *ngIf, *ngFor, etc.
import { CommonModule } from '@angular/common';

// Servicio encargado de crear clientes en el backend
import { CustomerService } from '../../../services/customer.service';

// Servicio de flujo (wizard) que guarda el estado entre pantallas
import { PjiFlowService } from '../../../services/pji-flow.service';

@Component({
  // Selector usado en el HTML para renderizar este componente
  selector: 'app-registro-basico',

  // Componente standalone (no depende de un NgModule)
  standalone: true,

  // Módulos que este componente necesita para funcionar
  imports: [CommonModule, ReactiveFormsModule],

  // Template HTML del componente
  templateUrl: './customer.component.html',

  // Estilos asociados al componente
  styleUrls: ['./customer.component.scss'],
})
export class RegistroBasicoComponent implements OnInit 
{
  // ID del producto obtenido desde la URL (?productId=...)
  productId: string | null = null;

  // Formulario reactivo para capturar los datos del cliente
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,           // Construcción del formulario
    private route: ActivatedRoute,     // Lectura de query params
    private router: Router,            // Navegación entre rutas
    private customerService: CustomerService, // Comunicación con backend
    private readonly flow: PjiFlowService,    // Estado compartido del flujo
  ) {}

  // Hook del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void 
  {
    this.flow.setStep(1);
    // Obtiene el productId desde los query params de la URL
    this.productId = this.route.snapshot.queryParamMap.get('productId');
    console.log('productId:', this.productId);

    // Inicializa el formulario reactivo con validaciones
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(13)]],
      direccion: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Cancela el flujo y regresa a la pantalla principal
  cancelar(): void {
    this.router.navigate(['/']);
  }

  // Avanza al siguiente paso del flujo
  siguiente(): void 
  {
    // Si el formulario es inválido o no hay productId, no hace nada
    if (this.form.invalid || !this.productId) return;

    // Construye el DTO esperado por el backend
    const dto = {
      name: this.form.value.nombre,
      phone: this.form.value.telefono,
      email: this.form.value.email,
      address: this.form.value.direccion,
    };

    // Llama al backend para crear el cliente
    this.customerService.create(dto).subscribe({
      next: (created) => {
        // Guarda los datos relevantes del cliente en el servicio de flujo
        // para que estén disponibles en los siguientes pasos
        this.flow.setCustomer({
          fullName: created.name,
          phone: created.phone,
          email: created.email,
          address: created.address,
        });

        this.flow.setCustomerId(created.customer_id);

        // Navega al siguiente paso del proceso,
        // enviando productId y customerId por query params
        this.router.navigate(['/contratar/product'], {
          queryParams: {
            productId: this.productId,
            customerId: created.customer_id,
          },
        });
      },
      error: (err) => {
        // Manejo básico de error
        console.error(err);
        // Aquí normalmente se mostraría un mensaje en la UI
        // ej: this.error = 'No se pudo guardar el cliente';
      },
    });
  }

  // Getters de conveniencia para el template.
  // Permiten escribir: nombreCtrl?.invalid en lugar de form.get('nombre')?.invalid
  get nombreCtrl() {
    return this.form.get('nombre');
  }

  get telefonoCtrl() {
    return this.form.get('telefono');
  }

  get emailCtrl() {
    return this.form.get('email');
  }

  get direccionCtrl() {
    return this.form.get('direccion');
  }
}