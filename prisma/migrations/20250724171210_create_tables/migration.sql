-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "countyId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "County" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "County_pkey" PRIMARY KEY ("id")
);
