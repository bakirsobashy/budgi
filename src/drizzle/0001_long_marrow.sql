CREATE TABLE `category_budgets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year_month` text NOT NULL,
	`category_id` integer NOT NULL,
	`amount` integer NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_budgets_year_month_category_id_unique` ON `category_budgets` (`year_month`,`category_id`);--> statement-breakpoint
CREATE TABLE `monthly_budgets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year_month` text NOT NULL,
	`amount` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `monthly_budgets_year_month_unique` ON `monthly_budgets` (`year_month`);