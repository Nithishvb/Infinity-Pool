/*
  Warnings:

  - Added the required column `maxContribution` to the `Pool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minContribution` to the `Pool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetFunds` to the `Pool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pool" ADD COLUMN     "maxContribution" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "minContribution" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "targetFunds" DOUBLE PRECISION NOT NULL;
