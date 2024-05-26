DROP INDEX IF EXISTS `apptype_apptype_unique`;--> statement-breakpoint
ALTER TABLE `apptype` ADD `apptype_key` text;--> statement-breakpoint
ALTER TABLE `user` ADD `apptype` text;--> statement-breakpoint
CREATE UNIQUE INDEX `apptype_apptype_key_unique` ON `apptype` (`apptype_key`);--> statement-breakpoint
ALTER TABLE `apptype` DROP COLUMN `apptype`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `app_type`;