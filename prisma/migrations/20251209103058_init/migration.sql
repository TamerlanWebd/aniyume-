-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "genres" TEXT[],
    "poster_url" TEXT,
    "view_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" SERIAL NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "video_url" TEXT NOT NULL,
    "view_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "user_id" INTEGER NOT NULL,
    "anime_id" INTEGER NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("user_id","anime_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "anime_title_idx" ON "anime"("title");

-- CreateIndex
CREATE INDEX "episodes_anime_id_idx" ON "episodes"("anime_id");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_anime_id_episode_number_key" ON "episodes"("anime_id", "episode_number");

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
