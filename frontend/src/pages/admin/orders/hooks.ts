import { useState, useEffect, useCallback } from 'react';
import {
    fetchOrdersApi,
    markOrderAsDeliveredApi,
    markOrderAsPaidApi,
    deleteOrderApi,
} from './services';
import { Order, GetOrdersParams } from './services'; // Assuming you export these types in services

// Define type for the user prop
type AdminUser = {
    token: string;
};

export const useAdminOrders = (user: AdminUser | null) => {
    // State declarations
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [search, setSearch] = useState<string>('');
    const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('');
    const [shipmentStatusFilter, setShipmentStatusFilter] = useState<string>('');
    const [dateRange, setDateRange] = useState<string>('7d');

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const limit = 10;

    useEffect(() => {
        setPage(1);
    }, [search, paymentStatusFilter, shipmentStatusFilter, dateRange]);

    // Fetch orders
    const fetchOrders = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        try {
            const params: GetOrdersParams = {
                page,
                limit,
                search,
                paymentStatus: paymentStatusFilter,
                shipmentStatus: shipmentStatusFilter,
                dateRange,
            };

            const res = await fetchOrdersApi(params, user.token);
            setOrders(res.orders);
            setTotalPages(res.totalPages);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    }, [user, page, search, paymentStatusFilter, shipmentStatusFilter, dateRange]);

    // Run fetchOrders on dependency change
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Mark as Delivered
    const markAsDelivered = async (orderId: string) => {
        if (!confirm('Mark this order as delivered?')) return;

        try {
            await markOrderAsDeliveredApi(orderId, user!.token);
            fetchOrders();
        } catch (error) {
            console.error('Failed to mark as delivered:', error);
        }
    };

    // Mark as Paid
    const markAsPaid = async (orderId: string) => {
        if (!confirm('Mark this order as paid?')) return;

        try {
            await markOrderAsPaidApi(orderId, user!.token);
            fetchOrders();
        } catch (error) {
            console.error('Failed to mark as paid:', error);
        }
    };

    // Delete Order
    const deleteOrder = async (orderId: string) => {
        if (!confirm('Are you sure you want to delete this order?')) return;

        try {
            await deleteOrderApi(orderId, user!.token);
            fetchOrders();
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    };

    return {
        orders,
        loading,
        page,
        totalPages,
        search,
        paymentStatusFilter,
        shipmentStatusFilter,
        dateRange,
        setSearch,
        setPaymentStatusFilter,
        setShipmentStatusFilter,
        setDateRange,
        setPage,
        markAsDelivered,
        markAsPaid,
        deleteOrder,
    };
};
