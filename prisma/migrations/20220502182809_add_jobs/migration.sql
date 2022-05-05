-- CreateTable
CREATE TABLE "JobPlace" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "description" TEXT,
    "hidden" BOOLEAN DEFAULT false,
    "workerId" UUID NOT NULL,

    CONSTRAINT "JobPlace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobPlace" ADD CONSTRAINT "JobPlace_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
