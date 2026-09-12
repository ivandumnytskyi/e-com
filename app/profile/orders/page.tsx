import OrderHistory from "@/components/Order/OrderHistory";
import ProfileContainer from "@/components/Profile/ProfileContainer";

export default function orders() {
  return (
    <>
      <main
        id="profile-container-ord"
        className="grid grid-cols-3  justify-center h-130 w-300 gap-4 p-4 relative left-[50%] translate-x-[-50%] mt-10"
      >
        <ProfileContainer style={"sticky top-10 z-50"} />
        <OrderHistory />
      </main>
    </>
  );
}
