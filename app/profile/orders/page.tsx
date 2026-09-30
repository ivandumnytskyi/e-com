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
    orderBy: { createdAt: "desc" },
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
        className="grid lg:grid-cols-3 justify-center max-w-300 gap-4 p-4 lg:relative lg:left-[50%] lg:translate-x-[-50%] mt-10"
      >
        <ProfileContainer style={"sticky top-20 z-50 h-min hidden lg:flex"} />
        <OrderHistory orders={ordersList} />
      </main>
    </>
  );
}
