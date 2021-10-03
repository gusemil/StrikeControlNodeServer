-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2021 at 08:58 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rts`
--

-- --------------------------------------------------------

--
-- Table structure for table `rts`
--

CREATE TABLE `rts` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `score` int(255) NOT NULL,
  `waves` int(255) NOT NULL,
  `faction` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rts`
--

INSERT INTO `rts` (`id`, `name`, `score`, `waves`, `faction`) VALUES
(6, 'Test', 0, 0, 'Empire'),
(7, 'Test2', 0, 0, 'Empire'),
(8, 'Test3', 0, 0, 'Empire'),
(9, 'Test4', 0, 0, 'Empire'),
(10, 'Test5', 1, 0, 'Empire'),
(11, 'Test6', 0, 0, 'Empire'),
(12, 'Test7', 0, 0, 'Empire'),
(13, 'Test8', 0, 0, 'Empire'),
(14, 'Test9', 0, 0, 'Empire'),
(15, 'Test10', 0, 0, 'Empire'),
(16, 'Emil', 12145, 6, 'Union'),
(17, 'Emiltwo', 14896, 7, 'Cult');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rts`
--
ALTER TABLE `rts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rts`
--
ALTER TABLE `rts`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
