ALTER TABLE `blog`.`posts` 
ADD COLUMN `inserted` DATETIME NOT NULL AFTER `author`;

ALTER TABLE `blog`.`posts` 
ADD COLUMN `updated` DATETIME NULL AFTER `inserted`;

ALTER TABLE `blog`.`posts`
ADD COLUMN `upload` VARCHAR(120) NULL AFTER `author`;
