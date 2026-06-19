CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL UNIQUE,
	`monthly_budget` real NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` real NOT NULL,
	`type` text NOT NULL,
	`date` text NOT NULL,
	`category_id` integer NOT NULL,
	`description` text DEFAULT '',
	FOREIGN KEY(`category_id`) REFERENCES `categories`(`id`)
);
--> statement-breakpoint
CREATE INDEX `transactions_category_id_index` ON `transactions` (`category_id`);
