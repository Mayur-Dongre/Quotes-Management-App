-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: hackathon
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `FavoriteQuotes`
--

DROP TABLE IF EXISTS `FavoriteQuotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FavoriteQuotes` (
  `user_id` int NOT NULL,
  `quote_id` int NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `quote_id` (`quote_id`),
  CONSTRAINT `FavoriteQuotes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `FavoriteQuotes_ibfk_2` FOREIGN KEY (`quote_id`) REFERENCES `Quotes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FavoriteQuotes`
--

LOCK TABLES `FavoriteQuotes` WRITE;
/*!40000 ALTER TABLE `FavoriteQuotes` DISABLE KEYS */;
INSERT INTO `FavoriteQuotes` VALUES (1,16),(1,8),(7,17),(7,16),(9,17),(9,21),(5,8),(5,16),(12,17),(14,16),(14,21),(15,8),(15,17),(15,22),(9,8),(9,36);
/*!40000 ALTER TABLE `FavoriteQuotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Quotes`
--

DROP TABLE IF EXISTS `Quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Quotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `author` varchar(50) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Quotes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Quotes`
--

LOCK TABLES `Quotes` WRITE;
/*!40000 ALTER TABLE `Quotes` DISABLE KEYS */;
INSERT INTO `Quotes` VALUES (8,'Never Give Up','Anonymous',1),(9,'Follow The Process, Trust The Process','Virat Kohli',1),(16,'Be yourself, all are already taken','Oscar Wilde',4),(17,'Room without book is body without soul','Marcus Tullius Cicero',5),(21,'work like hell','maddy',1),(22,'Love the work you do.','Chandu',12),(23,'I am Batman','Aditya',14),(36,'asd','ads',9);
/*!40000 ALTER TABLE `Quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'mayur','dongre','mayur@gmail.com','mayur@123','7894561230'),(4,'undefined','undefined','undefined','maddy@123','undefined'),(5,'sagar','khond','sagar@gmail.com','sagar@123','1237896540'),(7,'chandrahas','sawant','chandu@gmail.com','chandu@123','1236547890'),(8,'dhiraj','fonso','dhiraj@gmail.com','dhiraj@123','3214569870'),(9,'md','dm','mdm','mdm','123'),(11,'123','123','123','123','123'),(12,'Anmol','Vashisht','anmol@gmail.com','anmol@123','1234567890'),(13,'1234','1234','1234','1234','1234'),(14,'Aditya (Batman)','Wakle','adityawakle23@gmail.com','aditya@123','8605690363'),(15,'maddy','dongre','maddy@gmail.com','maddy@123','1236547987');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-03  1:41:08
