import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

function discountedUnitPriceCents(price: number, discountPercentage: number) {
  return Math.round(price * (1 - discountPercentage / 100) * 100);
}

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id

  try {
    const order = await prisma.$transaction(async (tx) => {

      const cart = await tx.cart.findUnique({
        where: {
          userId: userId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      for (const item of cart.items) {
        if (session.user.isDemo) {
          const availableProduct = await tx.product.findMany({
            where: {
              id: item.productId,
              stock: { gte: item.quantity },
            },
            select: { id: true },
          });

          if (availableProduct.length === 0) {
            throw new Error("INSUFFICIENT_STOCK");
          }

          continue;
        }

        const stockUpdate = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: { gte: item.quantity },
          },
          data: {
            stock: { decrement: item.quantity },
          },
        });

        if (stockUpdate.count !== 1) {
          throw new Error("INSUFFICIENT_STOCK");
        }
      }

      const totalCents = cart.items.reduce(
        (sum, item) =>
          sum +
          discountedUnitPriceCents(
            Number(item.product.price),
            Number(item.product.discountPercentage),
          ) *
            item.quantity,
        0,
      );

      const order = await tx.order.create({
        data: {
          userId: userId,
          total: totalCents / 100,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price:
                discountedUnitPriceCents(
                  Number(item.product.price),
                  Number(item.product.discountPercentage),
                ) / 100,
            })),
          },
        },
      });

      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      return order;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Cart is empty") {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === "INSUFFICIENT_STOCK") {
      return NextResponse.json(
        { error: "One or more items no longer have enough stock" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
