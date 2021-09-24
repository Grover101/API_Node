-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-05-2020 a las 16:31:33
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blog_viajes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE `autores` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `pseudonimo` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`id`, `email`, `contrasena`, `pseudonimo`, `avatar`) VALUES
(1, 'luis@email.com', '123123', 'luis2000', NULL),
(2, 'ana@email.com', '123123', 'a55555', NULL),
(3, 'pedro@email.com', '123123', 'pedro111', NULL),
(4, 'manuel@email.com', '123123', 'manu123', NULL),
(5, 'elmer@email.com', '123123', 'elmer', NULL),
(6, 'jose@email.com', '123123', 'jose123', NULL),
(7, 'mau@email.com', '123123', 'Mau456', NULL),
(8, 'eva@email.com', '123123', 'eva456', NULL),
(9, 'abril@email.com', '123123', 'abril', NULL),
(10, 'joel@email.com', '123123', 'joel', NULL),
(11, 'german@email.com', '123123', 'german123', NULL),
(12, 'matias@email.com', '123123', 'matias123', NULL),
(13, 'yo@email.com', '123123', 'yo', NULL),
(14, 'ahora@email.com', '123123', 'ahoraSI', NULL),
(15, 'banana@email.com', '123123', 'bananero', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `resumen` varchar(255) NOT NULL,
  `contenido` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `votos` int(11) DEFAULT 0,
  `fecha_hora` datetime NOT NULL,
  `autor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id`, `titulo`, `resumen`, `contenido`, `foto`, `votos`, `fecha_hora`, `autor_id`) VALUES
(1, 'Roma', 'Buen viaje a Roma', 'Contenido', NULL, 0, '2018-09-10 01:08:27', 1),
(2, 'Grecia', 'Buen viaje a Grecia', 'Contenido</p>', NULL, 0, '2018-09-11 01:08:27', 1),
(3, 'Paris', 'Buen viaje a Paris', 'Contenido', NULL, 0, '2018-09-12 01:08:27', 1),
(4, 'Costa Rica', 'Buen viaje a Costa Rica', 'Contenido', NULL, 0, '2018-09-13 01:08:27', 2),
(5, 'Mar de Plata', 'Buen viaje a Mar de Plata', 'Contenido', NULL, 0, '2018-09-14 01:08:27', 2),
(6, 'Guadalajara', 'Buen viaje a Guadalajara', 'Contenido', NULL, 0, '2018-09-15 01:08:27', 2),
(7, 'China', 'Buen viaje a China', 'Contenido', NULL, 2, '2018-09-16 01:08:27', 2),
(9, 'Italia', 'Buen viaje a Italia', 'Contenido', NULL, 0, '2020-05-11 00:00:00', 14),
(10, 'Italia', 'Buen viaje a Italia', 'Contenido', NULL, 0, '2020-05-11 00:00:00', 14),
(11, 'Peru', 'Buen viaje a Peru', 'Contenido', NULL, 0, '2020-05-11 00:00:00', 14),
(12, 'Argentina', 'Buen viaje a Argentina', 'Contenido', NULL, 0, '2020-05-11 00:00:00', 14),
(13, 'Mexico', 'Buen viaje a Mexico', 'Contenido', NULL, 0, '2020-05-12 00:00:00', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor_id` (`autor_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autores`
--
ALTER TABLE `autores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `autores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
