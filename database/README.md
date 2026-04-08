<h1 align="center">Descripción de la base de datos <em>portal_pji_project</em></h1>

---
- **Tabla CUSTOMER:** Representa a la persona / empresa que usa la plataforma.

|       CAMPO      |                      TIPO                       |                                 DESCRIPCIÓN                                 |
|       ----       |                      ----                       |                                    ----                                     |
| `customer_id`    | CHAR(36) NOT NULL (PK)                          | Identificador único (UUID) del cliente, estable para exponer en APIs.       |
| `name`           | VARCHAR(150) NOT NULL                           | Nombre completo o razón social.                                             |
| `email`          | VARCHAR(255) NOT NULL                           | Correo de contacto; único para evitar duplicados.                           |
| `phone`          | VARCHAR(25)  NOT NULL                           | Teléfono del cliente.                                                       |
| `address`        | VARCHAR(255) NOT NULL                           | Dirección del cliente.                                                      |
| `active`         | TINYINT(1) DEFAULT 1  NOT NULL                  | Activo/inactivo (soft-disable).                                             |
| `created_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Alta del registro.                                                          |
| `updated_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Última modificación.                                                        |

---
- **Tabla PRODUCT:** Catálogo de servicios (p. ej., Póliza Jurídica Digital, Investigación Digital, Protección Total, etc.) con tarifa.

|       CAMPO      |                      TIPO                       |                                 DESCRIPCIÓN                                 |
|       ----       |                      ----                       |                                    ----                                     |
| `service_id`     | CHAR(36) NOT NULL (PK)                          | Identificador único (UUID) del servicio, estable para exponer en APIs.      |
| `customer_id`    | CHAR(36) NOT NULL (FK)                          | Cliente asociado.                                                           |
| `name`           | VARCHAR(150) NOT NULL                           | Nombre del servicio / póliza.                                               |
| `description`    | VARCHAR(255) NOT NULL                           | Descripción del servicio/póliza.                                            |
| `active`         | TINYINT(1) DEFAULT 1 NOT NULL                   | Activo/inactivo (soft-disable).                                             |
| `created_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Alta del registro.                                                          |
| `updated_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Última modificación.                                                        |

---
- **Tabla SESSION:** Sesiones de autenticación/uso (seguridad y auditoría).
    
