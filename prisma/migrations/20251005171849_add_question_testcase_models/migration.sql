-- CreateTable
CREATE TABLE "Constraint" (
    "constraint_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Constraint_pkey" PRIMARY KEY ("constraint_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Constraint_question_id_key" ON "Constraint"("question_id");

-- AddForeignKey
ALTER TABLE "Constraint" ADD CONSTRAINT "Constraint_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;
