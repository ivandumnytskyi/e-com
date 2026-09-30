import ProfileContainer from "@/components/Profile/ProfileContainer";

function page() {
  return (
    <>
      <ProfileContainer
        style={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [@media(max-height:400px)]:-translate-y-1"}
      />
    </>
  );
}

export default page;
