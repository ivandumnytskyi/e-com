import Link from "next/link";
import LogOutButton from "./LogOutButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type Props = {
  style?: string;
};
async function ProfileContainer({ style }: Props) {
  const session = await auth();

  if (!session?.user?.id) redirect("/auth/signin");

  return (
    <div
      id="profile-container"
      className={`${style} bg-(--white-colour) flex flex-col items-center justify-around  gap-4 p-4 rounded-2xl shadow-(--shadow)`}
    >
      <div
        id="profile-info"
        className="flex flex-col items-center lg:w-80"
      >
        <h1>{session.user.name}</h1>
        <p>{session.user.email}</p>
      </div>
       <LogOutButton />
      <Link href="/profile/orders" className="w-full lg:w-80" >
        <div
          id="profile-orders"
          className="flex flex-col items-center justify-center w-full border-2 rounded-2xl border-(--main-colour) hover:bg-(--main-colour) transition: duration-300 lg:w-80"
        >
          <h2 className="p-2">Orders</h2>
        </div>
      </Link>
      <Link href="/profile/liked" className="w-full lg:w-80">
        <div
          id="profile-liked"
          className="flex flex-col gap-2 items-center justify-center border-2 rounded-2xl border-(--main-colour) hover:bg-(--main-colour) transition: duration-300 lg:w-80"
        >
          <h2 className="p-2 ">Liked Items</h2>
        </div>
      </Link>
    </div>
  );
}

export default ProfileContainer;
