/*
  Warnings:

  - You are about to drop the column `description` on the `Technology` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Technology` table. All the data in the column will be lost.
  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Technology" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Technology" ("createdAt", "id", "name", "slug", "updatedAt") SELECT "createdAt", "id", "name", "slug", "updatedAt" FROM "Technology";
DROP TABLE "Technology";
ALTER TABLE "new_Technology" RENAME TO "Technology";
CREATE UNIQUE INDEX "Technology_slug_key" ON "Technology"("slug");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "worksAt" TEXT NOT NULL DEFAULT 'Not working',
    "location" TEXT NOT NULL,
    "linkedin" TEXT,
    "github" TEXT,
    "website" TEXT,
    "bio" TEXT NOT NULL,
    "about" TEXT,
    "image" TEXT,
    "slug" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("bio", "createdAt", "email", "github", "id", "image", "isAdmin", "linkedin", "location", "name", "password", "slug", "updatedAt", "website", "worksAt") SELECT "bio", "createdAt", "email", "github", "id", "image", "isAdmin", "linkedin", "location", "name", "password", "slug", "updatedAt", "website", "worksAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
