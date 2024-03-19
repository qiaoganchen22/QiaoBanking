import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ token }) => ({
        url: "/api/users",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getUser: builder.query({
      query: ({ id, token }) => ({
        url: "/api/users/" + id,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getUserForAdmin: builder.query({
      query: ( {userid, token }) => ({
        url: "/api/users/admin/" + userid,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    createUser: builder.mutation({
      query: ({ firstname, lastname, ssn, address, password, email }) => ({
        url: "/api/users",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: {
          firstname,
          lastname,
          ssn,
          address,
          password,
          email,
        },
      }),
    }),

    updateUser: builder.mutation({
      query: ({ firstname, lastname, address, password,token}) => ({
        url: "/api/users/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: {
          firstname,
          lastname,
          address,
          password,
        },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserForAdminQuery,
} = usersApi;
