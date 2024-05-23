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
