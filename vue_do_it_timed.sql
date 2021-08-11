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
-- Table structure for table `to_do_am`
--

DROP TABLE IF EXISTS `to_do_am`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `to_do_am` (
  `id` bigint(20) unsigned NOT NULL DEFAULT uuid_short(),
  `task` varchar(28) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hours` int(11) NOT NULL,
  `minutes` int(11) NOT NULL,
  `am_pm` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nanoid` varchar(21) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `to_do_am`
--

LOCK TABLES `to_do_am` WRITE;
/*!40000 ALTER TABLE `to_do_am` DISABLE KEYS */;
INSERT INTO `to_do_am` VALUES (99381936597762081,'EARLY STUFF',4,1,'AM','0HFEIgEKp3YyV2cVGTHQh'),(99381936597762084,'MIDNIGHT HOUR',0,1,'AM','F8HDn0np_pi_WRtUeHThn');
/*!40000 ALTER TABLE `to_do_am` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `to_do_pm`
--

DROP TABLE IF EXISTS `to_do_pm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `to_do_pm` (
  `id` bigint(20) unsigned NOT NULL DEFAULT uuid_short(),
  `task` varchar(28) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hours` int(11) NOT NULL,
  `minutes` int(11) NOT NULL,
  `am_pm` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nanoid` varchar(21) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `to_do_pm`
--

LOCK TABLES `to_do_pm` WRITE;
/*!40000 ALTER TABLE `to_do_pm` DISABLE KEYS */;
INSERT INTO `to_do_pm` VALUES (99381936597762082,'LATE STUFF ',23,54,'PM','ndM4nDXHFJZVSHDMiQarJ'),(99381936597762083,'HIGH NOON',12,1,'PM','SE19Tc62-jJmhVTo3IM7C');
/*!40000 ALTER TABLE `to_do_pm` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-11  2:40:14
