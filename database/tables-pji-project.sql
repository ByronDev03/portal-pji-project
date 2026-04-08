-- DATABASE PJI Backend Schema (MySQL/MariaDB) --

/*
XAMPP
cd..
cd..
cd xampp
cd mysql
cd bin
mysql -u root -h localhost -p
*/

/* 
WampServer
cd C:\wamp64\bin\mysql\mysql9.1.0\bin
mysql -u root
cd C:\wamp64\bin\mariadb\mariadb11.5.2\bin
mysql -u root
*/

CREATE DATABASE portal_pji_project; -- Crea la base de datos llamada `portal_pji_project`
USE portal_pji_project;             -- Define la base de datos a utilizar.

/* ===================================== CUSTOMER ========================= */
/**
* Crea la tabla llamada `customer`
* Identificador primario del cliente en formato UUID textual (36 chars).
* Nombre del cliente, hasta 200 carácteres.
* Email del cliente, hasta 255 carácteres es el máximo típico según estándares.
* Teléfono, hasta 25 carácteres (incluye +, extensiones, espacios).
* Dirección del cliente, asta 255 caracteres. 
* Indicador de estado activo/inactivo. TINYINT(1) se usa como boolean (1=true). Por defecto 1 (activo).
* Marca de tiempo de creación. Se llena automáticamente al insertar.
* Marca de tiempo de última actualización. Se llena al insertar
* Clave primaria de la tabla (usa el `customer_id`).
* Motor de almacenamiento y opciones de codificación:
*   InnoDB permite transacciones, FK, bloqueos por fila.
*   Soporta todo Unicode (incluye emojis).
*   Comparación 'a-i' (accent-insensitive) y 'ci' (case-insensitive).
*/
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
/* ======================================================================= */


/* ========================== PRODUCT ========================== */
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
/* ============================================================== */


/* ======================================= SESSION ======================================== */
CREATE TABLE session (
  session_id     CHAR(36)       NOT NULL,                 
  customer_id    CHAR(36)       NOT NULL,                                                                   
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
/* ======================================================================================= */


/* =========================== PAYMENT ========================= */
CREATE TABLE payment (
  payment_id     CHAR(36)       NOT NULL,  
  customer_id     CHAR(36)       NOT NULL,                 
  product_id     CHAR(36)       NOT NULL,                                                                    
  amount         DECIMAL(10,3)  NOT NULL CHECK (amount >= 0),        
  currency       CHAR(3)        NOT NULL DEFAULT 'MXN',             
  method         VARCHAR(30)    NOT NULL,                            
  status         VARCHAR(20)    NOT NULL DEFAULT 'pending',          
  external_ref   VARCHAR(100)   NOT NULL,                                       
  paid_at        DATETIME       NOT NULL,                                          
  created_at     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (payment_id), 
  CONSTRAINT fk_payment_customer
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
  CONSTRAINT fk_payment_product
    FOREIGN KEY (product_id) REFERENCES product(product_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/* =============================================================== */

/* ====================================== VERIFICATION =================================== */
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
/* ========================================================================================= */