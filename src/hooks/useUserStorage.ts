import { Users } from "@/types/user";
import { useLayoutEffect, useState } from "react";
import { LOCALSTORAGE_KEY } from "@/constants/user-constants";

const useUserStorage = () => {
  const [users, setUsers] = useState<Users[] | []>([]);
  //No internet? No problem!
  const saveUser = (user: Users) => {
    const userCopy = [...users, user];
    setUsers((prev) => [...prev, user]);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(userCopy));
  };

  useLayoutEffect(() => {
    const localUsersValue = localStorage.getItem(LOCALSTORAGE_KEY);
    if (localUsersValue) {
      setUsers(JSON.parse(localUsersValue));
    }
  }, []);

  return { users, saveUser };
};

export default useUserStorage;
