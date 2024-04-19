
-- AlterTable
ALTER TABLE "Post"
ALTER COLUMN published DROP NOT NULL;

UPDATE "Post"
SET published = NULL;

ALTER TABLE "Post"
ALTER COLUMN published DROP DEFAULT,
ALTER COLUMN published TYPE DATE USING (published::text::date),
ALTER COLUMN published SET NOT NULL;
