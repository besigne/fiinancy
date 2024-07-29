import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

export default async function ServerComponent() {
  const user = await currentUser();

  return (
    <UserInfo
      user={user}
      label="Server component"
    />
  );
};