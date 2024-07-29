import { currentUser } from "./auth";
import { getUserById } from "@/data/user";

// TODO: Melhorar essa lógica

export const defaultVerification = async () => {

  const user = await currentUser();

  if(!user) {
    return false;
  }

  const dbUser = await getUserById(user?.id as string);
  
  if(!dbUser) {
    return false;
  }

  return true;
}