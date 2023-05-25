-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20230412.45c7d30093
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 04, 2023 at 08:43 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fp_login`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `destination` varchar(128) NOT NULL,
  `checkin` date NOT NULL,
  `checkout` date NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`destination`, `checkin`, `checkout`, `comments`) VALUES
('maun', '2023-05-26', '2023-05-05', 'booking for a family of 4 '),
('maun', '2023-05-10', '2023-05-12', 'coming with a family of 4 '),
('francistown', '2023-05-10', '2023-05-13', 'family of 3 '),
('maun', '2023-05-17', '2023-05-11', 'cpming soon');

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `duration` varchar(128) NOT NULL DEFAULT '',
  `date` date NOT NULL,
  `dateEnd` date NOT NULL,
  `cost` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `bookingdate` date NOT NULL,
  `discount` int(11) NOT NULL,
  `valid` date NOT NULL,
  `transport` varchar(128) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`id`, `name`, `duration`, `date`, `dateEnd`, `cost`, `amount`, `bookingdate`, `discount`, `valid`, `transport`) VALUES
(3, 'lobatse', '5 days', '2023-05-05', '2023-05-27', 5000, 7000, '2023-06-06', 1000, '2023-05-10', 'bus');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `number` varchar(128) NOT NULL,
  `role` varchar(128) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `number`, `role`) VALUES
(4, 'agent', 'agent@gmail.com', '$2a$08$APPw3Wohw8spSKTCs.N0LOyrnkM490X/oLQTkYWdVmJa9JYHdKVGG', '1234567', 'Travel agent'),
(5, 'user12', 'user12@gmail.com', '$2a$10$kGrDhKdOQDBiZwTkvGHcO.LkePPYTo12YTl2MX83q5oJVxMNjVOZa', '09090909', 'Traveler'),
(6, 'testeragent', 'testeragent@gmail.com', '$2a$10$e9RiPXv7FIVk80cTZVXWfehwCO.sjeTwULe8z879HSa2Qxwu/S7TG', '555000222', 'Travel agent'),
(7, 'Ame Motswakadikgwa', 'amemotswaks@gmail.com', '$2a$08$JGqW7.EWPHr0Hgd7DcINHOT33Yykqg4SGmPwwnQU5J5abNf2FV4dO', '12733464', 'Traveler'),
(8, 'Tshepi', 't@gmail.com', '$2a$08$dYCwIv.3pn9Yg1TyPxI//OKPIJA9RveRmbtj.GiVOAHzvfdhleccS', 'motlogel', 'Traveler'),
(9, 'Thabiso Seleke', 'mrthabiso.seleke@gmail.com', '$2a$08$j3H4Rw5uKmMp2zeirMv.oOGAKDU/PAavWQz00SeOs/9f49mHsbDWO', '05550222', 'Traveler'),
(10, 'Tshepiso', 'th@gmail.com', '$2a$08$9fjvN/LXeFHf0JdlmqMAEuyyehv4T7sstfT.DNeqIQAm2MQNrfLyO', '12733464', 'Travel agent');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
