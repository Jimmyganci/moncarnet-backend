-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: moncarnet
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('20d72e36-9f70-4f19-a463-cc893dc90662','b137acf9d9c63a7c892b5e7e573d31eaae9f7a402977e6a21167f44f8e29ee7b','2022-01-27 19:59:03.907','20220127195859_moncarnet',NULL,NULL,'2022-01-27 19:58:59.861',1),('5b668155-515e-4bb6-ba45-42aba320faff','b276b471738f5e5a3669ab10b42d873a1167a11bd06bea159710b0f5777b74c3','2022-01-27 19:57:46.150','20220107134823_last_migration',NULL,NULL,'2022-01-27 19:57:28.693',1),('65356216-34e4-46d9-8b83-38f6f3a265a5','3c3c94ac2a120b8715176b0f321b1353173af8497bfe2fd1192942d13332830d','2022-01-27 19:57:48.283','20220127180044_moncarnet',NULL,NULL,'2022-01-27 19:57:47.675',1),('7ae329f6-a129-408c-ba01-2232be8e713d','a9c079fab0c06571fcddbeee730acb61b2dd6356121f0fd1ab349a6472741f51','2022-01-27 19:57:47.558','20220119120215_admin',NULL,NULL,'2022-01-27 19:57:46.200',1),('a569d615-44b2-42ca-8ffa-92f839bb9f0b','533ba350d564a430ba22c1fcf49c8abcaa55371dc6ec4d2df33de16985d6b710','2022-01-28 08:41:01.070','20220128084100_active_in_users_and_immat_in_appointments',NULL,NULL,'2022-01-28 08:41:00.161',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prostousers`
--

DROP TABLE IF EXISTS `_prostousers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prostousers` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_prostousers_AB_unique` (`A`,`B`),
  KEY `_prostousers_B_index` (`B`),
  CONSTRAINT `_prostousers_ibfk_1` FOREIGN KEY (`A`) REFERENCES `pros` (`id_pros`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_prostousers_ibfk_2` FOREIGN KEY (`B`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prostousers`
--

LOCK TABLES `_prostousers` WRITE;
/*!40000 ALTER TABLE `_prostousers` DISABLE KEYS */;
INSERT INTO `_prostousers` VALUES (3,1),(3,2),(3,3),(3,4);
/*!40000 ALTER TABLE `_prostousers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashedPassword` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Jimmy','Ganci','jimmy@ganci.fr','$argon2id$v=19$m=65536,t=5,p=1$BQUwTcdekwGR+gUEgB3GZg$9CG2lc9/F/7inAz1hUJZPuBXtVYJ/bqYEAuF0YoLpE8');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `id_appointment` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `prosId` int NOT NULL,
  `date` datetime NOT NULL,
  `comment` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `immat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_appointment`),
  KEY `Appointment_userId_fkey` (`userId`),
  KEY `Appointment_prosId_fkey` (`prosId`),
  KEY `Appointments_immat_fkey` (`immat`),
  CONSTRAINT `Appointment_immat_fkey` FOREIGN KEY (`immat`) REFERENCES `vehicules` (`immat`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Appointment_prosId_fkey` FOREIGN KEY (`prosId`) REFERENCES `pros` (`id_pros`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,1,1,'2020-11-15 11:00:00','Révision des 15 000','BG-897-ZU'),(2,1,1,'2021-05-11 15:30:00','Révision des 30 000','BG-897-ZU'),(3,1,3,'2022-03-25 09:30:00','Révision des 100 000','BG-897-ZU'),(4,1,2,'2022-06-02 11:30:00','Révision des 150 000','QD-462-FG'),(5,2,3,'2021-05-11 15:30:00','Révision des 30 000','BT-628-LK'),(6,2,2,'2020-11-15 11:00:00','Révision des 15 000','BT-628-LK'),(7,2,3,'2022-06-02 11:30:00','Révision des 150 000','DR-476-LM'),(8,2,3,'2022-03-25 09:30:00','Révision des 100 000','DR-476-LM'),(9,3,3,'2021-08-11 15:30:00','Révision des 30 000','KJ-265-FR'),(10,3,3,'2020-01-15 11:00:00','Révision des 15 000','KJ-265-FR'),(11,3,3,'2022-04-25 09:45:00','Révision des 100 000','KJ-265-FR'),(12,3,3,'2022-04-02 11:30:00','Révision des 150 000','ER-825-LM');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id_brand` int NOT NULL AUTO_INCREMENT,
  `code` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_brand`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'ACURA','Acura'),(2,'ALFA','Alfa Romeo'),(3,'AMC','AMC'),(4,'ASTON','Aston Martin'),(5,'AUDI','Audi'),(6,'AVANTI','Avanti'),(7,'BENTL','Bentley'),(8,'BMW','BMW'),(9,'BUICK','Buick'),(10,'CAD','Cadillac'),(11,'CHEV','Chevrolet'),(12,'CHRY','Chrysler'),(13,'DAEW','Daewoo'),(14,'DAIHAT','Daihatsu'),(15,'DATSUN','Datsun'),(16,'DELOREAN','DeLorean'),(17,'DODGE','Dodge'),(18,'EAGLE','Eagle'),(19,'FER','Ferrari'),(20,'FIAT','FIAT'),(21,'FISK','Fisker'),(22,'FORD','Ford'),(23,'FREIGHT','Freightliner'),(24,'GEO','Geo'),(25,'GMC','GMC'),(26,'HONDA','Honda'),(27,'AMGEN','HUMMER'),(28,'HYUND','Hyundai'),(29,'INFIN','Infiniti'),(30,'ISU','Isuzu'),(31,'JAG','Jaguar'),(32,'JEEP','Jeep'),(33,'KIA','Kia'),(34,'LAM','Lamborghini'),(35,'LAN','Lancia'),(36,'ROV','Land Rover'),(37,'LEXUS','Lexus'),(38,'LINC','Lincoln'),(39,'LOTUS','Lotus'),(40,'MAS','Maserati'),(41,'MAYBACH','Maybach'),(42,'MAZDA','Mazda'),(43,'MCLAREN','McLaren'),(44,'MB','Mercedes-Benz'),(45,'MERC','Mercury'),(46,'MERKUR','Merkur'),(47,'MINI','MINI'),(48,'MIT','Mitsubishi'),(49,'NISSAN','Nissan'),(50,'OLDS','Oldsmobile'),(51,'PEUG','Peugeot'),(52,'PLYM','Plymouth'),(53,'PONT','Pontiac'),(54,'POR','Porsche'),(55,'RAM','RAM'),(56,'REN','Renault'),(57,'RR','Rolls-Royce'),(58,'SAAB','Saab'),(59,'SATURN','Saturn'),(60,'SCION','Scion'),(61,'SMART','smart'),(62,'SRT','SRT'),(63,'STERL','Sterling'),(64,'SUB','Subaru'),(65,'SUZUKI','Suzuki'),(66,'TESLA','Tesla'),(67,'TOYOTA','Toyota'),(68,'TRI','Triumph'),(69,'VOLKS','Volkswagen'),(70,'VOLVO','Volvo'),(71,'YUGO','Yugo');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `models` (
  `id_model` int NOT NULL AUTO_INCREMENT,
  `code` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_brand` int NOT NULL,
  PRIMARY KEY (`id_model`),
  KEY `Models_id_brand_fkey` (`id_brand`),
  CONSTRAINT `Models_id_brand_fkey` FOREIGN KEY (`id_brand`) REFERENCES `brand` (`id_brand`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1315 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` VALUES (1,'CL_MODELS','CL Models (4)',1),(2,'2.2CL',' - 2.2CL',1),(3,'2.3CL',' - 2.3CL',1),(4,'3.0CL',' - 3.0CL',1),(5,'3.2CL',' - 3.2CL',1),(6,'ILX','ILX',1),(7,'INTEG','Integra',1),(8,'LEGEND','Legend',1),(9,'MDX','MDX',1),(10,'NSX','NSX',1),(11,'RDX','RDX',1),(12,'RL_MODELS','RL Models (2)',1),(13,'3.5RL',' - 3.5 RL',1),(14,'RL',' - RL',1),(15,'RSX','RSX',1),(16,'SLX','SLX',1),(17,'TL_MODELS','TL Models (3)',1),(18,'2.5TL',' - 2.5TL',1),(19,'3.2TL',' - 3.2TL',1),(20,'TL',' - TL',1),(21,'TSX','TSX',1),(22,'VIGOR','Vigor',1),(23,'ZDX','ZDX',1),(24,'ACUOTH','Other Acura Models',1),(25,'ALFA164','164',2),(26,'ALFA8C','8C Competizione',2),(27,'ALFAGT','GTV-6',2),(28,'MIL','Milano',2),(29,'SPID','Spider',2),(30,'ALFAOTH','Other Alfa Romeo Models',2),(31,'AMCALLIAN','Alliance',3),(32,'CON','Concord',3),(33,'EAGLE','Eagle',3),(34,'AMCENC','Encore',3),(35,'AMCSPIRIT','Spirit',3),(36,'AMCOTH','Other AMC Models',3),(37,'DB7','DB7',4),(38,'DB9','DB9',4),(39,'DBS','DBS',4),(40,'LAGONDA','Lagonda',4),(41,'RAPIDE','Rapide',4),(42,'V12VANT','V12 Vantage',4),(43,'VANTAGE','V8 Vantage',4),(44,'VANQUISH','Vanquish',4),(45,'VIRAGE','Virage',4),(46,'UNAVAILAST','Other Aston Martin Models',4),(47,'AUDI100','100',5),(48,'AUDI200','200',5),(49,'4000','4000',5),(50,'5000','5000',5),(51,'80','80',5),(52,'90','90',5),(53,'A3','A3',5),(54,'A4','A4',5),(55,'A5','A5',5),(56,'A6','A6',5),(57,'A7','A7',5),(58,'A8','A8',5),(59,'ALLRDQUA','allroad',5),(60,'AUDICABRI','Cabriolet',5),(61,'AUDICOUPE','Coupe',5),(62,'Q3','Q3',5),(63,'Q5','Q5',5),(64,'Q7','Q7',5),(65,'QUATTR','Quattro',5),(66,'R8','R8',5),(67,'RS4','RS 4',5),(68,'RS5','RS 5',5),(69,'RS6','RS 6',5),(70,'S4','S4',5),(71,'S5','S5',5),(72,'S6','S6',5),(73,'S7','S7',5),(74,'S8','S8',5),(75,'TT','TT',5),(76,'TTRS','TT RS',5),(77,'TTS','TTS',5),(78,'V8','V8 Quattro',5),(79,'AUDOTH','Other Audi Models',5),(80,'CONVERT','Convertible',6),(81,'COUPEAVANT','Coupe',6),(82,'SEDAN','Sedan',6),(83,'UNAVAILAVA','Other Avanti Models',6),(84,'ARNAGE','Arnage',7),(85,'AZURE','Azure',7),(86,'BROOKLANDS','Brooklands',7),(87,'BENCONT','Continental',7),(88,'CORNICHE','Corniche',7),(89,'BENEIGHT','Eight',7),(90,'BENMUL','Mulsanne',7),(91,'BENTURBO','Turbo R',7),(92,'UNAVAILBEN','Other Bentley Models',7),(93,'1_SERIES','1 Series (3)',8),(94,'128I',' - 128i',8),(95,'135I',' - 135i',8),(96,'135IS',' - 135is',8),(97,'3_SERIES','3 Series (29)',8),(98,'318I',' - 318i',8),(99,'318IC',' - 318iC',8),(100,'318IS',' - 318iS',8),(101,'318TI',' - 318ti',8),(102,'320I',' - 320i',8),(103,'323CI',' - 323ci',8),(104,'323I',' - 323i',8),(105,'323IS',' - 323is',8),(106,'323IT',' - 323iT',8),(107,'325CI',' - 325Ci',8),(108,'325E',' - 325e',8),(109,'325ES',' - 325es',8),(110,'325I',' - 325i',8),(111,'325IS',' - 325is',8),(112,'325IX',' - 325iX',8),(113,'325XI',' - 325xi',8),(114,'328CI',' - 328Ci',8),(115,'328I',' - 328i',8),(116,'328IS',' - 328iS',8),(117,'328XI',' - 328xi',8),(118,'330CI',' - 330Ci',8),(119,'330I',' - 330i',8),(120,'330XI',' - 330xi',8),(121,'335D',' - 335d',8),(122,'335I',' - 335i',8),(123,'335IS',' - 335is',8),(124,'335XI',' - 335xi',8),(125,'ACTIVE3',' - ActiveHybrid 3',8),(126,'BMW325',' - 325',8),(127,'5_SERIES','5 Series (19)',8),(128,'524TD',' - 524td',8),(129,'525I',' - 525i',8),(130,'525XI',' - 525xi',8),(131,'528E',' - 528e',8),(132,'528I',' - 528i',8),(133,'528IT',' - 528iT',8),(134,'528XI',' - 528xi',8),(135,'530I',' - 530i',8),(136,'530IT',' - 530iT',8),(137,'530XI',' - 530xi',8),(138,'533I',' - 533i',8),(139,'535I',' - 535i',8),(140,'535IGT',' - 535i Gran Turismo',8),(141,'535XI',' - 535xi',8),(142,'540I',' - 540i',8),(143,'545I',' - 545i',8),(144,'550I',' - 550i',8),(145,'550IGT',' - 550i Gran Turismo',8),(146,'ACTIVE5',' - ActiveHybrid 5',8),(147,'6_SERIES','6 Series (8)',8),(148,'633CSI',' - 633CSi',8),(149,'635CSI',' - 635CSi',8),(150,'640I',' - 640i',8),(151,'640IGC',' - 640i Gran Coupe',8),(152,'645CI',' - 645Ci',8),(153,'650I',' - 650i',8),(154,'650IGC',' - 650i Gran Coupe',8),(155,'L6',' - L6',8),(156,'7_SERIES','7 Series (15)',8),(157,'733I',' - 733i',8),(158,'735I',' - 735i',8),(159,'735IL',' - 735iL',8),(160,'740I',' - 740i',8),(161,'740IL',' - 740iL',8),(162,'740LI',' - 740Li',8),(163,'745I',' - 745i',8),(164,'745LI',' - 745Li',8),(165,'750I',' - 750i',8),(166,'750IL',' - 750iL',8),(167,'750LI',' - 750Li',8),(168,'760I',' - 760i',8),(169,'760LI',' - 760Li',8),(170,'ACTIVE7',' - ActiveHybrid 7',8),(171,'ALPINAB7',' - Alpina B7',8),(172,'8_SERIES','8 Series (4)',8),(173,'840CI',' - 840Ci',8),(174,'850CI',' - 850Ci',8),(175,'850CSI',' - 850CSi',8),(176,'850I',' - 850i',8),(177,'L_SERIES','L Series (1)',8),(178,'L7',' - L7',8),(179,'M_SERIES','M Series (8)',8),(180,'1SERIESM',' - 1 Series M',8),(181,'BMWMCOUPE',' - M Coupe',8),(182,'BMWROAD',' - M Roadster',8),(183,'M3',' - M3',8),(184,'M5',' - M5',8),(185,'M6',' - M6',8),(186,'X5M',' - X5 M',8),(187,'X6M',' - X6 M',8),(188,'X_SERIES','X Series (5)',8),(189,'ACTIVEX6',' - ActiveHybrid X6',8),(190,'X1',' - X1',8),(191,'X3',' - X3',8),(192,'X5',' - X5',8),(193,'X6',' - X6',8),(194,'Z_SERIES','Z Series (3)',8),(195,'Z3',' - Z3',8),(196,'Z4',' - Z4',8),(197,'Z8',' - Z8',8),(198,'BMWOTH','Other BMW Models',8),(199,'CENT','Century',9),(200,'ELEC','Electra',9),(201,'ENCLAVE','Enclave',9),(202,'BUIENC','Encore',9),(203,'LACROSSE','LaCrosse',9),(204,'LESA','Le Sabre',9),(205,'LUCERNE','Lucerne',9),(206,'PARK','Park Avenue',9),(207,'RAINIER','Rainier',9),(208,'REATTA','Reatta',9),(209,'REG','Regal',9),(210,'RENDEZVOUS','Rendezvous',9),(211,'RIV','Riviera',9),(212,'BUICKROAD','Roadmaster',9),(213,'SKYH','Skyhawk',9),(214,'SKYL','Skylark',9),(215,'SOMER','Somerset',9),(216,'TERRAZA','Terraza',9),(217,'BUVERANO','Verano',9),(218,'BUOTH','Other Buick Models',9),(219,'ALLANT','Allante',10),(220,'ATS','ATS',10),(221,'BROUGH','Brougham',10),(222,'CATERA','Catera',10),(223,'CIMA','Cimarron',10),(224,'CTS','CTS',10),(225,'DEV','De Ville',10),(226,'DTS','DTS',10),(227,'ELDO','Eldorado',10),(228,'ESCALA','Escalade',10),(229,'ESCALAESV','Escalade ESV',10),(230,'EXT','Escalade EXT',10),(231,'FLEE','Fleetwood',10),(232,'SEV','Seville',10),(233,'SRX','SRX',10),(234,'STS','STS',10),(235,'XLR','XLR',10),(236,'XTS','XTS',10),(237,'CADOTH','Other Cadillac Models',10),(238,'ASTRO','Astro',11),(239,'AVALNCH','Avalanche',11),(240,'AVEO','Aveo',11),(241,'AVEO5','Aveo5',11),(242,'BERETT','Beretta',11),(243,'BLAZER','Blazer',11),(244,'CAM','Camaro',11),(245,'CAP','Caprice',11),(246,'CHECAPS','Captiva Sport',11),(247,'CAV','Cavalier',11),(248,'CELE','Celebrity',11),(249,'CHEVETTE','Chevette',11),(250,'CITATION','Citation',11),(251,'COBALT','Cobalt',11),(252,'COLORADO','Colorado',11),(253,'CORSI','Corsica',11),(254,'CORV','Corvette',11),(255,'CRUZE','Cruze',11),(256,'ELCAM','El Camino',11),(257,'EQUINOX','Equinox',11),(258,'G15EXP','Express Van',11),(259,'G10','G Van',11),(260,'HHR','HHR',11),(261,'CHEVIMP','Impala',11),(262,'KODC4500','Kodiak C4500',11),(263,'LUMINA','Lumina',11),(264,'LAPV','Lumina APV',11),(265,'LUV','LUV',11),(266,'MALI','Malibu',11),(267,'CHVMETR','Metro',11),(268,'CHEVMONT','Monte Carlo',11),(269,'NOVA','Nova',11),(270,'CHEVPRIZM','Prizm',11),(271,'CHVST','S10 Blazer',11),(272,'S10PICKUP','S10 Pickup',11),(273,'CHEV150','Silverado and other C/K1500',11),(274,'CHEVC25','Silverado and other C/K2500',11),(275,'CH3500PU','Silverado and other C/K3500',11),(276,'SONIC','Sonic',11),(277,'SPARK','Spark',11),(278,'CHEVSPEC','Spectrum',11),(279,'CHSPRINT','Sprint',11),(280,'SSR','SSR',11),(281,'CHEVSUB','Suburban',11),(282,'TAHOE','Tahoe',11),(283,'TRACKE','Tracker',11),(284,'TRAILBLZ','TrailBlazer',11),(285,'TRAILBZEXT','TrailBlazer EXT',11),(286,'TRAVERSE','Traverse',11),(287,'UPLANDER','Uplander',11),(288,'VENTUR','Venture',11),(289,'VOLT','Volt',11),(290,'CHEOTH','Other Chevrolet Models',11),(291,'CHRYS200','200',12),(292,'300','300',12),(293,'CHRY300','300M',12),(294,'ASPEN','Aspen',12),(295,'CARAVAN','Caravan',12),(296,'CIRRUS','Cirrus',12),(297,'CONC','Concorde',12),(298,'CHRYCONQ','Conquest',12),(299,'CORDOBA','Cordoba',12),(300,'CROSSFIRE','Crossfire',12),(301,'ECLASS','E Class',12),(302,'FIFTH','Fifth Avenue',12),(303,'CHRYGRANDV','Grand Voyager',12),(304,'IMPE','Imperial',12),(305,'INTREPID','Intrepid',12),(306,'CHRYLAS','Laser',12),(307,'LEBA','LeBaron',12),(308,'LHS','LHS',12),(309,'CHRYNEON','Neon',12),(310,'NY','New Yorker',12),(311,'NEWPORT','Newport',12),(312,'PACIFICA','Pacifica',12),(313,'CHPROWLE','Prowler',12),(314,'PTCRUIS','PT Cruiser',12),(315,'CHRYSEB','Sebring',12),(316,'CHRYTC','TC by Maserati',12),(317,'TANDC','Town & Country',12),(318,'VOYAGER','Voyager',12),(319,'CHOTH','Other Chrysler Models',12),(320,'LANOS','Lanos',13),(321,'LEGANZA','Leganza',13),(322,'NUBIRA','Nubira',13),(323,'DAEOTH','Other Daewoo Models',13),(324,'CHAR','Charade',14),(325,'ROCKY','Rocky',14),(326,'DAIHOTH','Other Daihatsu Models',14),(327,'DAT200SX','200SX',15),(328,'DAT210','210',15),(329,'280Z','280ZX',15),(330,'300ZX','300ZX',15),(331,'310','310',15),(332,'510','510',15),(333,'720','720',15),(334,'810','810',15),(335,'DATMAX','Maxima',15),(336,'DATPU','Pickup',15),(337,'PUL','Pulsar',15),(338,'DATSENT','Sentra',15),(339,'STAN','Stanza',15),(340,'DATOTH','Other Datsun Models',15),(341,'DMC12','DMC-12',16),(342,'400','400',17),(343,'DOD600','600',17),(344,'ARI','Aries',17),(345,'AVENGR','Avenger',17),(346,'CALIBER','Caliber',17),(347,'DODCARA','Caravan',17),(348,'CHALLENGER','Challenger',17),(349,'DODCHAR','Charger',17),(350,'DODCOLT','Colt',17),(351,'DODCONQ','Conquest',17),(352,'DODDW','D/W Truck',17),(353,'DAKOTA','Dakota',17),(354,'DODDART','Dart',17),(355,'DAY','Daytona',17),(356,'DIPLOMA','Diplomat',17),(357,'DURANG','Durango',17),(358,'DODDYNA','Dynasty',17),(359,'GRANDCARAV','Grand Caravan',17),(360,'INTRE','Intrepid',17),(361,'JOURNEY','Journey',17),(362,'LANCERDODG','Lancer',17),(363,'MAGNUM','Magnum',17),(364,'MIRADA','Mirada',17),(365,'MONACO','Monaco',17),(366,'DODNEON','Neon',17),(367,'NITRO','Nitro',17),(368,'OMNI','Omni',17),(369,'RAIDER','Raider',17),(370,'RAM1504WD','Ram 1500 Truck',17),(371,'RAM25002WD','Ram 2500 Truck',17),(372,'RAM3502WD','Ram 3500 Truck',17),(373,'RAM4500','Ram 4500 Truck',17),(374,'DODD50','Ram 50 Truck',17),(375,'CV','RAM C/V',17),(376,'RAMSRT10','Ram SRT-10',17),(377,'RAMVANV8','Ram Van',17),(378,'RAMWAGON','Ram Wagon',17),(379,'RAMCGR','Ramcharger',17),(380,'RAMPAGE','Rampage',17),(381,'DODSHAD','Shadow',17),(382,'DODSPIR','Spirit',17),(383,'SPRINTER','Sprinter',17),(384,'SRT4','SRT-4',17),(385,'STREGIS','St. Regis',17),(386,'STEAL','Stealth',17),(387,'STRATU','Stratus',17),(388,'VIPER','Viper',17),(389,'DOOTH','Other Dodge Models',17),(390,'EAGLEMED','Medallion',18),(391,'EAGLEPREM','Premier',18),(392,'SUMMIT','Summit',18),(393,'TALON','Talon',18),(394,'VISION','Vision',18),(395,'EAGOTH','Other Eagle Models',18),(396,'308GTB','308 GTB Quattrovalvole',19),(397,'308TBI','308 GTBI',19),(398,'308GTS','308 GTS Quattrovalvole',19),(399,'308TSI','308 GTSI',19),(400,'328GTB','328 GTB',19),(401,'328GTS','328 GTS',19),(402,'348GTB','348 GTB',19),(403,'348GTS','348 GTS',19),(404,'348SPI','348 Spider',19),(405,'348TB','348 TB',19),(406,'348TS','348 TS',19),(407,'360','360',19),(408,'456GT','456 GT',19),(409,'456MGT','456M GT',19),(410,'458ITALIA','458 Italia',19),(411,'512BBI','512 BBi',19),(412,'512M','512M',19),(413,'512TR','512TR',19),(414,'550M','550 Maranello',19),(415,'575M','575M Maranello',19),(416,'599GTB','599 GTB Fiorano',19),(417,'599GTO','599 GTO',19),(418,'612SCAGLIE','612 Scaglietti',19),(419,'FERCALIF','California',19),(420,'ENZO','Enzo',19),(421,'F355','F355',19),(422,'F40','F40',19),(423,'F430','F430',19),(424,'F50','F50',19),(425,'FERFF','FF',19),(426,'MOND','Mondial',19),(427,'TEST','Testarossa',19),(428,'UNAVAILFER','Other Ferrari Models',19),(429,'2000','2000 Spider',20),(430,'FIAT500','500',20),(431,'BERTON','Bertone X1/9',20),(432,'BRAVA','Brava',20),(433,'PININ','Pininfarina Spider',20),(434,'STRADA','Strada',20),(435,'FIATX19','X1/9',20),(436,'UNAVAILFIA','Other Fiat Models',20),(437,'KARMA','Karma',21),(438,'AERO','Aerostar',22),(439,'ASPIRE','Aspire',22),(440,'BRON','Bronco',22),(441,'B2','Bronco II',22),(442,'FOCMAX','C-MAX',22),(443,'FORDCLUB','Club Wagon',22),(444,'CONTOUR','Contour',22),(445,'COURIER','Courier',22),(446,'CROWNVIC','Crown Victoria',22),(447,'E150ECON','E-150 and Econoline 150',22),(448,'E250ECON','E-250 and Econoline 250',22),(449,'E350ECON','E-350 and Econoline 350',22),(450,'EDGE','Edge',22),(451,'ESCAPE','Escape',22),(452,'ESCO','Escort',22),(453,'EXCURSION','Excursion',22),(454,'EXP','EXP',22),(455,'EXPEDI','Expedition',22),(456,'EXPEDIEL','Expedition EL',22),(457,'EXPLOR','Explorer',22),(458,'SPORTTRAC','Explorer Sport Trac',22),(459,'F100','F100',22),(460,'F150PICKUP','F150',22),(461,'F250','F250',22),(462,'F350','F350',22),(463,'F450','F450',22),(464,'FAIRM','Fairmont',22),(465,'FESTIV','Festiva',22),(466,'FIESTA','Fiesta',22),(467,'FIVEHUNDRE','Five Hundred',22),(468,'FLEX','Flex',22),(469,'FOCUS','Focus',22),(470,'FREESTAR','Freestar',22),(471,'FREESTYLE','Freestyle',22),(472,'FUSION','Fusion',22),(473,'GRANADA','Granada',22),(474,'GT','GT',22),(475,'LTD','LTD',22),(476,'MUST','Mustang',22),(477,'PROBE','Probe',22),(478,'RANGER','Ranger',22),(479,'TAURUS','Taurus',22),(480,'TAURUSX','Taurus X',22),(481,'TEMPO','Tempo',22),(482,'TBIRD','Thunderbird',22),(483,'TRANSCONN','Transit Connect',22),(484,'WINDST','Windstar',22),(485,'FORDZX2','ZX2 Escort',22),(486,'FOOTH','Other Ford Models',22),(487,'FRESPRINT','Sprinter',23),(488,'GEOMETRO','Metro',24),(489,'GEOPRIZM','Prizm',24),(490,'SPECT','Spectrum',24),(491,'STORM','Storm',24),(492,'GEOTRACK','Tracker',24),(493,'GEOOTH','Other Geo Models',24),(494,'ACADIA','Acadia',25),(495,'CABALLERO','Caballero',25),(496,'CANYON','Canyon',25),(497,'ENVOY','Envoy',25),(498,'ENVOYXL','Envoy XL',25),(499,'ENVOYXUV','Envoy XUV',25),(500,'JIM','Jimmy',25),(501,'RALLYWAG','Rally Wagon',25),(502,'GMCS15','S15 Jimmy',25),(503,'S15','S15 Pickup',25),(504,'SAFARIGMC','Safari',25),(505,'GMCSAVANA','Savana',25),(506,'15SIPU4WD','Sierra C/K1500',25),(507,'GMCC25PU','Sierra C/K2500',25),(508,'GMC3500PU','Sierra C/K3500',25),(509,'SONOMA','Sonoma',25),(510,'SUB','Suburban',25),(511,'GMCSYCLON','Syclone',25),(512,'TERRAIN','Terrain',25),(513,'TOPC4500','TopKick C4500',25),(514,'TYPH','Typhoon',25),(515,'GMCVANDUR','Vandura',25),(516,'YUKON','Yukon',25),(517,'YUKONXL','Yukon XL',25),(518,'GMCOTH','Other GMC Models',25),(519,'ACCORD','Accord',26),(520,'CIVIC','Civic',26),(521,'CRV','CR-V',26),(522,'CRZ','CR-Z',26),(523,'CRX','CRX',26),(524,'CROSSTOUR_MODELS','Crosstour and Accord Crosstour Models (2)',26),(525,'CROSSTOUR',' - Accord Crosstour',26),(526,'HONCROSS',' - Crosstour',26),(527,'HONDELSOL','Del Sol',26),(528,'ELEMENT','Element',26),(529,'FIT','Fit',26),(530,'INSIGHT','Insight',26),(531,'ODYSSEY','Odyssey',26),(532,'PASSPO','Passport',26),(533,'PILOT','Pilot',26),(534,'PRE','Prelude',26),(535,'RIDGELINE','Ridgeline',26),(536,'S2000','S2000',26),(537,'HONOTH','Other Honda Models',26),(538,'HUMMER','H1',27),(539,'H2','H2',27),(540,'H3','H3',27),(541,'H3T','H3T',27),(542,'AMGOTH','Other Hummer Models',27),(543,'ACCENT','Accent',28),(544,'AZERA','Azera',28),(545,'ELANTR','Elantra',28),(546,'HYUELANCPE','Elantra Coupe',28),(547,'ELANTOUR','Elantra Touring',28),(548,'ENTOURAGE','Entourage',28),(549,'EQUUS','Equus',28),(550,'HYUEXCEL','Excel',28),(551,'GENESIS','Genesis',28),(552,'GENESISCPE','Genesis Coupe',28),(553,'SANTAFE','Santa Fe',28),(554,'SCOUPE','Scoupe',28),(555,'SONATA','Sonata',28),(556,'TIBURO','Tiburon',28),(557,'TUCSON','Tucson',28),(558,'VELOSTER','Veloster',28),(559,'VERACRUZ','Veracruz',28),(560,'XG300','XG300',28),(561,'XG350','XG350',28),(562,'HYUOTH','Other Hyundai Models',28),(563,'EX_MODELS','EX Models (2)',29),(564,'EX35',' - EX35',29),(565,'EX37',' - EX37',29),(566,'FX_MODELS','FX Models (4)',29),(567,'FX35',' - FX35',29),(568,'FX37',' - FX37',29),(569,'FX45',' - FX45',29),(570,'FX50',' - FX50',29),(571,'G_MODELS','G Models (4)',29),(572,'G20',' - G20',29),(573,'G25',' - G25',29),(574,'G35',' - G35',29),(575,'G37',' - G37',29),(576,'I_MODELS','I Models (2)',29),(577,'I30',' - I30',29),(578,'I35',' - I35',29),(579,'J_MODELS','J Models (1)',29),(580,'J30',' - J30',29),(581,'JX_MODELS','JX Models (1)',29),(582,'JX35',' - JX35',29),(583,'M_MODELS','M Models (6)',29),(584,'M30',' - M30',29),(585,'M35',' - M35',29),(586,'M35HYBRID',' - M35h',29),(587,'M37',' - M37',29),(588,'M45',' - M45',29),(589,'M56',' - M56',29),(590,'Q_MODELS','Q Models (1)',29),(591,'Q45',' - Q45',29),(592,'QX_MODELS','QX Models (2)',29),(593,'QX4',' - QX4',29),(594,'QX56',' - QX56',29),(595,'INFOTH','Other Infiniti Models',29),(596,'AMIGO','Amigo',30),(597,'ASCENDER','Ascender',30),(598,'AXIOM','Axiom',30),(599,'HOMBRE','Hombre',30),(600,'I280','i-280',30),(601,'I290','i-290',30),(602,'I350','i-350',30),(603,'I370','i-370',30),(604,'ISUMARK','I-Mark',30),(605,'ISUIMP','Impulse',30),(606,'OASIS','Oasis',30),(607,'ISUPU','Pickup',30),(608,'RODEO','Rodeo',30),(609,'STYLUS','Stylus',30),(610,'TROOP','Trooper',30),(611,'TRP2','Trooper II',30),(612,'VEHICROSS','VehiCROSS',30),(613,'ISUOTH','Other Isuzu Models',30),(614,'STYPE','S-Type',31),(615,'XTYPE','X-Type',31),(616,'XF','XF',31),(617,'XJ_SERIES','XJ Series (10)',31),(618,'JAGXJ12',' - XJ12',31),(619,'JAGXJ6',' - XJ6',31),(620,'JAGXJR',' - XJR',31),(621,'JAGXJRS',' - XJR-S',31),(622,'JAGXJS',' - XJS',31),(623,'VANDEN',' - XJ Vanden Plas',31),(624,'XJ',' - XJ',31),(625,'XJ8',' - XJ8',31),(626,'XJ8L',' - XJ8 L',31),(627,'XJSPORT',' - XJ Sport',31),(628,'XK_SERIES','XK Series (3)',31),(629,'JAGXK8',' - XK8',31),(630,'XK',' - XK',31),(631,'XKR',' - XKR',31),(632,'JAGOTH','Other Jaguar Models',31),(633,'CHER','Cherokee',32),(634,'JEEPCJ','CJ',32),(635,'COMANC','Comanche',32),(636,'COMMANDER','Commander',32),(637,'COMPASS','Compass',32),(638,'JEEPGRAND','Grand Cherokee',32),(639,'GRWAG','Grand Wagoneer',32),(640,'LIBERTY','Liberty',32),(641,'PATRIOT','Patriot',32),(642,'JEEPPU','Pickup',32),(643,'SCRAMBLE','Scrambler',32),(644,'WAGONE','Wagoneer',32),(645,'WRANGLER','Wrangler',32),(646,'JEOTH','Other Jeep Models',32),(647,'AMANTI','Amanti',33),(648,'BORREGO','Borrego',33),(649,'FORTE','Forte',33),(650,'FORTEKOUP','Forte Koup',33),(651,'OPTIMA','Optima',33),(652,'RIO','Rio',33),(653,'RIO5','Rio5',33),(654,'RONDO','Rondo',33),(655,'SEDONA','Sedona',33),(656,'SEPHIA','Sephia',33),(657,'SORENTO','Sorento',33),(658,'SOUL','Soul',33),(659,'SPECTRA','Spectra',33),(660,'SPECTRA5','Spectra5',33),(661,'SPORTA','Sportage',33),(662,'KIAOTH','Other Kia Models',33),(663,'AVENT','Aventador',34),(664,'COUNT','Countach',34),(665,'DIABLO','Diablo',34),(666,'GALLARDO','Gallardo',34),(667,'JALPA','Jalpa',34),(668,'LM002','LM002',34),(669,'MURCIELAGO','Murcielago',34),(670,'UNAVAILLAM','Other Lamborghini Models',34),(671,'BETA','Beta',35),(672,'ZAGATO','Zagato',35),(673,'UNAVAILLAN','Other Lancia Models',35),(674,'DEFEND','Defender',36),(675,'DISCOV','Discovery',36),(676,'FRELNDR','Freelander',36),(677,'LR2','LR2',36),(678,'LR3','LR3',36),(679,'LR4','LR4',36),(680,'RANGE','Range Rover',36),(681,'EVOQUE','Range Rover Evoque',36),(682,'RANGESPORT','Range Rover Sport',36),(683,'ROVOTH','Other Land Rover Models',36),(684,'CT_MODELS','CT Models (1)',37),(685,'CT200H',' - CT 200h',37),(686,'ES_MODELS','ES Models (5)',37),(687,'ES250',' - ES 250',37),(688,'ES300',' - ES 300',37),(689,'ES300H',' - ES 300h',37),(690,'ES330',' - ES 330',37),(691,'ES350',' - ES 350',37),(692,'GS_MODELS','GS Models (6)',37),(693,'GS300',' - GS 300',37),(694,'GS350',' - GS 350',37),(695,'GS400',' - GS 400',37),(696,'GS430',' - GS 430',37),(697,'GS450H',' - GS 450h',37),(698,'GS460',' - GS 460',37),(699,'GX_MODELS','GX Models (2)',37),(700,'GX460',' - GX 460',37),(701,'GX470',' - GX 470',37),(702,'HS_MODELS','HS Models (1)',37),(703,'HS250H',' - HS 250h',37),(704,'IS_MODELS','IS Models (6)',37),(705,'IS250',' - IS 250',37),(706,'IS250C',' - IS 250C',37),(707,'IS300',' - IS 300',37),(708,'IS350',' - IS 350',37),(709,'IS350C',' - IS 350C',37),(710,'ISF',' - IS F',37),(711,'LEXLFA','LFA',37),(712,'LS_MODELS','LS Models (4)',37),(713,'LS400',' - LS 400',37),(714,'LS430',' - LS 430',37),(715,'LS460',' - LS 460',37),(716,'LS600H',' - LS 600h',37),(717,'LX_MODELS','LX Models (3)',37),(718,'LX450',' - LX 450',37),(719,'LX470',' - LX 470',37),(720,'LX570',' - LX 570',37),(721,'RX_MODELS','RX Models (5)',37),(722,'RX300',' - RX 300',37),(723,'RX330',' - RX 330',37),(724,'RX350',' - RX 350',37),(725,'RX400H',' - RX 400h',37),(726,'RX450H',' - RX 450h',37),(727,'SC_MODELS','SC Models (3)',37),(728,'SC300',' - SC 300',37),(729,'SC400',' - SC 400',37),(730,'SC430',' - SC 430',37),(731,'LEXOTH','Other Lexus Models',37),(732,'AVIATOR','Aviator',38),(733,'BLKWOOD','Blackwood',38),(734,'CONT','Continental',38),(735,'LSLINCOLN','LS',38),(736,'MARKLT','Mark LT',38),(737,'MARK6','Mark VI',38),(738,'MARK7','Mark VII',38),(739,'MARK8','Mark VIII',38),(740,'MKS','MKS',38),(741,'MKT','MKT',38),(742,'MKX','MKX',38),(743,'MKZ','MKZ',38),(744,'NAVIGA','Navigator',38),(745,'NAVIGAL','Navigator L',38),(746,'LINCTC','Town Car',38),(747,'ZEPHYR','Zephyr',38),(748,'LINOTH','Other Lincoln Models',38),(749,'ELAN','Elan',39),(750,'LOTELISE','Elise',39),(751,'ESPRIT','Esprit',39),(752,'EVORA','Evora',39),(753,'EXIGE','Exige',39),(754,'UNAVAILLOT','Other Lotus Models',39),(755,'430','430',40),(756,'BITRBO','Biturbo',40),(757,'COUPEMAS','Coupe',40),(758,'GRANSPORT','GranSport',40),(759,'GRANTURISM','GranTurismo',40),(760,'QP','Quattroporte',40),(761,'SPYDER','Spyder',40),(762,'UNAVAILMAS','Other Maserati Models',40),(763,'57MAYBACH','57',41),(764,'62MAYBACH','62',41),(765,'UNAVAILMAY','Other Maybach Models',41),(766,'MAZDA323','323',42),(767,'MAZDA626','626',42),(768,'929','929',42),(769,'B-SERIES','B-Series Pickup',42),(770,'CX-5','CX-5',42),(771,'CX-7','CX-7',42),(772,'CX-9','CX-9',42),(773,'GLC','GLC',42),(774,'MAZDA2','MAZDA2',42),(775,'MAZDA3','MAZDA3',42),(776,'MAZDA5','MAZDA5',42),(777,'MAZDA6','MAZDA6',42),(778,'MAZDASPD3','MAZDASPEED3',42),(779,'MAZDASPD6','MAZDASPEED6',42),(780,'MIATA','Miata MX5',42),(781,'MILL','Millenia',42),(782,'MPV','MPV',42),(783,'MX3','MX3',42),(784,'MX6','MX6',42),(785,'NAVAJO','Navajo',42),(786,'PROTE','Protege',42),(787,'PROTE5','Protege5',42),(788,'RX7','RX-7',42),(789,'RX8','RX-8',42),(790,'TRIBUTE','Tribute',42),(791,'MAZOTH','Other Mazda Models',42),(792,'MP4','MP4-12C',43),(793,'190_CLASS','190 Class (2)',44),(794,'190D',' - 190D',44),(795,'190E',' - 190E',44),(796,'240_CLASS','240 Class (1)',44),(797,'240D',' - 240D',44),(798,'300_CLASS_E_CLASS','300 Class / E Class (6)',44),(799,'300CD',' - 300CD',44),(800,'300CE',' - 300CE',44),(801,'300D',' - 300D',44),(802,'300E',' - 300E',44),(803,'300TD',' - 300TD',44),(804,'300TE',' - 300TE',44),(805,'C_CLASS','C Class (13)',44),(806,'C220',' - C220',44),(807,'C230',' - C230',44),(808,'C240',' - C240',44),(809,'C250',' - C250',44),(810,'C280',' - C280',44),(811,'C300',' - C300',44),(812,'C320',' - C320',44),(813,'C32AMG',' - C32 AMG',44),(814,'C350',' - C350',44),(815,'C36AMG',' - C36 AMG',44),(816,'C43AMG',' - C43 AMG',44),(817,'C55AMG',' - C55 AMG',44),(818,'C63AMG',' - C63 AMG',44),(819,'CL_CLASS','CL Class (6)',44),(820,'CL500',' - CL500',44),(821,'CL550',' - CL550',44),(822,'CL55AMG',' - CL55 AMG',44),(823,'CL600',' - CL600',44),(824,'CL63AMG',' - CL63 AMG',44),(825,'CL65AMG',' - CL65 AMG',44),(826,'CLK_CLASS','CLK Class (7)',44),(827,'CLK320',' - CLK320',44),(828,'CLK350',' - CLK350',44),(829,'CLK430',' - CLK430',44),(830,'CLK500',' - CLK500',44),(831,'CLK550',' - CLK550',44),(832,'CLK55AMG',' - CLK55 AMG',44),(833,'CLK63AMG',' - CLK63 AMG',44),(834,'CLS_CLASS','CLS Class (4)',44),(835,'CLS500',' - CLS500',44),(836,'CLS550',' - CLS550',44),(837,'CLS55AMG',' - CLS55 AMG',44),(838,'CLS63AMG',' - CLS63 AMG',44),(839,'E_CLASS','E Class (18)',44),(840,'260E',' - 260E',44),(841,'280CE',' - 280CE',44),(842,'280E',' - 280E',44),(843,'400E',' - 400E',44),(844,'500E',' - 500E',44),(845,'E300',' - E300',44),(846,'E320',' - E320',44),(847,'E320BLUE',' - E320 Bluetec',44),(848,'E320CDI',' - E320 CDI',44),(849,'E350',' - E350',44),(850,'E350BLUE',' - E350 Bluetec',44),(851,'E400',' - E400 Hybrid',44),(852,'E420',' - E420',44),(853,'E430',' - E430',44),(854,'E500',' - E500',44),(855,'E550',' - E550',44),(856,'E55AMG',' - E55 AMG',44),(857,'E63AMG',' - E63 AMG',44),(858,'G_CLASS','G Class (4)',44),(859,'G500',' - G500',44),(860,'G550',' - G550',44),(861,'G55AMG',' - G55 AMG',44),(862,'G63AMG',' - G63 AMG',44),(863,'GL_CLASS','GL Class (5)',44),(864,'GL320BLUE',' - GL320 Bluetec',44),(865,'GL320CDI',' - GL320 CDI',44),(866,'GL350BLUE',' - GL350 Bluetec',44),(867,'GL450',' - GL450',44),(868,'GL550',' - GL550',44),(869,'GLK_CLASS','GLK Class (1)',44),(870,'GLK350',' - GLK350',44),(871,'M_CLASS','M Class (11)',44),(872,'ML320',' - ML320',44),(873,'ML320BLUE',' - ML320 Bluetec',44),(874,'ML320CDI',' - ML320 CDI',44),(875,'ML350',' - ML350',44),(876,'ML350BLUE',' - ML350 Bluetec',44),(877,'ML430',' - ML430',44),(878,'ML450HY',' - ML450 Hybrid',44),(879,'ML500',' - ML500',44),(880,'ML550',' - ML550',44),(881,'ML55AMG',' - ML55 AMG',44),(882,'ML63AMG',' - ML63 AMG',44),(883,'R_CLASS','R Class (6)',44),(884,'R320BLUE',' - R320 Bluetec',44),(885,'R320CDI',' - R320 CDI',44),(886,'R350',' - R350',44),(887,'R350BLUE',' - R350 Bluetec',44),(888,'R500',' - R500',44),(889,'R63AMG',' - R63 AMG',44),(890,'S_CLASS','S Class (30)',44),(891,'300SD',' - 300SD',44),(892,'300SDL',' - 300SDL',44),(893,'300SE',' - 300SE',44),(894,'300SEL',' - 300SEL',44),(895,'350SD',' - 350SD',44),(896,'350SDL',' - 350SDL',44),(897,'380SE',' - 380SE',44),(898,'380SEC',' - 380SEC',44),(899,'380SEL',' - 380SEL',44),(900,'400SE',' - 400SE',44),(901,'400SEL',' - 400SEL',44),(902,'420SEL',' - 420SEL',44),(903,'500SEC',' - 500SEC',44),(904,'500SEL',' - 500SEL',44),(905,'560SEC',' - 560SEC',44),(906,'560SEL',' - 560SEL',44),(907,'600SEC',' - 600SEC',44),(908,'600SEL',' - 600SEL',44),(909,'S320',' - S320',44),(910,'S350',' - S350',44),(911,'S350BLUE',' - S350 Bluetec',44),(912,'S400HY',' - S400 Hybrid',44),(913,'S420',' - S420',44),(914,'S430',' - S430',44),(915,'S500',' - S500',44),(916,'S550',' - S550',44),(917,'S55AMG',' - S55 AMG',44),(918,'S600',' - S600',44),(919,'S63AMG',' - S63 AMG',44),(920,'S65AMG',' - S65 AMG',44),(921,'SL_CLASS','SL Class (13)',44),(922,'300SL',' - 300SL',44),(923,'380SL',' - 380SL',44),(924,'380SLC',' - 380SLC',44),(925,'500SL',' - 500SL',44),(926,'560SL',' - 560SL',44),(927,'600SL',' - 600SL',44),(928,'SL320',' - SL320',44),(929,'SL500',' - SL500',44),(930,'SL550',' - SL550',44),(931,'SL55AMG',' - SL55 AMG',44),(932,'SL600',' - SL600',44),(933,'SL63AMG',' - SL63 AMG',44),(934,'SL65AMG',' - SL65 AMG',44),(935,'SLK_CLASS','SLK Class (8)',44),(936,'SLK230',' - SLK230',44),(937,'SLK250',' - SLK250',44),(938,'SLK280',' - SLK280',44),(939,'SLK300',' - SLK300',44),(940,'SLK320',' - SLK320',44),(941,'SLK32AMG',' - SLK32 AMG',44),(942,'SLK350',' - SLK350',44),(943,'SLK55AMG',' - SLK55 AMG',44),(944,'SLR_CLASS','SLR Class (1)',44),(945,'SLR',' - SLR',44),(946,'SLS_CLASS','SLS Class (1)',44),(947,'SLSAMG',' - SLS AMG',44),(948,'SPRINTER_CLASS','Sprinter Class (1)',44),(949,'MBSPRINTER',' - Sprinter',44),(950,'MBOTH','Other Mercedes-Benz Models',44),(951,'CAPRI','Capri',45),(952,'COUGAR','Cougar',45),(953,'MERCGRAND','Grand Marquis',45),(954,'LYNX','Lynx',45),(955,'MARAUDER','Marauder',45),(956,'MARINER','Mariner',45),(957,'MARQ','Marquis',45),(958,'MILAN','Milan',45),(959,'MONTEGO','Montego',45),(960,'MONTEREY','Monterey',45),(961,'MOUNTA','Mountaineer',45),(962,'MYSTIQ','Mystique',45),(963,'SABLE','Sable',45),(964,'TOPAZ','Topaz',45),(965,'TRACER','Tracer',45),(966,'VILLA','Villager',45),(967,'MERCZEP','Zephyr',45),(968,'MEOTH','Other Mercury Models',45),(969,'SCORP','Scorpio',46),(970,'XR4TI','XR4Ti',46),(971,'MEROTH','Other Merkur Models',46),(972,'COOPRCLUB_MODELS','Cooper Clubman Models (2)',47),(973,'COOPERCLUB',' - Cooper Clubman',47),(974,'COOPRCLUBS',' - Cooper S Clubman',47),(975,'COOPCOUNTRY_MODELS','Cooper Countryman Models (2)',47),(976,'COUNTRYMAN',' - Cooper Countryman',47),(977,'COUNTRYMNS',' - Cooper S Countryman',47),(978,'COOPCOUP_MODELS','Cooper Coupe Models (2)',47),(979,'MINICOUPE',' - Cooper Coupe',47),(980,'MINISCOUPE',' - Cooper S Coupe',47),(981,'COOPER_MODELS','Cooper Models (2)',47),(982,'COOPER',' - Cooper',47),(983,'COOPERS',' - Cooper S',47),(984,'COOPRROAD_MODELS','Cooper Roadster Models (2)',47),(985,'COOPERROAD',' - Cooper Roadster',47),(986,'COOPERSRD',' - Cooper S Roadster',47),(987,'3000GT','3000GT',48),(988,'CORD','Cordia',48),(989,'DIAMAN','Diamante',48),(990,'ECLIP','Eclipse',48),(991,'ENDEAVOR','Endeavor',48),(992,'MITEXP','Expo',48),(993,'GALANT','Galant',48),(994,'MITI','i',48),(995,'LANCERMITS','Lancer',48),(996,'LANCEREVO','Lancer Evolution',48),(997,'MITPU','Mighty Max',48),(998,'MIRAGE','Mirage',48),(999,'MONT','Montero',48),(1000,'MONTSPORT','Montero Sport',48),(1001,'OUTLANDER','Outlander',48),(1002,'OUTLANDSPT','Outlander Sport',48),(1003,'PRECIS','Precis',48),(1004,'RAIDERMITS','Raider',48),(1005,'SIGMA','Sigma',48),(1006,'MITSTAR','Starion',48),(1007,'TRED','Tredia',48),(1008,'MITVAN','Van',48),(1009,'MITOTH','Other Mitsubishi Models',48),(1010,'NIS200SX','200SX',49),(1011,'240SX','240SX',49),(1012,'300ZXTURBO','300ZX',49),(1013,'350Z','350Z',49),(1014,'370Z','370Z',49),(1015,'ALTIMA','Altima',49),(1016,'PATHARMADA','Armada',49),(1017,'AXXESS','Axxess',49),(1018,'CUBE','Cube',49),(1019,'FRONTI','Frontier',49),(1020,'GT-R','GT-R',49),(1021,'JUKE','Juke',49),(1022,'LEAF','Leaf',49),(1023,'MAX','Maxima',49),(1024,'MURANO','Murano',49),(1025,'MURANOCROS','Murano CrossCabriolet',49),(1026,'NV','NV',49),(1027,'NX','NX',49),(1028,'PATH','Pathfinder',49),(1029,'NISPU','Pickup',49),(1030,'PULSAR','Pulsar',49),(1031,'QUEST','Quest',49),(1032,'ROGUE','Rogue',49),(1033,'SENTRA','Sentra',49),(1034,'STANZA','Stanza',49),(1035,'TITAN','Titan',49),(1036,'NISVAN','Van',49),(1037,'VERSA','Versa',49),(1038,'XTERRA','Xterra',49),(1039,'NISSOTH','Other Nissan Models',49),(1040,'88','88',50),(1041,'ACHIEV','Achieva',50),(1042,'ALERO','Alero',50),(1043,'AURORA','Aurora',50),(1044,'BRAV','Bravada',50),(1045,'CUCR','Custom Cruiser',50),(1046,'OLDCUS','Cutlass',50),(1047,'OLDCALAIS','Cutlass Calais',50),(1048,'CIERA','Cutlass Ciera',50),(1049,'CSUPR','Cutlass Supreme',50),(1050,'OLDSFIR','Firenza',50),(1051,'INTRIG','Intrigue',50),(1052,'98','Ninety-Eight',50),(1053,'OMEG','Omega',50),(1054,'REGEN','Regency',50),(1055,'SILHO','Silhouette',50),(1056,'TORO','Toronado',50),(1057,'OLDOTH','Other Oldsmobile Models',50),(1058,'405','405',51),(1059,'504','504',51),(1060,'505','505',51),(1061,'604','604',51),(1062,'UNAVAILPEU','Other Peugeot Models',51),(1063,'ACC','Acclaim',52),(1064,'ARROW','Arrow',52),(1065,'BREEZE','Breeze',52),(1066,'CARAVE','Caravelle',52),(1067,'CHAMP','Champ',52),(1068,'COLT','Colt',52),(1069,'PLYMCONQ','Conquest',52),(1070,'GRANFURY','Gran Fury',52),(1071,'PLYMGRANV','Grand Voyager',52),(1072,'HORI','Horizon',52),(1073,'LASER','Laser',52),(1074,'NEON','Neon',52),(1075,'PROWLE','Prowler',52),(1076,'RELI','Reliant',52),(1077,'SAPPOROPLY','Sapporo',52),(1078,'SCAMP','Scamp',52),(1079,'SUNDAN','Sundance',52),(1080,'TRAILDUST','Trailduster',52),(1081,'VOYA','Voyager',52),(1082,'PLYOTH','Other Plymouth Models',52),(1083,'T-1000','1000',53),(1084,'6000','6000',53),(1085,'AZTEK','Aztek',53),(1086,'BON','Bonneville',53),(1087,'CATALINA','Catalina',53),(1088,'FIERO','Fiero',53),(1089,'FBIRD','Firebird',53),(1090,'G3','G3',53),(1091,'G5','G5',53),(1092,'G6','G6',53),(1093,'G8','G8',53),(1094,'GRNDAM','Grand Am',53),(1095,'GP','Grand Prix',53),(1096,'GTO','GTO',53),(1097,'J2000','J2000',53),(1098,'LEMANS','Le Mans',53),(1099,'MONTANA','Montana',53),(1100,'PARISI','Parisienne',53),(1101,'PHOENIX','Phoenix',53),(1102,'SAFARIPONT','Safari',53),(1103,'SOLSTICE','Solstice',53),(1104,'SUNBIR','Sunbird',53),(1105,'SUNFIR','Sunfire',53),(1106,'TORRENT','Torrent',53),(1107,'TS','Trans Sport',53),(1108,'VIBE','Vibe',53),(1109,'PONOTH','Other Pontiac Models',53),(1110,'911','911',54),(1111,'924','924',54),(1112,'928','928',54),(1113,'944','944',54),(1114,'968','968',54),(1115,'BOXSTE','Boxster',54),(1116,'CARRERAGT','Carrera GT',54),(1117,'CAYENNE','Cayenne',54),(1118,'CAYMAN','Cayman',54),(1119,'PANAMERA','Panamera',54),(1120,'POROTH','Other Porsche Models',54),(1121,'RAM1504WD','1500',55),(1122,'RAM25002WD','2500',55),(1123,'RAM3502WD','3500',55),(1124,'RAM4500','4500',55),(1125,'18I','18i',56),(1126,'FU','Fuego',56),(1127,'LECAR','Le Car',56),(1128,'R18','R18',56),(1129,'RENSPORT','Sportwagon',56),(1130,'UNAVAILREN','Other Renault Models',56),(1131,'CAMAR','Camargue',57),(1132,'CORN','Corniche',57),(1133,'GHOST','Ghost',57),(1134,'PARKWARD','Park Ward',57),(1135,'PHANT','Phantom',57),(1136,'DAWN','Silver Dawn',57),(1137,'SILSERAPH','Silver Seraph',57),(1138,'RRSPIR','Silver Spirit',57),(1139,'SPUR','Silver Spur',57),(1140,'UNAVAILRR','Other Rolls-Royce Models',57),(1141,'9-2X','9-2X',58),(1142,'9-3','9-3',58),(1143,'9-4X','9-4X',58),(1144,'9-5','9-5',58),(1145,'97X','9-7X',58),(1146,'900','900',58),(1147,'9000','9000',58),(1148,'SAOTH','Other Saab Models',58),(1149,'ASTRA','Astra',59),(1150,'AURA','Aura',59),(1151,'ION','ION',59),(1152,'L_SERIES','L Series (3)',59),(1153,'L100',' - L100',59),(1154,'L200',' - L200',59),(1155,'L300',' - L300',59),(1156,'LSSATURN','LS',59),(1157,'LW_SERIES','LW Series (4)',59),(1158,'LW',' - LW1',59),(1159,'LW2',' - LW2',59),(1160,'LW200',' - LW200',59),(1161,'LW300',' - LW300',59),(1162,'OUTLOOK','Outlook',59),(1163,'RELAY','Relay',59),(1164,'SC_SERIES','SC Series (2)',59),(1165,'SC1',' - SC1',59),(1166,'SC2',' - SC2',59),(1167,'SKY','Sky',59),(1168,'SL_SERIES','SL Series (3)',59),(1169,'SL',' - SL',59),(1170,'SL1',' - SL1',59),(1171,'SL2',' - SL2',59),(1172,'SW_SERIES','SW Series (2)',59),(1173,'SW1',' - SW1',59),(1174,'SW2',' - SW2',59),(1175,'VUE','Vue',59),(1176,'SATOTH','Other Saturn Models',59),(1177,'SCIFRS','FR-S',60),(1178,'IQ','iQ',60),(1179,'TC','tC',60),(1180,'XA','xA',60),(1181,'XB','xB',60),(1182,'XD','xD',60),(1183,'FORTWO','fortwo',61),(1184,'SMOTH','Other smart Models',61),(1185,'SRTVIPER','Viper',62),(1186,'825','825',63),(1187,'827','827',63),(1188,'UNAVAILSTE','Other Sterling Models',63),(1189,'BAJA','Baja',64),(1190,'BRAT','Brat',64),(1191,'SUBBRZ','BRZ',64),(1192,'FOREST','Forester',64),(1193,'IMPREZ','Impreza',64),(1194,'IMPWRX','Impreza WRX',64),(1195,'JUSTY','Justy',64),(1196,'SUBL','L Series',64),(1197,'LEGACY','Legacy',64),(1198,'LOYALE','Loyale',64),(1199,'SUBOUTBK','Outback',64),(1200,'SVX','SVX',64),(1201,'B9TRIBECA','Tribeca',64),(1202,'XT','XT',64),(1203,'XVCRSSTREK','XV Crosstrek',64),(1204,'SUBOTH','Other Subaru Models',64),(1205,'AERIO','Aerio',65),(1206,'EQUATOR','Equator',65),(1207,'ESTEEM','Esteem',65),(1208,'FORENZA','Forenza',65),(1209,'GRANDV','Grand Vitara',65),(1210,'KIZASHI','Kizashi',65),(1211,'RENO','Reno',65),(1212,'SAMUR','Samurai',65),(1213,'SIDE','Sidekick',65),(1214,'SWIFT','Swift',65),(1215,'SX4','SX4',65),(1216,'VERONA','Verona',65),(1217,'VITARA','Vitara',65),(1218,'X90','X-90',65),(1219,'XL7','XL7',65),(1220,'SUZOTH','Other Suzuki Models',65),(1221,'ROADSTER','Roadster',66),(1222,'4RUN','4Runner',67),(1223,'AVALON','Avalon',67),(1224,'CAMRY','Camry',67),(1225,'CELICA','Celica',67),(1226,'COROL','Corolla',67),(1227,'CORONA','Corona',67),(1228,'CRESS','Cressida',67),(1229,'ECHO','Echo',67),(1230,'FJCRUIS','FJ Cruiser',67),(1231,'HIGHLANDER','Highlander',67),(1232,'LC','Land Cruiser',67),(1233,'MATRIX','Matrix',67),(1234,'MR2','MR2',67),(1235,'MR2SPYDR','MR2 Spyder',67),(1236,'PASEO','Paseo',67),(1237,'PICKUP','Pickup',67),(1238,'PREVIA','Previa',67),(1239,'PRIUS','Prius',67),(1240,'PRIUSC','Prius C',67),(1241,'PRIUSV','Prius V',67),(1242,'RAV4','RAV4',67),(1243,'SEQUOIA','Sequoia',67),(1244,'SIENNA','Sienna',67),(1245,'SOLARA','Solara',67),(1246,'STARLET','Starlet',67),(1247,'SUPRA','Supra',67),(1248,'T100','T100',67),(1249,'TACOMA','Tacoma',67),(1250,'TERCEL','Tercel',67),(1251,'TUNDRA','Tundra',67),(1252,'TOYVAN','Van',67),(1253,'VENZA','Venza',67),(1254,'YARIS','Yaris',67),(1255,'TOYOTH','Other Toyota Models',67),(1256,'TR7','TR7',68),(1257,'TR8','TR8',68),(1258,'TRIOTH','Other Triumph Models',68),(1259,'BEETLE','Beetle',69),(1260,'VOLKSCAB','Cabrio',69),(1261,'CAB','Cabriolet',69),(1262,'CC','CC',69),(1263,'CORR','Corrado',69),(1264,'DASHER','Dasher',69),(1265,'EOS','Eos',69),(1266,'EUROVAN','Eurovan',69),(1267,'VOLKSFOX','Fox',69),(1268,'GLI','GLI',69),(1269,'GOLFR','Golf R',69),(1270,'GTI','GTI',69),(1271,'GOLFANDRABBITMODELS','Golf and Rabbit Models (2)',69),(1272,'GOLF',' - Golf',69),(1273,'RABBIT',' - Rabbit',69),(1274,'JET','Jetta',69),(1275,'PASS','Passat',69),(1276,'PHAETON','Phaeton',69),(1277,'RABBITPU','Pickup',69),(1278,'QUAN','Quantum',69),(1279,'R32','R32',69),(1280,'ROUTAN','Routan',69),(1281,'SCIR','Scirocco',69),(1282,'TIGUAN','Tiguan',69),(1283,'TOUAREG','Touareg',69),(1284,'VANAG','Vanagon',69),(1285,'VWOTH','Other Volkswagen Models',69),(1286,'240','240',70),(1287,'260','260',70),(1288,'740','740',70),(1289,'760','760',70),(1290,'780','780',70),(1291,'850','850',70),(1292,'940','940',70),(1293,'960','960',70),(1294,'C30','C30',70),(1295,'C70','C70',70),(1296,'S40','S40',70),(1297,'S60','S60',70),(1298,'S70','S70',70),(1299,'S80','S80',70),(1300,'S90','S90',70),(1301,'V40','V40',70),(1302,'V50','V50',70),(1303,'V70','V70',70),(1304,'V90','V90',70),(1305,'XC60','XC60',70),(1306,'XC','XC70',70),(1307,'XC90','XC90',70),(1308,'VOLOTH','Other Volvo Models',70),(1309,'GV','GV',71),(1310,'GVC','GVC',71),(1311,'GVL','GVL',71),(1312,'GVS','GVS',71),(1313,'GVX','GVX',71),(1314,'YUOTH','Other Yugo Models',71);
/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pros`
--

DROP TABLE IF EXISTS `pros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pros` (
  `id_pros` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashedPassword` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` int NOT NULL,
  `city` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `siret` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_pros`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pros`
--

LOCK TABLES `pros` WRITE;
/*!40000 ALTER TABLE `pros` DISABLE KEYS */;
INSERT INTO `pros` VALUES (1,'Chez Filou On Répare Tout','chezfilou@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$I5k2u/Fad5z8DAwJXJjH2A$dbjQdXzBnADrO+A/jdKG9zyXrA1x/zeJfLd1pZouEGI','78 avenue du Lupin',64200,'Biarritz','15654679976548','06-90-76-57-44'),(2,'La méca','lameca@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$yVnIPWxq5+gi+zoJIGS44A$yVLdbKZTPQC/WM72emZ60QOlIAsvL6W1uLI9evX2WLE','78 rue du Caredent',64100,'Bayonne','15654679976547','06-90-76-57-49'),(3,'Auto Répare 24','autorepare24@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$hWmzSGtwF+BfQ/bHAPO2Zw$iZpGcyLsWbdH2naV4KrC2EiiMXnXAa+aODa/+gD1H54','2 boulevard de Nogaro',64000,'Pau','15658679976548','06-90-76-51-44');
/*!40000 ALTER TABLE `pros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_book`
--

DROP TABLE IF EXISTS `service_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_book` (
  `id_service_book` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `service` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `observations` text COLLATE utf8mb4_unicode_ci,
  `kilometrage` int NOT NULL,
  `url_invoice` mediumtext COLLATE utf8mb4_unicode_ci,
  `id_pros` int NOT NULL,
  `immat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_service_book`),
  KEY `Service_Book_id_pros_fkey` (`id_pros`),
  KEY `Service_Book_immat_fkey` (`immat`),
  CONSTRAINT `Service_Book_id_pros_fkey` FOREIGN KEY (`id_pros`) REFERENCES `pros` (`id_pros`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Service_Book_immat_fkey` FOREIGN KEY (`immat`) REFERENCES `vehicules` (`immat`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_book`
--

LOCK TABLES `service_book` WRITE;
/*!40000 ALTER TABLE `service_book` DISABLE KEYS */;
INSERT INTO `service_book` VALUES (1,'2020-11-15','Révision des 15 000','vidange, remplacement du filtre à huile, contrôle visuel des plaquettes de frein et des disques, vérification des niveaux, contrôle des pneumatiques',15450,'',1,'BG-897-ZU'),(2,'2021-05-11','Révision des 30 000','remplacement du filtre à habitacle, changement du filtre à pollen, contrôle de l’huile de la boîte de vitesse, purge du liquide de frein et du liquide de refroidissement, remplacement des quatre pneus',31180,'',1,'BG-897-ZU'),(3,'2021-05-11','Révision des 30 000','remplacement du filtre à habitacle, changement du filtre à pollen, contrôle de l’huile de la boîte de vitesse, purge du liquide de frein et du liquide de refroidissement, remplacement des quatre pneus',31180,'',3,'BT-628-LK'),(4,'2020-11-15','Révision des 15 000','vidange, remplacement du filtre à huile, contrôle visuel des plaquettes de frein et des disques, vérification des niveaux, contrôle des pneumatiques',15450,'',3,'BT-628-LK'),(5,'2021-05-11','Révision des 30 000','remplacement du filtre à habitacle, changement du filtre à pollen, contrôle de l’huile de la boîte de vitesse, purge du liquide de frein et du liquide de refroidissement, remplacement des quatre pneus',31180,'',2,'CD-276-HU'),(6,'2020-11-15','Révision des 15 000','vidange, remplacement du filtre à huile, contrôle visuel des plaquettes de frein et des disques, vérification des niveaux, contrôle des pneumatiques',15450,'',3,'CD-276-HU'),(7,'2021-05-11','Révision des 30 000','remplacement du filtre à habitacle, changement du filtre à pollen, contrôle de l’huile de la boîte de vitesse, purge du liquide de frein et du liquide de refroidissement, remplacement des quatre pneus',31180,'',1,'ER-825-LM'),(8,'2020-11-15','Révision des 15 000','vidange, remplacement du filtre à huile, contrôle visuel des plaquettes de frein et des disques, vérification des niveaux, contrôle des pneumatiques',15450,'',3,'ER-825-LM');
/*!40000 ALTER TABLE `service_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `id_type` int NOT NULL AUTO_INCREMENT,
  `name_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_type`),
  UNIQUE KEY `name_type_UNIQUE` (`name_type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (2,'Moto'),(1,'Voiture');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashedPassword` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` int NOT NULL,
  `city` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Bastien','Traille','bastien@moncarnet.fr','$argon2id$v=19$m=65536,t=5,p=1$XUV79Ssci53rcsNlWKlAhg$ypEGBkTwAKZ6E8UnUKIGXBmyiOmFsVMN44Ygw1AdSr0','7 place des Docteurs Gentilhe','06-78-76-78-76',64600,'Anglet',1),(2,'Jimmy','Ganci','jimmy@moncarnet.fr','$argon2id$v=19$m=65536,t=5,p=1$YzhbILhw01UGTH+Aicq85A$PVFZQ00Y50Ip3kH/WzM6ulwYc6M9a9e+FeG9ZnGe4DE','76 avenue du Maréchal Foch','06-45-05-35-28',40130,'Capbreton',1),(3,'Gregory','Laumond','greg@moncarnet.fr','$argon2id$v=19$m=65536,t=5,p=1$4/FYasqTb42cSgJPI9u0+g$128E0LNjtyWtRZU7U0JrjXCuTdIFuocU43d/9dMP3PU','63 Etxamendiko Bidea','06-05-38-95-21',64240,'Ayherre',1),(4,'Aurélien','Brethes','aurelien@moncarnet.fr','$argon2id$v=19$m=65536,t=5,p=1$ksCFkCDC0kF4TcQAPYI5KA$JOOu7aHKOxIV0Oj0Uyoz/GptfzmNVIxU6H2C2pL5X1k','224 chemin de la Montagne','06-88-46-25-84',40440,'Ondres',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicules`
--

DROP TABLE IF EXISTS `vehicules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicules` (
  `immat` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registration_date` date NOT NULL,
  `url_vehiculeRegistration` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_modelId` int NOT NULL,
  `id_typeId` int NOT NULL,
  `id_userId` int NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `validate` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`immat`),
  KEY `Vehicules_id_modelId_fkey` (`id_modelId`),
  KEY `Vehicules_id_typeId_fkey` (`id_typeId`),
  KEY `Vehicules_id_userId_fkey` (`id_userId`),
  CONSTRAINT `Vehicules_id_modelId_fkey` FOREIGN KEY (`id_modelId`) REFERENCES `models` (`id_model`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Vehicules_id_typeId_fkey` FOREIGN KEY (`id_typeId`) REFERENCES `types` (`id_type`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Vehicules_id_userId_fkey` FOREIGN KEY (`id_userId`) REFERENCES `users` (`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicules`
--

LOCK TABLES `vehicules` WRITE;
/*!40000 ALTER TABLE `vehicules` DISABLE KEYS */;
INSERT INTO `vehicules` VALUES ('BG-897-ZU','2020-02-14','https://minio-s3.basile.vernouillet.dev/moncarnet-dev/user/1/BG-897-ZU/greenCard/nouvelle-carte-grise-specimen.jpg',45,1,1,1,0),('BT-628-LK','2018-10-11','https://minio-s3.basile.vernouillet.dev/moncarnet-dev/user/2/BT-628-LK/greenCard/nouvelle-carte-grise-specimen.jpg',419,1,2,1,0),('CD-276-HU','2020-05-19','https://minio-s3.basile.vernouillet.dev/moncarnet-dev/user/4/CD-276-HU/greenCard/nouvelle-carte-grise-specimen.jpg',1116,1,4,1,0),('DR-476-LM','2021-04-10','https://minio-s3.basile.vernouillet.dev/moncarnet-dev/user/2/DR-476-LM/greenCard/nouvelle-carte-grise-specimen.jpg',663,1,2,1,0),('ER-825-LM','2019-09-05','https://minio-s3.basile.vernouillet.dev/moncarnet-dev/user/3/ER-825-LM/greenCard/nouvelle-carte-grise-specimen.jpg',88,1,3,1,0),('KJ-265-FR','2019-06-12','https://minio-s3.basile.vernouillet.dev/moncarnet-dev/user/3/KJ-265-FR/greenCard/nouvelle-carte-grise-specimen.jpg',145,1,3,1,0),('QD-462-FG','2021-07-21','https://minio-s3.basile.vernouillet.dev/moncarnet-dev/user/1/QD-462-FG/greenCard/nouvelle-carte-grise-specimen.jpg',244,1,1,1,0),('SQ-546-HY','1982-10-13','https://minio-s3.basile.vernouillet.dev/moncarnet-dev/user/4/SQ-546-HY/greenCard/nouvelle-carte-grise-specimen.jpg',1126,1,4,1,0);
/*!40000 ALTER TABLE `vehicules` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-28 11:31:18
