-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "name" TEXT DEFAULT 'Anonymous',
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passwordHash" TEXT,
    "registerHash" TEXT
);
INSERT INTO "new_User" ("email", "id", "name", "passwordHash", "registerHash", "registeredAt") SELECT "email", "id", "name", "passwordHash", "registerHash", "registeredAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_registerHash_key" ON "User"("registerHash");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
