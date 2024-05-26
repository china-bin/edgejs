CREATE TABLE `apptype` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`apptype` text,
	`create_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `apptype_apptype_unique` ON `apptype` (`apptype`);