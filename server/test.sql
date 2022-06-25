-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2022 a las 18:49:17
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `id` bigint(20) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `estatus` varchar(20) CHARACTER SET utf8 NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tickets`
--

INSERT INTO `tickets` (`id`, `titulo`, `descripcion`, `estatus`, `usuario_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Sin conexion', 'problemas graves', '0', 0, '2022-06-07 23:59:07', '2022-06-07 23:59:07'),
(8, 'Windows server', 'no puedo entrar al equipo', 'pendiente', 0, '2022-06-08 20:23:26', '2022-06-08 20:23:26'),
(9, 'Windows server', 'no puedo entrar al equipo', 'pendiente', 0, '2022-06-08 20:29:02', '2022-06-08 20:29:02'),
(10, 'Windows server', 'no puedo entrar al equipo', 'pendiente', 0, '2022-06-08 20:29:51', '2022-06-08 20:29:51'),
(11, 'Windows server', 'no puedo entrar al equipo', 'pendiente', 0, '2022-06-08 20:58:58', '2022-06-08 20:58:58'),
(12, 'Windows server', 'no puedo entrar al equipo', 'pendiente', 0, '2022-06-08 20:59:28', '2022-06-08 20:59:28'),
(14, ' Test del Post Ticket', ' Test del post y el Put', 'Proceso', 10, '2022-06-08 21:03:02', '2022-06-08 21:03:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(3, 'test@test.com', '$2a$10$nyfMzW8fVHsZVqp3v3nWnO4BZ47sIuv0g/lBAllFpU5RGulF7rODy', '2022-06-07 05:19:03', '2022-06-07 05:19:03'),
(7, 'mattensohn64@gmail.com', '$2a$10$YfmI4nP3l5V3mfDnLDC6cuQSB/facDoPA0IV7RV7vHFF6VnYCcha.', '2022-06-08 17:20:15', '2022-06-08 17:20:15'),
(10, 'Testing@gmail.com', '$2a$10$duOPfLdkaQiqUlPyc8qB5.w5SQtctbxoH49BYxnYrfev/oX6/kHFm', '2022-06-08 19:50:15', '2022-06-08 19:50:15');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
