import Star from "../ProductsGrid/Star";
import type { Product, Review } from "../types";

export type ProductWithReviews = Product & {
  reviews: Review[];
};

function ProductReviews({ product }: { product: ProductWithReviews }) {
  return (
     <section className="mt-20.5 border-t border-(--text-colour)/15 pt-8 max-[760px]:mt-13" aria-labelledby="reviews-title">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-(--main-colour)">Customer feedback</p>
            <h2 id="reviews-title" className="m-0 text-[2rem] font-bold leading-[1.05] tracking-[-0.03em]">Reviews</h2>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 max-[760px]:grid-cols-1">
          {product.reviews.map((review, index) => (
            <article className="rounded bg-(--white-colour) p-5" key={`${review.user.name}-${review.createdAt}-${index}`}>
              <div className="mb-3 flex justify-between gap-3 text-[0.85rem]">
                <strong>{review.user.name ?? "Anonymous"}</strong>
                <time className="opacity-55" dateTime={review.createdAt}>{new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
              </div>
              <Star rating={review.rating} />
              <p className="my-3.5 leading-normal">{review.comment}</p>
            </article>
          ))}
        </div>
      </section>
  );
}

export default ProductReviews;