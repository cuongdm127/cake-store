/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/users`;

export const fetchUsersApi = (params: any, token: string) =>
  axios.get(API_URL, {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchUserByIdApi = (id: string, token: string) =>
  axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateUserApi = (id: string, data: any, token: string) =>
  axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteUserApi = (id: string, token: string) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
