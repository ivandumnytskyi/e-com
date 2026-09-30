import LikedInfo from "@/components/Liked/LikedInfo";
import ProfileContainer from "@/components/Profile/ProfileContainer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function liked() {
  const session = await auth();
  
  if (!session?.user?.id) redirect("/auth/signin");
  
  const records = await prisma.product.findMany({
    where: {
      LickedBu: {
        some: {id: session.user.id}
      }
    }
  })

  const likedProducts = records.map((record)=>({
    ...record,
    price: Number(record.price),
    discountPercentage: Number(record.discountPercentage),}))
  
  return (
    <>
      <main
        id="profile-container-ord"
        className="grid lg:grid-cols-3 justify-center max-w-300 gap-4 p-4 lg:relative lg:left-[50%] lg:translate-x-[-50%] mt-10"
      >
        <ProfileContainer style={"sticky top-20 z-50 h-min hidden lg:flex "} />
        <LikedInfo likedProducts={likedProducts}/>
      </main>
    </>
  );
}
