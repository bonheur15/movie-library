-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`imdb_id` varchar(20) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content_type` enum('movie','series') NOT NULL,
	`year` int,
	`plot` text,
	`tmdb_poster_path` text,
	`tmdb_backdrop_path` text,
	`imdb_rating` decimal(3,1),
	`release_date` date,
	`runtime` int,
	`status` varchar(50),
	CONSTRAINT `content_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `content_genres` (
	`content_id` int NOT NULL,
	`genre_id` int NOT NULL,
	CONSTRAINT `content_genres_content_id_genre_id` PRIMARY KEY(`content_id`,`genre_id`)
);
--> statement-breakpoint
CREATE TABLE `content_keywords` (
	`content_id` int NOT NULL,
	`keyword_id` int NOT NULL,
	CONSTRAINT `content_keywords_content_id_keyword_id` PRIMARY KEY(`content_id`,`keyword_id`)
);
--> statement-breakpoint
CREATE TABLE `content_people` (
	`content_id` int NOT NULL,
	`person_id` int NOT NULL,
	`job` varchar(100) NOT NULL,
	CONSTRAINT `content_people_content_id_person_id_job` PRIMARY KEY(`content_id`,`person_id`,`job`)
);
--> statement-breakpoint
CREATE TABLE `content_production_companies` (
	`content_id` int NOT NULL,
	`company_id` int NOT NULL,
	CONSTRAINT `content_production_companies_content_id_company_id` PRIMARY KEY(`content_id`,`company_id`)
);
--> statement-breakpoint
CREATE TABLE `episodes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`season_id` int NOT NULL,
	`episode_number` int NOT NULL,
	`title` varchar(255),
	`plot` text,
	`release_date` date,
	`runtime` int,
	CONSTRAINT `episodes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `genres` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	CONSTRAINT `genres_id` PRIMARY KEY(`id`),
	CONSTRAINT `name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `keywords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `keywords_id` PRIMARY KEY(`id`),
	CONSTRAINT `name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `people` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`department` varchar(100),
	CONSTRAINT `people_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `production_companies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`origin_country` varchar(50),
	CONSTRAINT `production_companies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `seasons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`content_id` int NOT NULL,
	`season_number` int NOT NULL,
	`title` varchar(255),
	`release_date` date,
	CONSTRAINT `seasons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `content_genres` ADD CONSTRAINT `content_genres_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content_genres` ADD CONSTRAINT `content_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content_keywords` ADD CONSTRAINT `content_keywords_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content_keywords` ADD CONSTRAINT `content_keywords_ibfk_2` FOREIGN KEY (`keyword_id`) REFERENCES `keywords`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content_people` ADD CONSTRAINT `content_people_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content_people` ADD CONSTRAINT `content_people_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content_production_companies` ADD CONSTRAINT `content_production_companies_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content_production_companies` ADD CONSTRAINT `content_production_companies_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `production_companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `episodes` ADD CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`season_id`) REFERENCES `seasons`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `seasons` ADD CONSTRAINT `seasons_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `genre_id` ON `content_genres` (`genre_id`);--> statement-breakpoint
CREATE INDEX `keyword_id` ON `content_keywords` (`keyword_id`);--> statement-breakpoint
CREATE INDEX `person_id` ON `content_people` (`person_id`);--> statement-breakpoint
CREATE INDEX `company_id` ON `content_production_companies` (`company_id`);--> statement-breakpoint
CREATE INDEX `season_id` ON `episodes` (`season_id`);--> statement-breakpoint
CREATE INDEX `content_id` ON `seasons` (`content_id`);
*/