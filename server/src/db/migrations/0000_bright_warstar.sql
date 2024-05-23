CREATE TABLE `admin` (
	`id` integer PRIMARY KEY NOT NULL,
	`root` integer DEFAULT 0,
	`username` text,
	`password` text
);
--> statement-breakpoint
CREATE TABLE `admin_to_role` (
	`admin_id` integer NOT NULL,
	`role_id` integer NOT NULL,
	FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`desc` text
);
--> statement-breakpoint
CREATE TABLE `system_menu` (
	`id` integer PRIMARY KEY NOT NULL,
	`pid` integer DEFAULT 0,
	`type` integer DEFAULT 0,
	`name` text,
	`icon` text,
	`sort` integer,
	`perms` text,
	`paths` text,
	`is_show` integer,
	`is_disable` integer,
	`create_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text,
	`username` text,
	`password` text,
	`app_type` text,
	`head_img` text,
	`oauth_type` integer DEFAULT 0,
	`openid` text,
	`country` text,
	`city` text,
	`latitude` text,
	`longitude` text,
	`create_at` text DEFAULT (CURRENT_TIMESTAMP)
);
