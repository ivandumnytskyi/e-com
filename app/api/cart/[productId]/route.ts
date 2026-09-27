import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { productId } = await params;
  const { quantity } = await request.json();

  if (!Number.isInteger(quantity) || quantity < 1) {
    return NextResponse.json(
      { error: "Invalid quantity" },
      { status: 400 }
    );
  }

  const cart = await prisma.cart.upsert({
    where: {
      userId: session.user.id,
    },
    create: {
      userId: session.user.id,
    },
    update: {},
  });

  const cartItem = await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    create: {
      cartId: cart.id,
      productId,
      quantity,
    },
    update: {
      quantity,
    },
  });

  return NextResponse.json(cartItem, { status: 201 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { productId } = await params;

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!cart) {
    return NextResponse.json(
      { error: "Cart not found" },
      { status: 404 }
    );
  }

  await prisma.cartItem.delete({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  return NextResponse.json(
    { message: "Product deleted from cart" },
    { status: 200 }
  );
}
