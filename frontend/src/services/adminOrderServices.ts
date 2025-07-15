import axios from 'axios';

// Define reusable types
export type Order = {
  _id: string;
  user: {
    email: string;
  };
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
};

export type GetOrdersParams = {
  page?: number;
  limit?: number;
  search?: string;
  paymentStatus?: string;
  shipmentStatus?: string;
  dateRange?: string;
};

export type GetOrdersResponse = {
  orders: Order[];
  totalPages: number;
  page: number;
  total: number;
};

// Base URL for all admin orders API calls
const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`;

/**
 * Fetch orders list with filters and pagination
 */
export const fetchOrdersApi = async (
  params: GetOrdersParams,
  token: string
): Promise<GetOrdersResponse> => {
  const response = await axios.get<GetOrdersResponse>(`${API_BASE}`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * Mark order as delivered
 */
export const markOrderAsDeliveredApi = async (
  orderId: string,
  token: string
): Promise<void> => {
  await axios.put(
    `${API_BASE}/${orderId}/deliver`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

/**
 * Mark order as paid
 */
export const markOrderAsPaidApi = async (
  orderId: string,
  token: string
): Promise<void> => {
  await axios.put(
    `${API_BASE}/${orderId}/pay`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

/**
 * Delete an order
 */
export const deleteOrderApi = async (
  orderId: string,
  token: string
): Promise<void> => {
  await axios.delete(`${API_BASE}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
