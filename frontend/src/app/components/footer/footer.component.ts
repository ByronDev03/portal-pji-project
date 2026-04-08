// Importa utilidades comunes de Angular (directivas como *ngIf, *ngFor, etc.)
import { CommonModule } from '@angular/common';
// Importa el decorador @Component para declarar un componente
import { Component } from '@angular/core';

// Declara un componente de Angular
@Component({
  // Nombre del selector que usarás en el HTML para insertar el componente
  selector: 'app-footer',

  // Marca este componente como "standalone", es decir, no necesita declararse en un módulo (NgModule)
  standalone: true,

  // Módulos que este componente puede usar (CommonModule trae directivas y pipes comunes)
  imports: [CommonModule],

  // Ruta al template HTML del componente (vista)
  templateUrl: './footer.component.html',

  // Rutas a los estilos específicos del componente (scopeado por Angular)
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // Propiedad pública disponible en el template.
  // Guarda el año actual (ej.: 2025) para mostrar en el copyright.
  currentYear = new Date().getFullYear();
}
