import Link from "next/link";
import productData from "@/data/data.js";

function LikedInfo() {
  return (
    <div className="col-span-2 flex flex-col gap-4 items-center rounded-2xl">
      <h1 className="w-full text-center text-2xl font-bold m-4 bg-(--white-colour) shadow-(--shadow) rounded-xl">
        Your liked items:
      </h1>

      <div className="w-full grid grid-cols-4 justify-items-center">
        <div className="h-80 w-44 shadow-(--shadow) bg-(--white-colour) px-3 py-2 flex flex-col justify-center gap-2 rounded-lg">
          <Link href={`/product/${productData.id}`}>
            <img
              className="h-36"
              src={productData.thumbnail}
              alt={productData.title}
            />
            <h2>{productData.title}</h2>
          </Link>

          <p>${productData.price.toFixed(2)}</p>
          <button className="bg-amber-500">Add to Cart</button>
        </div>

        <div className="h-80 w-44 shadow-(--shadow) bg-(--white-colour) px-3 py-2 flex flex-col justify-center gap-2 rounded-lg">
          <Link href={`/product/${productData.id}`}>
            <img
              className="h-36"
              src={productData.thumbnail}
              alt={productData.title}
            />
            <h2>{productData.title}</h2>
          </Link>

          <p>${productData.price.toFixed(2)}</p>
          <button className="bg-amber-500">Add to Cart</button>
        </div>

        <div className="h-80 w-44 shadow-(--shadow) bg-(--white-colour) px-3 py-2 flex flex-col justify-center gap-2 rounded-lg">
          <Link href={`/product/${productData.id}`}>
            <img
              className="h-36"
              src={productData.thumbnail}
              alt={productData.title}
            />
            <h2>{productData.title}</h2>
          </Link>

          <p>${productData.price.toFixed(2)}</p>
          <button className="bg-amber-500">Add to Cart</button>
        </div>

        <div className="h-80 w-44 shadow-(--shadow) bg-(--white-colour) px-3 py-2 flex flex-col justify-center gap-2 rounded-lg">
          <Link href={`/product/${productData.id}`}>
            <img
              className="h-36"
              src={productData.thumbnail}
              alt={productData.title}
            />
            <h2>{productData.title}</h2>
          </Link>

          <p>${productData.price.toFixed(2)}</p>
          <button className="bg-amber-500">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default LikedInfo;
