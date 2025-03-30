/*
  Warnings:

  - You are about to drop the `ProjectTechnology` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `description` on the `ProjectType` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProjectTechnology";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_ProjectTechnology" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProjectTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ProjectType" ("createdAt", "id", "name", "slug", "updatedAt") SELECT "createdAt", "id", "name", "slug", "updatedAt" FROM "ProjectType";
DROP TABLE "ProjectType";
ALTER TABLE "new_ProjectType" RENAME TO "ProjectType";
CREATE UNIQUE INDEX "ProjectType_slug_key" ON "ProjectType"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectTechnology_AB_unique" ON "_ProjectTechnology"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectTechnology_B_index" ON "_ProjectTechnology"("B");
