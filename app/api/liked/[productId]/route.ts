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

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      likedProducts: {
        connect: {
          id: productId,
        },
      },
    },
  });

  return NextResponse.json(
    { message: "Product liked" },
    { status: 201 }
  );
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

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      likedProducts: {
        disconnect: {
          id: productId,
        },
      },
    },
  });

  return NextResponse.json(
    { message: "Product unliked" },
    { status: 200 }
  );
}
