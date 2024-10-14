import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "@/types/user";

interface UsersState {
  users: Users[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<Users[]>) => {
      const filtered = action.payload.filter((item) => {
        return !state.users.some((n) => n.email === item.email);
      });
      state.users = [...state.users, ...filtered];
    },
    setUsers: (state, action: PayloadAction<Users[]>) => {
      state.users = [...action.payload];
    },
  },
});

export const { addUsers, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
