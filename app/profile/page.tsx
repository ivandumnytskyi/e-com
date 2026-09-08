import Header from "@/components/Header/Header";
import productData from "@/data/data.js";
import Link from "next/link";
import ProfileContainer from "@/components/Profile/ProfileContainer";

function page() {
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    id: "1",
  };
  return (
    <>
      <Header />
      <ProfileContainer
        style={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}
      />
    </>
  );
}

export default page;
