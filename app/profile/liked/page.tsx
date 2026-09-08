import Header from "@/components/Header/Header";
import LikedInfo from "@/components/Liked/LikedInfo";
import ProfileContainer from "@/components/Profile/ProfileContainer";

export default function liked() {
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    id: "1",
  };
  return (
    <>
      <Header />
      <main
        id="profile-container-ord"
        className="grid grid-cols-3 justify-center w-300 gap-4 p-4 relative left-[50%] translate-x-[-50%] mt-10"
      >
        <ProfileContainer style={"sticky top-10 z-50"} />
        <LikedInfo />
      </main>
    </>
  );
}
