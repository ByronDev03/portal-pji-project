// Importa el decorador Injectable de Angular para declarar este servicio como inyectable.
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

export type PaymentSummary = {
  planName: string;
  amount: string;
  method: string;
  paidAt: string | Date | null;
  externalRef: string;
};

// Define el “shape” (estructura) de los datos del cliente que se guardarán temporalmente.
// Esto sirve como borrador (draft) durante un flujo tipo wizard/checkout.
export type CustomerDraft = {
  fullName: string;  // Nombre completo del cliente capturado en el formulario
  email: string;     // Email del cliente
  phone: string;     // Teléfono del cliente
  address: string;  //  Direccion del cliente
};

// Declara un servicio Angular disponible globalmente (singleton) en toda la app.
// providedIn: 'root' => Angular lo registra en el inyector raíz automáticamente.
@Injectable({ providedIn: 'root' })
export class PjiFlowService {
  // Clave usada para persistir el estado en localStorage.
  // Todo lo que guarde este servicio se almacena bajo este key.
  private readonly key = 'pji_flow';

  private step$ = new BehaviorSubject<number>(1);
  private customerId: string | null = null;

  setStep(step: number): void{
    this.step$.next(step);
  }

  getStep(): Observable<number> {
    return this.step$.asObservable();
  }

  setCustomerId(id: string) {
    this.state.customerId = id;
    this.save();
  }

  getCustomerId(): string | null {
    return this.state.customerId ?? null;
  }

  // Estado interno del “flujo” (plan seleccionado, estado, datos del cliente).
  // Se inicializa con load() para recuperar información persistida (si existe).
  private state: {
    productId?: string;        // ID del plan/producto seleccionado
    productName?: string;      // Nombre del plan/producto seleccionado (para UI)
    stateCode?: string;        // Código de estado (p. ej. "MOR", "CDMX", etc.)
    customer?: CustomerDraft; 
    customerId?: string;       // Borrador de datos del cliente
    paymentSummary?: PaymentSummary;
  } = this.load();             // Carga inicial desde localStorage

  // Guarda el plan seleccionado dentro del state y persiste cambios.
  // Recibe un objeto mínimo con id y name para no depender del modelo completo.
  setPlan(plan: { id: string; name: string }) {
    this.state.productId = plan.id;      // Persistimos el id del plan
    this.state.productName = plan.name;  // Persistimos el nombre del plan
    this.save();                         // Guardamos en localStorage
  }

  // Guarda el código de estado seleccionado y persiste cambios.
  setEstado(stateCode: string) {
    this.state.stateCode = stateCode; // Actualiza el state interno
    this.save();                      // Persiste en localStorage
  }

  // Guarda los datos del cliente (draft) y persiste cambios.
  setCustomer(customer: CustomerDraft) {
    this.state.customer = customer; // Guarda el borrador del cliente
    this.save();                    // Persiste en localStorage
  }

  setPaymentSummary(summary: PaymentSummary) {
    this.state.paymentSummary = summary;
    this.save();
  }

  getPaymentSummary(): PaymentSummary | undefined {
    return this.state.paymentSummary;
  }

  // Getter que expone un “snapshot” del estado actual.
  // Se retorna una copia superficial para evitar que afuera muten this.state directamente.
  get snapshot() {
    return { ...this.state };
  }

  // Limpia el estado en memoria y borra la persistencia.
  // Útil cuando el flujo termina o el usuario cancela.
  clear() {
    this.state = {};                     // Resetea el state interno
    localStorage.removeItem(this.key);   // Elimina el registro persistido
  }

  // Persiste el estado actual en localStorage.
  // JSON.stringify convierte el objeto a string (requisito de localStorage).
  private save() {
    localStorage.setItem(this.key, JSON.stringify(this.state));
  }

  // Recupera el estado desde localStorage.
  // Si no hay nada guardado, regresa {}.
  // try/catch protege de JSON corrupto (ej. si el contenido no es JSON válido).
  private load() {
    try {
      return JSON.parse(localStorage.getItem(this.key) || '{}');
    } catch {
      // Si el JSON está mal formado, se ignora y se empieza con estado vacío.
      return {};
    }
  }
}