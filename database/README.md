<h1 align="center">Database Architecture - Portal PJI</h1>

This document describes the database structure, relationships, and design decisions for the Portal PJI.

### Overview
This database models the core flow of a policy subscription platform. It supports.
- Customer registration and management
- Product (policy plans) catalog
- Payment processing and tracking
- Session handling for user interactions
- Verifications processes for identity and payment validation

### Database Design Layers

This sections presents the database design across its three main layers: conceptual, logical and physical.

<details>
<summary>Conceptual Design (ER Diagram)</summary>

<div align="center">
    <img src="conceptual-design.png" width="600" alt="er relational"/>
</div>
</details>

<details>
<summary>Logical Design (Relational Model)</summary>

<div align="center">
    <img src="logical-design.png" width="600" alt="relational model"/>
</div>
</details>

<details>
<summary>Physical Design (SQL Schema)</summary>

```sql
CREATE DATABASE portal_pji_project; -- Crea la base de datos llamada `portal_pji_project`

USE portal_pji_project;             -- Define la base de datos a utilizar.

CREATE TABLE customer (                                              
  customer_id    CHAR(36)      NOT NULL,                             
  name           VARCHAR(100)  NOT NULL,                             
  email          VARCHAR(100)  NOT NULL,                             
  phone          VARCHAR(25)   NOT NULL,                                    
  address        VARCHAR(100)  NOT NULL,                                           
  active         TINYINT(1)    NOT NULL DEFAULT 1,                    
  created_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,      
  updated_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,                     
  PRIMARY KEY (customer_id)     
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE product (
  product_id       CHAR(36)        NOT NULL,                  
  name             VARCHAR(150)    NOT NULL,                             
  description      VARCHAR(255)    NOT NULL,  
  min_monthly_rent DECIMAL(10,3)   NOT NULL,
  max_monthly_rent DECIMAL(10,3)   NOT NULL,                                                    
  active           TINYINT(1)      NOT NULL DEFAULT 1,                  
  created_at       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE session (
  session_id     CHAR(36)       NOT NULL,                 
  customer_id    CHAR(36)       NOT NULL,   
  ip_address     VARCHAR(45)    NOT NULL,                                                            
  user_agent     VARCHAR(255)   NOT NULL,                                       
  status         VARCHAR(20)    NOT NULL DEFAULT 'active',           
  started_at     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,  
  ended_at       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,                                          
  created_at     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  updated_at     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (session_id), 
  CONSTRAINT fk_session_customer
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE payment (
  payment_id     CHAR(36)       NOT NULL,  
  customer_id    CHAR(36)       NOT NULL,                 
  product_id     CHAR(36)       NOT NULL,                                                                    
  amount         DECIMAL(10,3)  NOT NULL CHECK (amount >= 0),        
  currency       CHAR(3)        NOT NULL DEFAULT 'MXN',             
  method         VARCHAR(30)    NOT NULL,                            
  status         VARCHAR(20)    NOT NULL DEFAULT 'pending',          
  external_ref   VARCHAR(100)   NOT NULL,                                       
  paid_at        DATETIME       NULL,                                          
  created_at     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (payment_id), 
  CONSTRAINT fk_payment_customer
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
  CONSTRAINT fk_payment_product
    FOREIGN KEY (product_id) REFERENCES product(product_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE verification (
  verification_id CHAR(36)      NOT NULL,                 
  customer_id     CHAR(36)      NOT NULL,                             
  session_id      CHAR(36)      NOT NULL, 
  payment_id      CHAR(35)      NOT NULL,                                         
  type            VARCHAR(50)   NOT NULL,                            
  status          VARCHAR(50)   NOT NULL DEFAULT 'pending',       
  attempts        INT           NOT NULL DEFAULT 0,                  
  expires_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,                            
  verified_at     DATETIME      NULL,                                          
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (verification_id),  
  CONSTRAINT fk_verification_payment
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id),
  CONSTRAINT fk_verification_customer
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
  CONSTRAINT fk_verification_session
    FOREIGN KEY (session_id) REFERENCES session(session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
</details>

---

### Database Schema

This section defines the database schema, detailing each table, its fields, data types, constraints, and their role within the overall system architecture.

- **Customer Table:** Represents the user of the platform.

|    FIELD      |                       TYPE                  |                                                    DESCRIPTION |
|    ------     |                      ------                 |                                                   -------------|
| `customer_id` | CHAR(36) NOT NULL `(PK)`          | Unique identifier of the customer generated as a UUID. Ensures global uniqueness and supports distributed systems without relying on auto-increment sequences. |
| `name`        | VARCHAR(100) NOT NULL                       | Full name of the customer. Used for identification and personalization within the system. |
| `email`       | VARCHAR(100) NOT NULL                       | Customer's email address. Used for authentication, notifications, and account recovery. |
| `phone`       | VARCHAR(25) NOT NULL                        | Customer's contact number. Used for communication and verification processes. |
| `address`     | VARCHAR(100) NOT NULL                       | Customer's physical address. Used for validation, administrative processes, or document generation. |
| `active`      | TINYINT(1) DEFAULT 1 NOT NULL     | Indicates whether the customer is active (1 = active, 0 = inactive). Used to implement soft deletion without removing records. |
| `created_at`  | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP | Record creation timestamp for auditing and lifecycle tracking.|
| `updated_at`  | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP | Last update timestamp for change tracking and synchronization.|

---

- **Product Table:** Catalog of available plans (e.g., Essential, Premium, Diamond) that users can purchase within the platform.

|    FIELD           |            TYPE                             |                                         DESCRIPTION                                                             |
|    ------          |           ------                            |                                        -------------                                                            |
| `product_id`       | CHAR(36) NOT NULL `(PK)`                 | Unique identifier of the product generated as a UUID. Allows independent identification of each plan in the system.|
| `name`             | VARCHAR(150) NOT NULL                       | Name of the product or plan. Used to display options in the user interface.                                     |
| `description`      | VARCHAR(255) NOT NULL                       | Description of the plan and its benefits.                                                                       |
| `min_monthly_rent` | DECIMAL(10,3) NOT NULL                      | Minimum allowed rent value for this plan.                                                                       |
| `max_monthly_rent` | DECIMAL(10,3) NOT NULL                      | Maximum allowed rent value for this plan.                                                                       |
| `active`           | TINYINT(1) DEFAULT 1 NOT NULL               | Indicates whether the product is available for purchase. Allows deactivation without deleting records.          |
| `created_at`       | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP | Product creation timestamp for auditing purposes.                                                               |
| `updated_at`       | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP | Last update timestamp for tracking changes in the catalog.                                                      |

---

- **Session Table:** Stores user sessions for auditing, traceability, and security purposes.
    
|       FIELD      |                      TYPE                       |                                                DESCRIPTION                                               |
|       ----       |                      ----                       |                                                   ----                                                   |
| `session_id`     | CHAR(36) NOT NULL `(PK)`                        | Unique identifier of the session generated as a UUID. Used to track user interactions within the system. |
| `customer_id`    | CHAR(36) NOT NULL `(FK)`                        | Reference to the customer associated with the session. Identifies who initiated the session.             |
| `ip_address`     | VARCHAR(45) NOT NULL                            | User's IP address (supports both IPv4 and IPv6 formats).                                                 |
| `user_agent`     | VARCHAR(255) NOT NULL                           | Information about the user's browser or device.                                                          |
| `status`         | VARCHAR(20) NOT NULL DEFAULT 'active'           | Session status (e.g., active, ended, revoked).                                                           |
| `started_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Timestamp when the session starts.                                                                       |
| `ended_at`       | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Timestamp when the session ends.                                                                         |
| `created_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Record creation timestamp for auditing purposes.                                                         |
| `updated_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Last update timestamp of the session record.                                                             |

