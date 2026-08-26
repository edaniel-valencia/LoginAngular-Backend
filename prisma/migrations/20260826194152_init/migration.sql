-- CreateTable
CREATE TABLE `category` (
    `Cid` INTEGER NOT NULL AUTO_INCREMENT,
    `Cname` VARCHAR(255) NOT NULL,
    `Cdescription` VARCHAR(255) NOT NULL,
    `Cstatus` INTEGER NOT NULL,
    `Ccreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Cupdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Cdeleted` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Cid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `Pid` INTEGER NOT NULL AUTO_INCREMENT,
    `Pname` VARCHAR(255) NOT NULL,
    `Pdescription` VARCHAR(255) NOT NULL,
    `CategoryId` INTEGER NOT NULL,
    `Pstatus` INTEGER NOT NULL,
    `Pcreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Pupdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Pdeleted` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Pid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `Rid` INTEGER NOT NULL AUTO_INCREMENT,
    `Rname` VARCHAR(255) NOT NULL,
    `Rstatus` INTEGER NOT NULL,
    `Rcreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Rupdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Rdeleted` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Rid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `Uid` INTEGER NOT NULL AUTO_INCREMENT,
    `Uname` VARCHAR(255) NOT NULL,
    `Ulastname` VARCHAR(255) NOT NULL,
    `Uemail` VARCHAR(255) NOT NULL,
    `Upassword` VARCHAR(255) NOT NULL,
    `Ucredential` VARCHAR(255) NOT NULL,
    `Ustatus` INTEGER NOT NULL,

    UNIQUE INDEX `user_Uemail_key`(`Uemail`),
    UNIQUE INDEX `user_Upassword_key`(`Upassword`),
    UNIQUE INDEX `user_Ucredential_key`(`Ucredential`),
    PRIMARY KEY (`Uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_has_roles` (
    `Uid` INTEGER NOT NULL,
    `Rid` INTEGER NOT NULL,

    PRIMARY KEY (`Uid`, `Rid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `category`(`Cid`) ON DELETE RESTRICT ON UPDATE CASCADE;
