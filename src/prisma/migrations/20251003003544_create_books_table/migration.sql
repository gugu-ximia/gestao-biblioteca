-- CreateTable
CREATE TABLE "Books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true
);
