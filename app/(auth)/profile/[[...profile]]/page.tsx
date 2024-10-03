import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const Profile = () => {
  const {userId}=auth()
  if(!userId) redirect("/sign-in")
  return <UserProfile />
};

export default Profile;