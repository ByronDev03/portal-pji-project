-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 09-04-2026 a las 06:09:37
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `portal_pji_project`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `customer_id` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `address` varchar(100) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `customer`
--

INSERT INTO `customer` (`customer_id`, `name`, `email`, `phone`, `address`, `active`, `created_at`, `updated_at`) VALUES
('14e436d3-92b4-4d68-9c9e-994f6e43d5c7', 'hvdhdvhdvdh', 'hvchdvhcd@yhao.com', '771717172823939', 'ucvhdcbdjdd', 1, '2026-02-22 01:52:45', '2026-02-22 01:52:45'),
('189d579f-a39e-4775-92c0-188fd4e516b0', 'Sam Carter', 'sam@yahoo.com', '+525518906789', 'Av. 2 PTE, Puebla', 1, '2026-03-02 00:54:44', '2026-03-02 00:54:44'),
('1a89f743-c09c-405e-8692-a4188768680c', 'aaaaaaaaaaaaaa', 'bbci@yaho.com', '7264332920200', 'ncncndnkdd', 1, '2026-02-26 01:01:17', '2026-02-26 01:01:17'),
('2b953d1d-ec73-4c02-ab3b-78b343c0365b', 'Alicia Villareal Ocampo', 'alivilla.167@hotmail.com', '+522481536924', 'Mza B Lote 3 Depto 402 Cuautla, Morelos', 1, '2026-02-23 01:00:22', '2026-02-23 01:00:22'),
('4c273f96-487b-4ac9-abb7-00c90410bd2a', 'jjjjcbbcicssib', 'cbcywe@hotmail.com', '1727272727888', 'bcbchbvshs', 1, '2026-02-26 01:21:14', '2026-02-26 01:21:14'),
('4e19c411-335a-4e3e-a8ed-392b5db9ec46', 'Byron Cuenca', 'byronjorge.168@gmail.com', '+527351829788', 'U.H. Piedra Blanca, Cuautla, Mor', 1, '2026-02-10 16:21:45', '2026-02-10 16:21:45'),
('4f38ff19-cd96-496a-9b84-5dfe337aa5c3', 'gchgcgvvbvv', 'vhvy@hotmail.com', '4678888888444', 'hbdnlsllsss', 1, '2026-02-25 22:07:52', '2026-02-25 22:07:52'),
('56c86801-209d-4add-8159-e9945554ee9b', 'bcbddbyyg', 'nkcbd@yaho.com', '7156272828294', 'jnchbdjcndjddr', 1, '2026-02-24 14:22:28', '2026-02-24 14:22:28'),
('615a516a-59c8-4cfe-bf45-a59a693fa32c', 'kskskskdkdidi', 'bcyye@yhao.com', '8373730303838384', 'ncjdjddlkdkd', 1, '2026-02-25 01:03:19', '2026-02-25 01:03:19'),
('642573a6-2209-4387-9495-ddd2ed91fc36', 'hahahajajajajaj', 'bcbcbd@yahoo.com', '181727382882727', '1ybxhbhxbshs', 1, '2026-02-27 01:24:09', '2026-02-27 01:24:09'),
('74737447-2134-4b10-aab7-6910c969d5df', 'nb xnbssh', 'ncjbd@yhao.com', '81818272728282', 'jhcjdmcncdj', 1, '2026-02-22 01:28:51', '2026-02-22 01:28:51'),
('98e8208f-9112-4fde-a123-b5a3a986d506', 'Luis Alvarez Muñoz', 'lui.167@yahoo.com', '+527701237610', 'Av. Jacarandas #18, Yautepec, Mor', 1, '2026-02-24 01:23:18', '2026-02-24 01:23:18'),
('9ec12897-e995-45fa-b56a-0abb53cb85f3', 'Jorge Méndez', 'jorgemdz@hotmail.com', '+527355892260', 'Col. Hidalgo #10, Cuautla, Mor', 1, '2026-02-13 10:32:04', '2026-02-13 10:32:04'),
('a254342f-62ef-43b9-a1e3-9d0bfabf4792', 'jbbbcbcbdb', 'bcbcyd@yahoo.com', '18282828282828', 'dbjbjcbsd', 1, '2026-02-26 00:36:54', '2026-02-26 00:36:54'),
('ab9ba64b-3c58-4700-bf7f-31df82840e23', 'hahakaksii', 'bchdy@yahoo.com', '1838382020203', 'bcjbcjdbjddd', 1, '2026-02-26 01:12:00', '2026-02-26 01:12:00'),
('b831a6b8-a7e5-4b4d-a490-4c449bc4d3d3', 'Lazaro Cardenas', 'lazcar@yahoo.com', '+523311122233', 'Calle Hidalgo #156 Guadalajara, Jal', 1, '2026-02-12 01:46:36', '2026-02-12 01:46:36'),
('bbbd2776-d9f6-4076-b847-19b8e729e3da', 'ddjdjdjdjdjdj', 'cbdh@gamil.com', '8117162627274', 'incjndjcdeer', 1, '2026-04-06 01:23:12', '2026-04-06 01:23:12'),
('e09bf1aa-a66a-4c18-9e0a-45d03bba72d9', 'Martin Rosas Suárez', 'martinrs@gamil.com', '+522205411733', 'Av. Reforma #144 CDMX', 1, '2026-02-23 22:25:27', '2026-02-23 22:25:27'),
('efd8a760-ade6-4188-a408-fc9ceadb4c42', 'Jose MIguel Cmarena Guzmán', 'josem.172@yahoo.com', '+527741569011', 'Av. Centro #15, Pue, Puebla', 1, '2026-03-23 02:02:11', '2026-03-23 02:02:11'),
('f7601b22-6d7d-4529-8f80-137727fcf88b', 'jbjbcjdbjcbk', 'bbxbx@yaho.com', '8181828393933', 'nncnccmdkdl', 1, '2026-02-25 00:52:56', '2026-02-25 00:52:56'),
('fa3383ea-e0a9-4bfb-871b-26651c19c22c', 'kkkkkkkkk', 'hshs@yaho.com', '1616127828282828', 'auauauaa', 1, '2026-04-08 01:26:01', '2026-04-08 01:26:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `payment_id` char(36) NOT NULL,
  `customer_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `amount` decimal(10,3) NOT NULL,
  `currency` char(3) NOT NULL DEFAULT 'MXN',
  `method` varchar(30) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `external_ref` varchar(100) NOT NULL,
  `paid_at` datetime NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payment_product` (`product_id`),
  KEY `fk_payment_customer` (`customer_id`)
) ;

