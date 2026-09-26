-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "ratingSum" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION update_product_rating_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE "Product"
    SET
      "ratingSum" = "ratingSum" + NEW."rating",
      "reviewCount" = "reviewCount" + 1
    WHERE "id" = NEW."productId";

    RETURN NEW;

  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE "Product"
    SET
      "ratingSum" = "ratingSum" - OLD."rating" + NEW."rating"
    WHERE "id" = NEW."productId";

    RETURN NEW;

  ELSIF TG_OP = 'DELETE' THEN
    UPDATE "Product"
    SET
      "ratingSum" = "ratingSum" - OLD."rating",
      "reviewCount" = "reviewCount" - 1
    WHERE "id" = OLD."productId";

    RETURN OLD;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER review_rating_stats_trigger
AFTER INSERT OR UPDATE OR DELETE ON "Review"
FOR EACH ROW
EXECUTE FUNCTION update_product_rating_stats();
