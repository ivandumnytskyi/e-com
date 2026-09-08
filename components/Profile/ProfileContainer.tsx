import Link from "next/link";
type Props = {
  style?: string;
};
function ProfileContainer({ style }: Props) {
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    id: "1",
  };

  return (
    <div
      id="profile-container"
      className={`${style} bg-(--white-colour) flex flex-col items-center justify-around h-130 w-85 gap-4 p-4 rounded-2xl shadow-(--shadow)`}
    >
      <div
        id="profile-info"
        className="flex flex-col items-center justify-center w-80 "
      >
        <h1>{userData.name}</h1>
        <p>{userData.email}</p>
      </div>
      <div
        id="profile-orders"
        className="flex flex-col items-center justify-center w-80 border-2 rounded-2xl border-(--main-colour) "
      >
        <Link href="/profile/orders">
          <h2 className="p-2">Orders</h2>
        </Link>
        <div id="last-order" className="p-2">
          Order
        </div>
      </div>
      <div
        id="profile-liked"
        className="flex flex-col gap-2 items-center justify-center w-80 border-2 rounded-2xl border-(--main-colour)"
      >
        <Link href="/profile/liked">
          <h2 className="p-2 ">Liked Items</h2>
        </Link>
        <div id="last-liked" className="p-2">
          Liked Item
        </div>
      </div>
    </div>
  );
}

export default ProfileContainer;
