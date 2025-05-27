-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hash" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "pix" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "originName" TEXT NOT NULL,
    "originBank" TEXT NOT NULL,
    "originAgency" TEXT NOT NULL,
    "originAccount" TEXT NOT NULL,
    "originCpf" TEXT NOT NULL,
    "destName" TEXT NOT NULL,
    "destBank" TEXT NOT NULL,
    "destAgency" TEXT NOT NULL,
    "destAccount" TEXT NOT NULL,
    "destCpf" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hash" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Location_hash_fkey" FOREIGN KEY ("hash") REFERENCES "Transfer" ("hash") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_hash_key" ON "Transfer"("hash");
