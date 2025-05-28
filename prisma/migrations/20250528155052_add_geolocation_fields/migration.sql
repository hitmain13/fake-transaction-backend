/*
  Warnings:

  - Added the required column `accuracy` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "accuracy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "altitude" DOUBLE PRECISION,
ADD COLUMN     "altitudeAccuracy" DOUBLE PRECISION,
ADD COLUMN     "heading" DOUBLE PRECISION,
ADD COLUMN     "speed" DOUBLE PRECISION;
