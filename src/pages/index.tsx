import { useGetCurrentUsersQuery } from "@/store/users/usersApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import { Users } from "@/types/user";
import { addUsers, setUsers } from "@/store/slices/usersSlice";
import Link from "next/link";

//todo: design, second page, bonus tasks

export default function Home() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(10);
  const [loadMore, setLoadMore] = useState(false);
  const {
    data: users,
    isLoading: isLoadingUser,
    isError: fetchError,
    refetch,
  } = useGetCurrentUsersQuery(amount);
  const cachedUsers = useSelector((state: any) => state.users.users);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 300000); //every 5 mins
    if (users && !loadMore) {
      dispatch(setUsers(users.results));
    }
    return () => clearInterval(interval);
  }, [users, refetch]);

  useEffect(() => {
    if (users && loadMore) {
      dispatch(addUsers(users.results));
    }
    setLoadMore(false);
  }, [users, dispatch]);

  const handleLoadMore = () => {
    setAmount((prevAmount) => prevAmount + 10);
    setLoadMore(true);
  };
  if (isLoadingUser)
    return (
      <div className="flex justify-center text-xl font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="text-black flex flex-col items-center">
      <Link
        href="/saved-users"
        className="text-black font-semibold text-xl mt-8 underline"
      >
        To Saved Users
      </Link>
      <div className="bg-background w-full flex flex-wrap gap-5 justify-center p-4 text-black">
        {cachedUsers?.map((user: Users, id: number) => {
          return <UserCard key={id} user={user} noSaveButton={false} />;
        })}
      </div>
      <button
        className="border border-solid border-black rounded-md px-3 py-1 hover:bg-gray-200 font-semibold"
        onClick={handleLoadMore}
      >
        Load More
      </button>
    </div>
  );
}
