import productData from "@/data/data";

function OrderHistory() {
  return (
    <div className="col-span-2 flex flex-col gap-4 items-center rounded-2xl">
      <h1 className="w-full text-center text-2xl font-bold m-4 bg-(--white-colour) shadow-(--shadow) rounded-xl">
        Your orders:
      </h1>
      <div
        id="order"
        className="bg-(--white-colour) shadow-(--shadow) rounded-xl w-full p-4"
      >
        <div className="flex justify-between px-4 py-2 text-gray-400">
          <p>orderid</p>
          <p className="text-(--text-colour) font-medium">order status</p>
          <p>order date</p>
        </div>
        <div
          id="order-items"
          className="flex flex-col gap-1 border-2 rounded-xl border-(--main-colour)"
        >
          <div
            id="order-item"
            className="flex gap-4 p-4 border-b-2 border-(--main-colour)"
          >
            <img
              src={productData.thumbnail}
              alt={productData.title}
              className="h-25"
            />
            <div id="order-item-info" className="flex flex-col gap-0.5">
              <h3>{productData.title}</h3>
              <p className="text-gray-400 text-xs">Quantity: 1</p>
              <p className="font-bold pb-1">${productData.price.toFixed(2)}</p>
            </div>
          </div>
          <div id="order-item" className="flex gap-4 p-4">
            <img
              src={productData.thumbnail}
              alt={productData.title}
              className="h-25"
            />
            <div id="order-item-info" className="flex flex-col gap-0.5">
              <h3>{productData.title}</h3>
              <p className="text-gray-400 text-xs">Quantity: 1</p>
              <p className="font-bold pb-1">${productData.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <p className="w-full text-end pt-4 font-bold">
          Total: ${(productData.price * 1).toFixed(2)}
        </p>
      </div>

      <div
        id="order"
        className="bg-(--white-colour) shadow-(--shadow) rounded-xl w-full p-4"
      >
        <div className="flex justify-between px-4 py-2 text-gray-400">
          <p>orderid</p>
          <p className="text-(--text-colour) font-medium">order status</p>
          <p>order date</p>
        </div>
        <div
          id="order-items"
          className="flex gap-4 p-4 border-2 rounded-xl border-(--main-colour)"
        >
          <img
            src={productData.thumbnail}
            alt={productData.title}
            className="h-25"
          />
          <div id="order-item-info" className="flex flex-col gap-0.5">
            <h3>{productData.title}</h3>
            <p className="text-gray-400 text-xs">Quantity: 1</p>
            <p className="font-bold pb-1">${productData.price.toFixed(2)}</p>
          </div>
        </div>
        <p className="w-full text-end pt-4 font-bold">
          Total: ${(productData.price * 1).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default OrderHistory;