---
- **Payment Table:** Stores monetary transactions made by customers when purchasing a plan.

|       FIELD      |                      TYPE                       |                                 DESCRIPCIÓN                                                         |
|       ----       |                      ----                       |                                    ----                                                             |
| `payment_id`     | CHAR(36) NOT NULL `(PK)`                        | Unique identifier of the payment generated as a UUID. Used to track each transaction independently. |
| `customer_id`    | CHAR(36) NOT NULL `(FK)`                        | Reference to the customer who made the payment.                                                     |
| `product_id`     | CHAR(36) NOT NULL `(FK)`                        | Reference to the purchased product (plan).                                                          |
| `amount`         | DECIMAL(10,3) NOT NULL                          | Payment amount. DECIMAL is used to ensure precision in financial values.                            |
| `currency`       | CHAR(3) NOT NULL DEFAULT 'MXN'                  | Currency of the payment (e.g., MXN), following ISO standards.                                       |
| `method`         | VARCHAR(30) NOT NULL                            | Payment method (e.g., card, oxxo, transfer).                                                        |
| `status`         | VARCHAR(20) NOT NULL DEFAULT 'pending'          | Payment status (e.g., pending, paid, failed, refunded).                                             |
| `external_ref`   | VARCHAR(100) NULL                               | Identifier from an external payment provider (e.g., Stripe).                                        |
| `paid_at`        | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Timestamp when the payment was completed.                                                           |
| `created_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Record creation timestamp.                                                                          |
| `updated_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP     | Last update timestamp of the payment.                                                               |

