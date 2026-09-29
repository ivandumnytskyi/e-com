import type { Order } from "../types";

function OrderHistory({ orders }: { orders: Order[] }) {
  return (
    <div className="col-span-2 flex flex-col gap-4 items-center rounded-2xl">
      <h1 className="w-full text-center text-2xl font-bold m-4 bg-(--white-colour) shadow-(--shadow) rounded-xl">
        Your orders:
      </h1>
      {orders.map((order) => (
        <div
        key={order.id}
          id="order"
          className="bg-(--white-colour) shadow-(--shadow) rounded-xl w-full p-4"
        >
          <div className="flex justify-between px-4 py-2 text-gray-400">
            <p>{order.id}</p>
            <p className="text-(--text-colour) font-medium">{order.status}</p>
            <p>{new Date(order.updatedAt).toLocaleDateString()}</p>
          </div>
          <div
            id="order-items"
            className="flex flex-col gap-1 border-2 rounded-xl border-(--main-colour)"
          >
            {order.items.map((item, index)=>(
              <div
              key={item.id}
              id="order-item"
              className={`flex gap-4 p-4 ${order.items.length === index + 1 ? '' : 'border-b-2 border-(--main-colour)'}`}
            >
              <img
                src={item.product.thumbnail ?? ""}
                alt={item.product.title}
                className="h-25"
              />
              <div id="order-item-info" className="flex flex-col gap-0.5">
                <h3>{item.product.title}</h3>
                <p className="text-gray-400 text-xs">Quantity: {item.quantity}</p>
                <p className="font-bold pb-1">
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>
            </div>
            ))}
          </div>

          <p className="w-full text-end pt-4 font-bold">
            Total: {Number(order.total).toFixed(2)}$
          </p>
        </div>
      ))}

    </div>
  );
}

export default OrderHistory;
