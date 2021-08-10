-- MariaDB dump 10.19  Distrib 10.6.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: vue_do_it_timed
-- ------------------------------------------------------
-- Server version	10.6.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `to_do`
--

DROP TABLE IF EXISTS `to_do`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `to_do` (
  `id` bigint(20) unsigned NOT NULL DEFAULT uuid_short(),
  `task` varchar(28) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hours` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `minutes` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `am_pm` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nanoid` varchar(21) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `to_do`
--

LOCK TABLES `to_do` WRITE;
/*!40000 ALTER TABLE `to_do` DISABLE KEYS */;
INSERT INTO `to_do` VALUES (99380578331131906,'YOU DOING IT NOW!','12','58','PM','w9d6kl_7qX_3-I0CzSOby'),(99380578331131907,'YOU DONE DOING IT YET!?','05','30','AM','C2n2WHiF-zqnpzBYMympU'),(99380578331131908,'DANG YOU SLOW AT THIS','04','28','PM','WLz-I__ZEK3NKNjFJFZ6_');
/*!40000 ALTER TABLE `to_do` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-09 23:56:19
