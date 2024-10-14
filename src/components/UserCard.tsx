import React, { FC } from "react";
import { Users } from "@/types/user";
import { useState } from "react";
import UserModal from "@/modals/OpenUserModal";
import useUserStorage from "@/hooks/useUserStorage";
import Image from "next/image";

interface UserCardProps {
  user: Users;
  noSaveButton: boolean;
}

const UserCard: FC<UserCardProps> = ({ user, noSaveButton = false }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const { saveUser } = useUserStorage();

  const handleSaveUser = () => {
    saveUser(user);
  };

  return (
    <>
      <div className="flex flex-col w-80 h-76 border-solid border-black border rounded-lg gap-y-3 items-center p-3">
        <Image src={user.picture.medium} width={80} height={80} alt="" />
        <h1 className="text-center font-semibold">
          {user.name.title} {user.name.first}
        </h1>
        <p className="text-center w-full border-t border-solid border-gray-300">
          {user.gender}
        </p>
        <p className="text-center w-full border-t border-solid border-gray-300">
          {user.email}
        </p>
        <p className="text-center w-full border-t border-solid border-gray-300">
          {user.location.city}, {user.location.state}, {user.location.country}
        </p>
        <div className="flex-grow" />
        <div className="flex w-full justify-between mt-3">
          <button
            className="border border-solid border-black rounded-md px-3 py-1 hover:bg-blue-200 font-semibold"
            onClick={openModal}
          >
            Weather
          </button>
          {!noSaveButton && (
            <button
              className="border border-solid border-black rounded-md px-3 py-1 hover:bg-green-200 font-semibold"
              onClick={handleSaveUser}
            >
              Save
            </button>
          )}
        </div>
      </div>
      {modalIsOpen && (
        <UserModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          data={user}
        />
      )}
    </>
  );
};

export default UserCard;
