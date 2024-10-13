import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './users/usersApi';
import usersReducer from './slices/usersSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    users: usersReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch);

export default store;