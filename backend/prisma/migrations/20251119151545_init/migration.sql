-- CreateTable
CREATE TABLE "Adding" (
    "id" SERIAL NOT NULL,
    "created" TEXT NOT NULL,

    CONSTRAINT "Adding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adding_id_key" ON "Adding"("id");
