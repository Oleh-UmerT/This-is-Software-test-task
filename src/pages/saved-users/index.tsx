import UserCard from "@/components/UserCard";
import { Users } from "@/types/user";
import useUserStorage from "@/hooks/useUserStorage";
import Link from "next/link";


export default function Home() {
  const { users: usersLocal } = useUserStorage();

  return (
    <div className="text-black flex flex-col items-center">
      <Link href="/" className="text-black font-semibold text-xl mt-8 underline">To Random Users</Link>
      <div className="bg-background w-full flex flex-wrap gap-5 justify-center p-4 text-black">
        {usersLocal?.map((user: Users, id: number) => {
          return <UserCard key={id} user={user} noSaveButton />;
        })}
      </div>
    </div>
  );
}
