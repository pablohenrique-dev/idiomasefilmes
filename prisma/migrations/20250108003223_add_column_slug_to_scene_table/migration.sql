/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Scene` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Scene` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scene" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Scene_slug_key" ON "Scene"("slug");
