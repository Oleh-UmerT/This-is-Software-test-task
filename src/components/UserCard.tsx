import React, { FC } from "react";
import { Users } from "@/types/user";
import { useEffect, useState } from "react";
import UserModal from "@/modals/OpenUserModal";
import useUserStorage from "@/hooks/useUserStorage";

interface UserCardProps {
  user: Users;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  // console.log(user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const { saveUser } = useUserStorage();

  const handleSaveUser = () => {
    saveUser(user);
  };

  return (
    <>
      <div className="w-24 h-20 border-solid border-black border">
        <div>
          <h1>{user.name.first}</h1>
          <button onClick={openModal}>Weather</button>
          <button onClick={handleSaveUser}>Save</button>
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
