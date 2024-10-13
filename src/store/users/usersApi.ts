import { APIResponse } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://randomuser.me/api/" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getCurrentUsers: builder.query<APIResponse, number>({
      query: () => `?results=3`,
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetCurrentUsersQuery } = usersApi;
