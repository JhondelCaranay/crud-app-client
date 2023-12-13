"use client";

import { Loader } from "@/components/Loader";
import useCurrentUser from "@/components/hooks/useCurrentUser";

const ProfilePage = () => {
  const { data, isPending } = useCurrentUser();

  if (isPending || !data) {
    return <Loader />;
  }

  return (
    <div className="p-5">
      <p>User: {data?.name}</p>
      <p>email: {data?.email}</p>
    </div>
  );
};
export default ProfilePage;
