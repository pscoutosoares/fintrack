-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(39) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password" VARCHAR(72) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
