"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function ClientComponent() {
  const user = useCurrentUser();

  return (
    <UserInfo
      user={user}
      label="Client component"
    />
  );
};