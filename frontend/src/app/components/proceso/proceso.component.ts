// Módulos base de Angular
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Modelo fuerte para cada paso del proceso.
 *  - 'icon' está tipado como unión literal para impedir valores no válidos.
 */
interface Paso {
  titulo: string;
  descripcion: string;
  icon: 'poliza' | 'verificar' | 'escudo';
}

/**
 * Componente standalone (no requiere declarar en NgModule).
 *  - selector: etiqueta HTML que usarás en plantillas (<app-proceso/>)
 *  - templateUrl/styleUrls: archivos de vista y estilos
 *  - imports: dependencias que este standalone usa (CommonModule para *ngFor, *ngIf, etc.)
 *  - changeDetection: OnPush = detección de cambios solo en entradas nuevas o eventos del componente.
 *    Mejora rendimiento; si mutas arrays/objetos, recuerda clonar para disparar cambios.
 */
@Component({
  selector: 'app-proceso',
  standalone: true,
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProcesoComponent {
  /**
   * Lista de pasos que se renderiza en la vista con *ngFor.
   * Tip: si en el futuro necesitas actualizarla dinámicamente con OnPush,
   * haz asignaciones inmutables (this.pasos = [...this.pasos, nuevo]).
   */
  pasos: Paso[] = [
    {
      titulo: 'Elige tu póliza',
      descripcion: 'Selecciona el plan idóneo y verifica la identidad de tu inquilino.',
      icon: 'poliza'
    },
    {
      titulo: 'Verificamos y firmamos',
      descripcion: 'Biometría facial, firma electrónica y buró de crédito en minutos.',
      icon: 'verificar'
    },
    {
      titulo: '¡Estás protegido!',
      descripcion: 'Nos encargamos de cualquier eventualidad legal.',
      icon: 'escudo'
    },
  ];
}