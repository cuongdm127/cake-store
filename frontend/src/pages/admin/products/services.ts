/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/products`;

export const fetchProductsApi = (params: any, token: string) =>
  axios.get(API_URL, {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchProductByIdApi = (id: string, token: string) =>
  axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createProductApi = (data: any, token: string) =>
  axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProductApi = (id: string, data: any, token: string) =>
  axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProductApi = (id: string, token: string) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