--
-- Volcado de datos para la tabla `payment`
--

INSERT INTO `payment` (`payment_id`, `customer_id`, `product_id`, `amount`, `currency`, `method`, `status`, `external_ref`, `paid_at`, `created_at`, `updated_at`) VALUES
('0201cf4f-7203-4df6-a4c7-ea17c4b30999', 'e09bf1aa-a66a-4c18-9e0a-45d03bba72d9', 'c59b23f6-9186-4278-ab2d-2f0f95940ddb', 10449.500, 'MXN', 'oxxo', 'paid', 'PAY-1771907197946', '2026-02-23 22:26:38', '2026-02-23 22:26:37', '2026-02-23 22:26:38'),
('0b7a9141-557d-4c02-8c0c-6aa6b6133ae5', '642573a6-2209-4387-9495-ddd2ed91fc36', 'c59b23f6-9186-4278-ab2d-2f0f95940ddb', 9950.000, 'MXN', 'oxxo', 'paid', 'PJI-1772177073722', '2026-02-27 01:24:34', '2026-02-27 01:24:33', '2026-02-27 01:24:33'),
('0ba595eb-6ca4-415a-bc66-37bb16adb7f0', '56c86801-209d-4add-8159-e9945554ee9b', 'a7f978b8-78fe-4d78-a303-1eec3a1e145c', 4950.000, 'MXN', 'oxxo', 'paid', 'PAY-1771964669128', '2026-02-24 14:24:29', '2026-02-24 14:24:29', '2026-02-24 14:24:29'),
('23829718-d80b-4fec-9c24-5af925151e11', 'a254342f-62ef-43b9-a1e3-9d0bfabf4792', 'a7f978b8-78fe-4d78-a303-1eec3a1e145c', 4950.000, 'MXN', 'oxxo', 'paid', 'PAY-1772087841810', '2026-02-26 00:37:22', '2026-02-26 00:37:21', '2026-02-26 00:37:21'),
('55537e06-eade-43ec-be6f-7cc2e00bbb14', '189d579f-a39e-4775-92c0-188fd4e516b0', '882fd9e5-fa31-4777-8cba-78433661f592', 3500.000, 'MXN', 'oxxo', 'paid', 'PJI-1772434543319', '2026-03-02 00:55:43', '2026-03-02 00:55:43', '2026-03-02 00:55:43'),
('5a4b212a-23d3-4efe-851b-47be7a71be91', '9ec12897-e995-45fa-b56a-0abb53cb85f3', 'a7f978b8-78fe-4d78-a303-1eec3a1e145c', 7449.500, 'MXN', 'oxxo', 'pending', 'PAY-1771746421100', '0000-00-00 00:00:00', '2026-02-22 01:47:01', '2026-02-22 01:47:01'),
('5ed37778-087a-424f-9f7e-9fa3ad7a1376', 'fa3383ea-e0a9-4bfb-871b-26651c19c22c', 'c59b23f6-9186-4278-ab2d-2f0f95940ddb', 9950.000, 'MXN', 'oxxo', 'paid', 'PJI-1775633190236', '2026-04-08 01:26:30', '2026-04-08 01:26:30', '2026-04-08 01:26:30'),
('71623207-cf7f-4818-90ad-3c9452db3714', '4c273f96-487b-4ac9-abb7-00c90410bd2a', 'c59b23f6-9186-4278-ab2d-2f0f95940ddb', 9950.000, 'MXN', 'oxxo', 'paid', 'PJI-1772090511048', '2026-02-26 01:21:51', '2026-02-26 01:21:51', '2026-02-26 01:21:51'),
('a23c267a-a23f-4f58-a61b-833251cee105', '98e8208f-9112-4fde-a123-b5a3a986d506', 'c59b23f6-9186-4278-ab2d-2f0f95940ddb', 9950.000, 'MXN', 'oxxo', 'paid', 'PAY-1771917829989', '2026-02-24 01:23:50', '2026-02-24 01:23:49', '2026-02-24 01:23:50'),
('abf1c738-6bfd-42fe-a467-59af9cea7abd', 'ab9ba64b-3c58-4700-bf7f-31df82840e23', 'a7f978b8-78fe-4d78-a303-1eec3a1e145c', 4950.000, 'MXN', 'oxxo', 'paid', 'PAY-1772089942431', '2026-02-26 01:12:22', '2026-02-26 01:12:22', '2026-02-26 01:12:22'),
('b2f78282-0f79-4fd1-8bbc-2ff3e14ac6b2', '4e19c411-335a-4e3e-a8ed-392b5db9ec46', '882fd9e5-fa31-4777-8cba-78433661f592', 3500.000, 'MXN', 'oxxo', 'paid', 'OXXO-003-TPV', '0000-00-00 00:00:00', '2026-02-11 22:28:10', '2026-02-11 22:28:10'),
('bb378089-fde0-4346-af13-a20ab088e22d', '1a89f743-c09c-405e-8692-a4188768680c', 'a7f978b8-78fe-4d78-a303-1eec3a1e145c', 4950.000, 'MXN', 'oxxo', 'paid', 'PAY-1772089301911', '2026-02-26 01:01:42', '2026-02-26 01:01:41', '2026-02-26 01:01:41'),
('e107186d-0a8b-4fae-91d4-d146840f6228', '2b953d1d-ec73-4c02-ab3b-78b343c0365b', 'a7f978b8-78fe-4d78-a303-1eec3a1e145c', 7449.500, 'MXN', 'oxxo', 'pending', 'PAY-1771830055708', '0000-00-00 00:00:00', '2026-02-23 01:00:55', '2026-02-23 01:00:55'),
('fe86f6af-00ec-4be2-bb4d-a59bf4b1e295', '4f38ff19-cd96-496a-9b84-5dfe337aa5c3', 'c59b23f6-9186-4278-ab2d-2f0f95940ddb', 9950.000, 'MXN', 'oxxo', 'paid', 'PAY-1772078957463', '2026-02-25 22:09:17', '2026-02-25 22:09:17', '2026-02-25 22:09:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` char(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(255) NOT NULL,
  `min_monthly_rent` decimal(10,3) NOT NULL,
  `max_monthly_rent` decimal(10,3) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`product_id`, `name`, `description`, `min_monthly_rent`, `max_monthly_rent`, `active`, `created_at`, `updated_at`) VALUES
