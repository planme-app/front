/*
  Warnings:

  - Added the required column `goal` to the `bool_routine_instance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `bool_routine_instance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal` to the `count_routine_instance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `count_routine_instance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal` to the `time_routine_instance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `time_routine_instance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bool_routine_instance` ADD COLUMN `goal` BOOLEAN NOT NULL,
    ADD COLUMN `progress` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `count_routine_instance` ADD COLUMN `goal` INTEGER NOT NULL,
    ADD COLUMN `progress` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `time_routine_instance` ADD COLUMN `goal` INTEGER NOT NULL,
    ADD COLUMN `progress` INTEGER NOT NULL;
