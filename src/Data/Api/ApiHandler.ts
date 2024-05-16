// import axios, { AxiosResponse } from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../State/store";
import { logOut, signIn } from "../State/AuthSlice";

const version = "1";

const baseQueryWithReauth = () =>
  fetchBaseQuery({
    baseUrl: `http://localhost:3000/api/v${version}`,
    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;
      headers.set("Content-Type", "application/json; charset=utf-8");
      //   headers.set(
      //     "Ocp-Apim-Subscription-Key",
      //     "0d5c36d70cf649a3a01dcbd94c967e97"
      //   );
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

export const CoreApi = createApi({
  reducerPath: "core",
  baseQuery: baseQueryWithReauth(),
  tagTypes: ["news", "appointment", "doctor", "wallet", "notification"],
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => `/news`,
      providesTags: ["news"],
    }),
    getAppointmentsByUserId: builder.query({
      query: (userId) => `/appointment/user/${userId}`,
      providesTags: ["appointment"],
    }),
    getNotificationsByUserId: builder.query({
      query: (userId) => `/notification/${userId}`,
      providesTags: ["notification"],
    }),
    getAppointmentsById: builder.query({
      query: (id: string | null | undefined): any => {
        if (!id) id = "skip";
        // if (!id) return null;
        return `/appointment/${id}`;
      },
      providesTags: ["appointment"],
    }),
    getDoctors: builder.query({
      query: () => `/doctor`,
      providesTags: ["doctor"],
    }),
    getUpcomingAppointment: builder.query({
      query: (userId) => `/appointment/upcoming/${userId}`,
      providesTags: ["appointment"],
    }),
    getWallet: builder.query({
      query: (id) => `/wallet/${id}`,
      providesTags: ["wallet"],
    }),
    getTransactionsByWalletId: builder.query({
      query: (id) => `/transaction/wallet/${id}`,
      providesTags: ["wallet"],
    }),
    createTransaction: builder.mutation({
      query: (transaction) => ({
        url: `/transaction/create`,
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["wallet"],
    }),
    createAppointment: builder.mutation({
      query: (appointment) => ({
        url: `/appointment`,
        method: "POST",
        body: appointment,
      }),
      invalidatesTags: ["appointment"],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, appointment }) => ({
        url: `/appointment/${id}`,
        method: "PATCH",
        body: appointment,
      }),
      invalidatesTags: ["appointment"],
    }),
    updateNotification: builder.mutation({
      query: ({ id, notification }) => ({
        url: `/notification/edit/${id}`,
        method: "PATCH",
        body: notification,
      }),
      invalidatesTags: ["notification"],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["appointment"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetAppointmentsByUserIdQuery,
  useGetAppointmentsByIdQuery,
  useGetNotificationsByUserIdQuery,
  useGetDoctorsQuery,
  useGetUpcomingAppointmentQuery,
  useCreateAppointmentMutation,
  useCreateTransactionMutation,
  useUpdateAppointmentMutation,
  useUpdateNotificationMutation,
  useDeleteAppointmentMutation,
  useGetWalletQuery,
  useGetTransactionsByWalletIdQuery,
  //   useCreateIndividualPatientMutation,
} = CoreApi;

export const checkValidToken = (store) => (next) => (action) => {
  // Call the next middleware in the chain
  const result = next(action);

  if (result?.payload?.data?.error === "jwt expired") {
    store.dispatch(logOut());
  }

  return result;
};

export const AuthApi = createApi({
  reducerPath: "login",
  baseQuery: baseQueryWithReauth(),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (signinDetails) => ({
        url: "/auth/register",
        method: "POST",
        body: signinDetails,
      }),
      invalidatesTags: ["auth"],
    }),
    loginUser: builder.mutation({
      query: (loginDetails) => ({
        url: "/auth/login",
        method: "POST",
        body: loginDetails,
      }),
      invalidatesTags: ["auth"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useUpdateUserMutation,
  useRegisterUserMutation,
  //   useCreateIndividualPatientMutation,
} = AuthApi;
