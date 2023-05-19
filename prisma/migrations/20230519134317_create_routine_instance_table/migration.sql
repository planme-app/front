-- CreateTable
CREATE TABLE `routine_instance` (
    `routine_instance_id` VARCHAR(191) NOT NULL,
    `routine_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`routine_instance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `count_routine_instance` (
    `count_routine_instance_id` VARCHAR(191) NOT NULL,
    `routine_instance_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`count_routine_instance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_routine_instance` (
    `time_routine_instance_id` VARCHAR(191) NOT NULL,
    `routine_instance_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`time_routine_instance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bool_routine_instance` (
    `bool_routine_instance_id` VARCHAR(191) NOT NULL,
    `routine_instance_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`bool_routine_instance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `routine_instance` ADD CONSTRAINT `routine_instance_routine_id_fkey` FOREIGN KEY (`routine_id`) REFERENCES `routine`(`routine_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `count_routine_instance` ADD CONSTRAINT `count_routine_instance_routine_instance_id_fkey` FOREIGN KEY (`routine_instance_id`) REFERENCES `routine_instance`(`routine_instance_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_routine_instance` ADD CONSTRAINT `time_routine_instance_routine_instance_id_fkey` FOREIGN KEY (`routine_instance_id`) REFERENCES `routine_instance`(`routine_instance_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bool_routine_instance` ADD CONSTRAINT `bool_routine_instance_routine_instance_id_fkey` FOREIGN KEY (`routine_instance_id`) REFERENCES `routine_instance`(`routine_instance_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
