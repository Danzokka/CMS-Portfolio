/*
  Warnings:

  - You are about to drop the column `technologyId` on the `ProjectTechnology` table. All the data in the column will be lost.
  - Added the required column `slug` to the `ProjectTechnology` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectTechnology" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectTechnology_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectTechnology_slug_fkey" FOREIGN KEY ("slug") REFERENCES "Technology" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectTechnology" ("createdAt", "id", "projectId", "updatedAt") SELECT "createdAt", "id", "projectId", "updatedAt" FROM "ProjectTechnology";
DROP TABLE "ProjectTechnology";
ALTER TABLE "new_ProjectTechnology" RENAME TO "ProjectTechnology";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
