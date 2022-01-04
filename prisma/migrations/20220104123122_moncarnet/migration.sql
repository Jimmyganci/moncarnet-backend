-- CreateTable
CREATE TABLE `Appointment` (
    `userId` INTEGER NOT NULL,
    `prosId` INTEGER NOT NULL,
    `date` DATETIME NOT NULL,
    `comment` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`userId`, `prosId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_prosId_fkey` FOREIGN KEY (`prosId`) REFERENCES `Pros`(`id_pros`) ON DELETE RESTRICT ON UPDATE CASCADE;
