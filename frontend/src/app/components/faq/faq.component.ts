// Importa el decorador Component para definir un componente de Angular
import { Component } from '@angular/core';
// Importa CommonModule para poder usar *ngIf, *ngFor, etc. en el template
import { CommonModule } from '@angular/common';

// Define la interfaz que modela cada pregunta frecuente
interface FaqItem {
  pregunta: string;  // Texto de la pregunta
  respuesta: string; // Texto de la respuesta
}

// Decorador que indica que esta clase es un componente de Angular
@Component({
  // Nombre de la etiqueta HTML que representará este componente
  selector: 'app-faq',
  // Indica que el componente es standalone (no depende de un módulo)
  standalone: true,
  // Módulos que este componente necesita para funcionar (ngIf, ngFor, etc.)
  imports: [CommonModule],
  // Ruta del archivo de plantilla HTML asociado al componente
  templateUrl: './faq.component.html',
  // Ruta del archivo de estilos SCSS asociado al componente
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  // Arreglo de preguntas frecuentes que se mostrará en el template
  faqs: FaqItem[] = [
    {
      pregunta: '¿Qué pasa si mi inquilino no paga la renta?',
      respuesta: 'Iniciamos de inmediato el proceso legal para recuperar rentas y, si es necesario, desocupar el inmueble. Nuestro equipo de abogados se encarga de todo.',
    },
    {
      pregunta: '¿La firma electrónica es legal?',
      respuesta: 'Sí, la firma electrónica tiene validez legal y es utilizada en todos nuestros procesos.',
    },
    {
      pregunta: '¿Cuánto tarda la contratación?',
      respuesta: 'El proceso es inmediato y 100% digital. En minutos puedes tener tu póliza.',
    },
  ];

  // Índice del item actualmente abierto; null significa que ninguno está abierto
  openIndex: number | null = null;

  // Función que abre/cierra una pregunta según su índice
  toggle(index: number): void {
    // Si el índice ya está abierto, lo cierra (null); si no, lo abre
    this.openIndex = this.openIndex === index ? null : index;
  }
}