// Importa directivas/pipes comunes de Angular (*ngIf, *ngFor, etc.)
import { CommonModule } from '@angular/common';
// Importa el decorador @Component y el decorador @HostListener para escuchar eventos del host/ventana
import { Component, HostListener } from '@angular/core';

@Component({
  // Nombre del selector para usar este header en las plantillas: <app-header></app-header>
  selector: 'app-header',
  // Componente standalone: no requiere estar declarado en un NgModule
  standalone: true,
  // Módulos que este componente puede usar (CommonModule trae directivas y pipes básicos)
  imports: [CommonModule],
  // Ruta al template HTML del componente
  templateUrl: './header.component.html',
  // Ruta(s) a los estilos scoped del componente
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Flag que controla el estado "compact" del header (se usa en el HTML con [class.compact]="scrolled")
  scrolled = false;

  menuOpen = false;

  // Escucha el evento 'scroll' de la ventana. Cada vez que el usuario hace scroll, se ejecuta onWindowScroll()
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Si el desplazamiento vertical supera 80px, marcamos scrolled=true (activa la clase .compact)
    // Ajusta 80 a tu gusto para que el cambio ocurra antes o después.
    this.scrolled = window.scrollY > 80;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}