---
- **Verification Table:** Manages user verification processes and payment validation workflows. 

|       CAMPO      |                      TYPE                    |                                    DESCRIPTION                                                            |
|       ----       |                      ----                    |                                       ----                                                                |
| `verification_id`| CHAR(36) NOT NULL `(PK)`                     | Unique identifier of the verification process generated as a UUID. Used to track each validation attempt. |
| `customer_id`    | CHAR(36) NOT NULL `(FK)`                     | Reference to the customer associated with the verification.                                               |
| `session_id`     | CHAR(36) NOT NULL `(FK)`                     | Reference to the session where the verification occurs.                                                   |
| `payment_id`     | CHAR(36) NOT NULL `(FK)`                     | Reference to the associated payment. Used to validate specific transactions.                              |
| `type`           | VARCHAR(50) NOT NULL                         | Type of verification (e.g., OTP, KYC, biometric).                                                         |
| `status`         | VARCHAR(50) NOT NULL                         | Verification status (e.g., pending, approved, rejected, expired).                                         |
| `attempts`       | INT NOT NULL DEFAULT 0                       | Number of verification attempts. Used to enforce security limits.                                         |
| `expires_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP  | Expiration timestamp of the verification process.                                                         |
| `verified_at`    | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP  | Timestamp when the verification was successfully completed.                                               |
| `created_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP  | Record creation timestamp.                                                                                |
| `updated_at`     | DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP  | Last update timestamp of the verification record.                                                         |

---

### Entity Relationships

The following section describes the relationships between entities, including foreign keys and cardinality.

- **Customer (1 : N) Session**
    - **Relación:** One-to-Many
    - **FK:** session.customer_id → customer.customer.id
    - **Descripción:** Un `customer` puede tener múltiples `sessions`, cada `session` pertenece a un solo `customer`.

- **Customer (1 : N) Payment**
    - **Relación:** One-to-Many
    - **FK:** payment.customer_id → customer.customer.id
    - **Descripción:** Un `customer` puede tener múltiples `payments`, cada `payment` pertenece a un solo `customer`.

- **Product (1 : N) Payment**
    - **Relación:** One-to-Many
    - **FK:** payment.product_id → product.product.id
    - **Descripción:** Un `product` puede estar easociado a múltiples `payments`, cada `payment` corresponde a un solo `product`.

- **Customer (1 : N) Verification**
    - **Relación:** One-to-Many
    - **FK:** verification.customer_id → customer.customer.id
    - **Descripción:** Un `customer` puede tener múltiples `verifications`, cada `verification` pertenece a un solo `customer`.

- **Session (1 : N) Verification**
    - **Relación:** One-to-Many
    - **FK:** verification.session_id → session.session.id
    - **Descripción:** Una `session` puede tener múltiples `verifications` (intentos, validaciones), una `verification` pertenece a una `session`.

- **Payment (1 : N ) Verification**
    - **Relación:** One-to-Many
    - **FK:** verification.payment_id → payment.payment.id
    - **Descripción:** Un `payment` puede tener múltiples `verifications`, cada `verification` corrsponde a un solo `payment`.

---