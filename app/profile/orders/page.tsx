import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import OrderHistory from "@/components/Order/OrderHistory";
import ProfileContainer from "@/components/Profile/ProfileContainer";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/signin");

  const ordersList = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: {
            select: { thumbnail: true, title: true },
          },
        },
      },
    },
  });

  return (
    <>
      <main
        id="profile-container-ord"
        className="grid grid-cols-3  justify-center h-130 w-300 gap-4 p-4 relative left-[50%] translate-x-[-50%] mt-10"
      >
        <ProfileContainer style={"sticky top-10 z-50"} />
        <OrderHistory orders={ordersList} />
      </main>
    </>
  );
}
