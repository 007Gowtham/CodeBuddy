/*
  Warnings:

  - A unique constraint covering the columns `[question_id,player_id]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Answer_question_id_key";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "test_cases_passed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_test_cases" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "QuestionExample" ADD COLUMN     "explanation" TEXT;

-- CreateTable
CREATE TABLE "TestCase" (
    "test_case_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "expected_output" TEXT NOT NULL,
    "is_sample" BOOLEAN NOT NULL DEFAULT false,
    "is_hidden" BOOLEAN NOT NULL DEFAULT true,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "time_limit" INTEGER,
    "memory_limit" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("test_case_id")
);

-- CreateTable
CREATE TABLE "QuestionAssignment" (
    "assignment_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionAssignment_pkey" PRIMARY KEY ("assignment_id")
);

-- CreateIndex
CREATE INDEX "TestCase_question_id_idx" ON "TestCase"("question_id");

-- CreateIndex
CREATE INDEX "TestCase_question_id_order_idx" ON "TestCase"("question_id", "order");

-- CreateIndex
CREATE INDEX "TestCase_question_id_is_sample_idx" ON "TestCase"("question_id", "is_sample");

-- CreateIndex
CREATE INDEX "QuestionAssignment_team_id_idx" ON "QuestionAssignment"("team_id");

-- CreateIndex
CREATE INDEX "QuestionAssignment_player_id_idx" ON "QuestionAssignment"("player_id");

-- CreateIndex
CREATE INDEX "QuestionAssignment_question_id_idx" ON "QuestionAssignment"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionAssignment_question_id_team_id_key" ON "QuestionAssignment"("question_id", "team_id");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_question_id_player_id_key" ON "Answer"("question_id", "player_id");

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAssignment" ADD CONSTRAINT "QuestionAssignment_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAssignment" ADD CONSTRAINT "QuestionAssignment_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("team_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAssignment" ADD CONSTRAINT "QuestionAssignment_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("player_id") ON DELETE CASCADE ON UPDATE CASCADE;
