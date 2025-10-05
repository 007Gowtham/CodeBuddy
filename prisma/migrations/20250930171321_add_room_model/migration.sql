/*
  Warnings:

  - You are about to drop the column `topic_id` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `topic_id` on the `RoomTopic` table. All the data in the column will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `room_topic_id` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `RoomTopic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Question" DROP CONSTRAINT "Question_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."RoomTopic" DROP CONSTRAINT "RoomTopic_topic_id_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "topic_id",
ADD COLUMN     "room_topic_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RoomTopic" DROP COLUMN "topic_id",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Topic";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_room_topic_id_fkey" FOREIGN KEY ("room_topic_id") REFERENCES "RoomTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
