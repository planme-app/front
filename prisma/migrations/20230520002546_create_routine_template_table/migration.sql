-- CreateTable
CREATE TABLE `routine_template` (
    `routine_template_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `logo_url` VARCHAR(191) NOT NULL,
    `type` ENUM('time', 'count', 'bool') NOT NULL,

    PRIMARY KEY (`routine_template_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
