-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_hash_key" ON "Transfer"("hash");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_hash_fkey" FOREIGN KEY ("hash") REFERENCES "Transfer"("hash") ON DELETE CASCADE ON UPDATE CASCADE;
