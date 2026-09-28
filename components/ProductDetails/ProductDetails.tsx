import ProductInfo from "./ProductInfo";
import type { Product } from "../types";
import ProductReviews, { type ProductWithReviews } from "./ProductReviews";

function ProductDetails({ product }: { product: ProductWithReviews }) {
  return (
    <main className="mx-auto w-[calc(100%-40px)] max-w-295 py-7 pb-18 max-[760px]:w-[calc(100%-24px)] max-[760px]:max-w-140 max-[760px]:pt-5">
      <div className="mb-7 text-[0.8rem] text-(--text-colour)/60">
        Home <span className="mx-2 opacity-50">/</span> {product.category}{" "}
        <span className="mx-2 opacity-50">/</span> {product.title}
      </div>

      <ProductInfo product={product} />
      <ProductReviews product={product} />
    </main>
  );
}

export default ProductDetails;
