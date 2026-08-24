CREATE TABLE `admin_activity_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`admin_user_id` text NOT NULL,
	`action` text NOT NULL,
	`target` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `alert_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`rule_id` integer,
	`bid_id` integer,
	`event_type` text NOT NULL,
	`status` text NOT NULL,
	`dedupe_key` text NOT NULL,
	`sent_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `alert_logs_dedupe_uidx` ON `alert_logs` (`dedupe_key`);--> statement-breakpoint
CREATE TABLE `alert_rules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`filters` text NOT NULL,
	`channels` text NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `bids` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`source` text DEFAULT 'G2B' NOT NULL,
	`bid_number` text NOT NULL,
	`bid_order` text DEFAULT '000' NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`status` text NOT NULL,
	`ordering_agency` text,
	`demanding_agency` text,
	`region` text,
	`estimated_price` integer,
	`base_price` integer,
	`announcement_at` integer,
	`bid_start_at` integer,
	`bid_deadline_at` integer,
	`opening_at` integer,
	`contract_method` text,
	`bid_method` text,
	`original_url` text,
	`raw_data` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bids_number_order_uidx` ON `bids` (`bid_number`,`bid_order`);--> statement-breakpoint
CREATE INDEX `bids_title_idx` ON `bids` (`title`);--> statement-breakpoint
CREATE INDEX `bids_category_idx` ON `bids` (`category`);--> statement-breakpoint
CREATE INDEX `bids_region_idx` ON `bids` (`region`);--> statement-breakpoint
CREATE INDEX `bids_deadline_idx` ON `bids` (`bid_deadline_at`);--> statement-breakpoint
CREATE TABLE `companies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`business_number` text,
	`region` text,
	`licenses` text,
	`preferences` text
);
--> statement-breakpoint
CREATE INDEX `companies_user_idx` ON `companies` (`user_id`);--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`bid_id` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `favorites_user_bid_uidx` ON `favorites` (`user_id`,`bid_id`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `saved_searches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`filters` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `api_sync_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`service` text NOT NULL,
	`status` text NOT NULL,
	`item_count` integer DEFAULT 0 NOT NULL,
	`message` text,
	`started_at` integer NOT NULL,
	`finished_at` integer
);
--> statement-breakpoint
CREATE TABLE `user_memos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`bid_id` integer NOT NULL,
	`content` text NOT NULL,
	`updated_at` integer NOT NULL
);
