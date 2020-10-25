CREATE TABLE `blog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userid` VARCHAR(45) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(512) NOT NULL,
  `address` VARCHAR(250) NOT NULL,
  `inserted` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`));
