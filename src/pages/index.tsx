import { useGetCurrentUsersQuery } from "@/store/users/usersApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useLayoutEffect } from "react";
import UserCard from "@/components/UserCard";
import { Users } from "@/types/user";
import { addUsers } from "@/store/slices/usersSlice";
import useUserStorage from "@/hooks/useUserStorage";

export default function Home() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(3);
  const {
    data: users,
    isLoading: isLoadingUser,
    isError: fetchError,
  } = useGetCurrentUsersQuery(amount);
  const cachedUsers = useSelector((state: any) => state.users.users);
  const {users: usersLocal} = useUserStorage()

  useEffect(() => {
    if (users) {
      dispatch(addUsers(users.results));
    }
  }, [users, dispatch]);
   
  // useLayoutEffect(() => {
  //   console.log("123123",usersLocal)
  //   if (usersLocal) {
  //     dispatch(addUsers(usersLocal));
  //   }
  // }, [usersLocal]);

  const handleLoadMore = () => {
    setAmount((prevAmount) => prevAmount + 3);
  };

  console.log(cachedUsers)

  return (
    <div className="bg-background h-80 w-full text-black">
      {cachedUsers?.map((user: Users, id: number) => {
        return <UserCard key={id} user={user} />;
      })}
      <p onClick={handleLoadMore}>load more</p>
    </div>
  );
}