|       CAMPO      |                      TIPO                       |                                 DESCRIPCIÓN                                 |
|       ----       |                      ----                       |                                    ----                                     |
| `session_id`     | CHAR(36) NOT NULL (PK)                          | Identificador único (UUID) de la sesión, estable para exponer en APIs.      |
| `customer_id`    | CHAR(36) NOT NULL (FK)                          | Cliente asociado.                                                           |
| `user_agent`     | VARCHAR(255) NOT NULL                           | Navegador/dispositivo.                                                      |
| `status`         | VARCHAR(20) NOT NULL DEFAULT 'active'           | active / ended / expired                                                    |
| `started_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Inicio de la sesión.                                                        |
| `ended_at`       | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Fin de la sesión (al cerrar o expirar).                                     |
| `created_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Alta del registro.                                                          |
| `updated_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Última modificación.                                                        |

---
- **Tabla PAYMENT:** Transacciones monetarias realizadas por un cliente.

|       CAMPO      |                      TIPO                       |                                 DESCRIPCIÓN                                 |
|       ----       |                      ----                       |                                    ----                                     |
| `session_id`     | CHAR(36) NOT NULL (PK)                          | Identificador único (UUID) del pago, estable para exponer en APIs.          |
| `customer_id`    | CHAR(36) NOT NULL (FK)                          | Cliente asociado.                                                           |
| `amount`         | VARCHAR(30) NOT NULL                            | Monto total del pago.                                                       |
| `currency`       | CHAR(3) NOT NULL DEFAULT 'MXN'                  | Tipo de moneda (ej. MXN USD).                                               |
| `method`         | VARCHAR(30) NOT NULL                            | Método de pago (card / Oxxo / spei / paypal, etc).                           |
| `status`         | VARCHAR(20) NOT NULL DEFAULT 'pending'          | pending, paid, failed, refunded.                                            |
| `external_ref`   | VARCHAR(100) NOT NULL                           | Referencia del proveedor de pago (Stripe / Conekta / SPEI, etc.).           |
| `paid_at`        | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Fecha/hora de confirmación del pago.                                        |
| `created_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Alta del registro.                                                          |
| `updated_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Última modificación.                                                        |

---
- **Tabla VERIFICATION:** Flujo de verificación/validación (OTP/2FA, KYC, biometría).

|       CAMPO      |                      TIPO                       |                                 DESCRIPCIÓN                                 |
|       ----       |                      ----                       |                                    ----                                     |
| `verification_id`| CHAR(36) NOT NULL (PK)                          | Identificador único (UUID) de la verificació, estable para exponer en APIs. |
| `customer_id`    | CHAR(36) NOT NULL (FK)                          | Cliente asociado.                                                           |
| `session_id`     | CHAR(36) NOT NULL (FK)                          | Sesión asociada.                                                            |
| `payment_id`     | CHAR(36) NOT NULL (FK)                          | Pago asociado.                                                              |
| `type`           | VARCHAR(50) NOT NULL                            | email / phone / identity / biometrics (extensible).                            |
| `status`         | VARCHAR(50) NOT NULL                            | pending / approved / rejected / expired.                                       |
| `attempts`       | INT NOT NULL DEFAULT 0                          | Contador de intentos.                                                       |
| `expires_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Vencimiento de la verificación.                                             |
| `verified_at`    | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Momento de aprobación (si aplica).                                          |
| `created_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Alta del registro.                                                          |
| `updated_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Última modificación.                                                        |

---
- **Tabla SERVICE_PRICE_RANGE:**

|       CAMPO        |                      TIPO                       |                                 DESCRIPCIÓN                                   |
|       ----         |                      ----                       |                                    ----                                       |
| `range_id`         | CHAR(36) NOT NULL (PK)                          | Identificador único (UUID) del rango de precios estable para exponer en APIs. |
| `service_id`       | CHAR(36) NOT NULL (FK)                          | Servicio asociado.                                                            |
| `min_monthly_rent` | VARCHAR(10) NOT NULL                            | .                                                                             |
| `max_monthly_rent` | VARCHAR(10) NOT NULL                            | .                                                                             |
| `annual_price`     | VARCHAR(10) NOT NULL                            | .                                                                             |
| `currency`         | CHAR(3) NOT NULL DEFAULT 'MXN'                  | .                                                                             |
| `description`      | VARCHAR(255) NOT NULL                           | .                                                                             |
| `created_at`       | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Alta del registro.                                                            |
| `updated_at`       | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Última modificación.                                                          |

---
<h1 align="center">Relaciones de la base de datos <em>portal_pji_project</em></h1>

- **Customer (1 : N) Service**
    - Un customer puede tener muchos services; cada service pertenece a un solo customer.

- **Customer (1 : N) Session**
    - Un customer puede tener muchas sessions; cada session pertenece a un solo customer.

- **Customer (1 : N) Payment**
    - Un customer puede tener muchos payments; cada payment pertenece a un solo customer.

- **Customer (1 : N) Verification**
    - Un customer puede tener muchas verifications; cada verification pertenece a un solo customer.

- **Session (1 : N) Verification**
    - Una session puede tener muchas verifications (intentos, validaciones); cada verification referencia una sola session.

- **Payment (1 : N )Verification**
    - Un payment puede estar asociado a muchas verifications; cada verification referencia un solo payment.

- **Service (1 : N) Service_Price_Range**
    - Un service puede tener muchos price ranges; cada service_price_range pertenece a un solo service