/*
  Warnings:

  - You are about to drop the column `sample_input` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `sample_output` on the `Question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[room_id,team_id]` on the table `Leaderboard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[team_id,nickname]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[room_id,team_name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Answer" DROP CONSTRAINT "Answer_player_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Answer" DROP CONSTRAINT "Answer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Answer" DROP CONSTRAINT "Answer_team_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Leaderboard" DROP CONSTRAINT "Leaderboard_room_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Leaderboard" DROP CONSTRAINT "Leaderboard_team_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Player" DROP CONSTRAINT "Player_team_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Question" DROP CONSTRAINT "Question_room_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."RoomTopic" DROP CONSTRAINT "RoomTopic_room_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Team" DROP CONSTRAINT "Team_room_id_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "sample_input",
DROP COLUMN "sample_output";

-- CreateTable
CREATE TABLE "QuestionExample" (
    "example_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "QuestionExample_pkey" PRIMARY KEY ("example_id")
);

-- CreateIndex
CREATE INDEX "QuestionExample_question_id_idx" ON "QuestionExample"("question_id");

-- CreateIndex
CREATE INDEX "QuestionExample_question_id_order_idx" ON "QuestionExample"("question_id", "order");

-- CreateIndex
CREATE INDEX "Answer_team_id_idx" ON "Answer"("team_id");

-- CreateIndex
CREATE INDEX "Answer_player_id_idx" ON "Answer"("player_id");

-- CreateIndex
CREATE INDEX "Answer_question_id_idx" ON "Answer"("question_id");

-- CreateIndex
CREATE INDEX "Answer_submitted_at_idx" ON "Answer"("submitted_at");

-- CreateIndex
CREATE INDEX "Leaderboard_room_id_rank_idx" ON "Leaderboard"("room_id", "rank");

-- CreateIndex
CREATE INDEX "Leaderboard_room_id_score_idx" ON "Leaderboard"("room_id", "score" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_room_id_team_id_key" ON "Leaderboard"("room_id", "team_id");

-- CreateIndex
CREATE INDEX "Player_team_id_idx" ON "Player"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_team_id_nickname_key" ON "Player"("team_id", "nickname");

-- CreateIndex
CREATE INDEX "Question_room_topic_id_idx" ON "Question"("room_topic_id");

-- CreateIndex
CREATE INDEX "Question_room_topic_id_created_at_idx" ON "Question"("room_topic_id", "created_at");

-- CreateIndex
CREATE INDEX "Room_created_at_idx" ON "Room"("created_at");

-- CreateIndex
CREATE INDEX "RoomTopic_room_id_idx" ON "RoomTopic"("room_id");

-- CreateIndex
CREATE INDEX "RoomTopic_room_id_level_idx" ON "RoomTopic"("room_id", "level");

-- CreateIndex
CREATE INDEX "Team_room_id_idx" ON "Team"("room_id");

-- CreateIndex
CREATE INDEX "Team_room_id_score_idx" ON "Team"("room_id", "score" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Team_room_id_team_name_key" ON "Team"("room_id", "team_name");

-- AddForeignKey
ALTER TABLE "RoomTopic" ADD CONSTRAINT "RoomTopic_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("team_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_room_topic_id_fkey" FOREIGN KEY ("room_topic_id") REFERENCES "RoomTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionExample" ADD CONSTRAINT "QuestionExample_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("player_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("team_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("team_id") ON DELETE CASCADE ON UPDATE CASCADE;
