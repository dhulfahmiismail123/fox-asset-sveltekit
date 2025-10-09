ALTER TABLE `category_Asset` RENAME TO `asset_categories`;--> statement-breakpoint
ALTER TABLE `session` RENAME TO `sessions`;--> statement-breakpoint
ALTER TABLE `user` RENAME TO `users`;--> statement-breakpoint
DROP INDEX `category_Asset_name_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `asset_categories_name_unique` ON `asset_categories` (`name`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_sessions`("id", "user_id", "expires_at") SELECT "id", "user_id", "expires_at" FROM `sessions`;--> statement-breakpoint
DROP TABLE `sessions`;--> statement-breakpoint
ALTER TABLE `__new_sessions` RENAME TO `sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX `user_username_unique`;--> statement-breakpoint
DROP INDEX `user_email_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);