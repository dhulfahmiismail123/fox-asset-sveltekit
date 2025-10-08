CREATE TABLE `category_Asset` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer,
	`update_At` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_Asset_name_unique` ON `category_Asset` (`name`);