('882fd9e5-fa31-4777-8cba-78433661f592', 'Esencial', 'Cobertura enfocada en la recuperación del inmueble ante falta de pago, abandono o entrega voluntaria. Incluye intervención extrajucial al primer atraso y acción judicial desde el segundo mes impago.', 3500.000, 4949.000, 1, '2026-02-10 23:02:22', '2026-02-10 23:02:22'),
('a7f978b8-78fe-4d78-a303-1eec3a1e145c', 'Premium', 'Incluye todos los beneficios de Esencial y añade acompañamiento legal cuando el inquilino se niega a entregar el inmueble o a formalizar un nuevo acuerdo de arrendamiento.', 4950.000, 9949.000, 1, '2026-02-10 23:05:15', '2026-02-10 23:05:15'),
('c59b23f6-9186-4278-ab2d-2f0f95940ddb', 'Diamante', 'Integra las coberturas Esencial y Premium y amplía la protección con recuperación contenciosa de rentas, servicios e interes moratorios. Requiere fiador con propiedad libre de gravamen', 9950.000, 10949.000, 1, '2026-02-10 23:08:06', '2026-02-10 23:08:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `session_id` char(36) NOT NULL,
  `customer_id` char(36) NOT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_agent` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `started_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ended_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`session_id`),
  KEY `fk_session_customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `session`
--

INSERT INTO `session` (`session_id`, `customer_id`, `ip_address`, `user_agent`, `status`, `started_at`, `ended_at`, `created_at`, `updated_at`) VALUES
('436e216e-7d7d-499d-90e1-94f992787ae6', '9ec12897-e995-45fa-b56a-0abb53cb85f3', '::1', 'Safari/17 macOS', 'active', '2026-02-20 01:38:07', '2026-02-20 01:38:07', '2026-02-20 01:38:07', '2026-02-20 01:38:07'),
('e9257100-a4b6-4be0-adaa-09e89fdaef39', '4e19c411-335a-4e3e-a8ed-392b5db9ec46', '192.168.1.1', 'Chrome/119 Win10', 'active', '2026-02-10 23:10:42', '2026-02-10 23:10:42', '2026-02-10 23:10:42', '2026-02-10 23:10:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `verification`
--

DROP TABLE IF EXISTS `verification`;
CREATE TABLE IF NOT EXISTS `verification` (
  `verification_id` char(36) NOT NULL,
  `customer_id` char(36) NOT NULL,
  `session_id` char(36) NOT NULL,
  `payment_id` char(35) NOT NULL,
  `type` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `attempts` int NOT NULL DEFAULT '0',
  `expires_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `verified_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`verification_id`),
  KEY `fk_verification_payment` (`payment_id`),
  KEY `fk_verification_customer` (`customer_id`),
  KEY `fk_verification_session` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_payment_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  ADD CONSTRAINT `fk_payment_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Filtros para la tabla `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `fk_session_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`);

--
-- Filtros para la tabla `verification`
--
ALTER TABLE `verification`
  ADD CONSTRAINT `fk_verification_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  ADD CONSTRAINT `fk_verification_payment` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`),
  ADD CONSTRAINT `fk_verification_session` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
