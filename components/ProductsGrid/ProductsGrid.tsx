import productData from "../../data/data.js";
import Link from "next/link";
import LikedButton from "./LikedButton.tsx"
import Star from "./Star.tsx";

function Grid() {
  return (
    <main className="px-10 py-6 grid grid-cols-7 gap-4">
      <div className="relative h-80 w-44 shadow-(--shadow) bg-(--white-colour) px-3 py-2 flex flex-col justify-center gap-2 rounded-lg">
        <Link href={`/product/${productData.id}`}>
          <img
            className="h-36"
            src={productData.thumbnail}
            alt={productData.title}
          />
          <h2>{productData.title}</h2>
        </Link>
        <LikedButton />
        <p>${productData.price.toFixed(2)}</p>
        <Star rating={productData.rating} />
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
    </main>
  );
}

export default Grid;
