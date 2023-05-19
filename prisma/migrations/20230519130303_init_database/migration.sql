-- CreateTable
CREATE TABLE `user` (
    `user_id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `passwd` VARCHAR(60) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
