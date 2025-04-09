import AdminLayout from "@/components/admin/AdminLayout";
import useAdminGuard, { useAuth } from "@/context/AuthContext";
import OrderFilters from "../../../components/admin/orders/OrderFilters";
import OrderTable from "../../../components/admin/orders/OrderTable";
import { useAdminOrders } from "../../../hooks/useAdminOrder";

const AdminOrdersPage = () => {
  const { user } = useAuth();
  useAdminGuard();

  const {
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
  } = useAdminOrders(user);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Orders Management</h1>

      <OrderFilters
        search={search}
        setSearch={setSearch}
        paymentStatusFilter={paymentStatusFilter}
        setPaymentStatusFilter={setPaymentStatusFilter}
        shipmentStatusFilter={shipmentStatusFilter}
        setShipmentStatusFilter={setShipmentStatusFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <>
          <OrderTable
            orders={orders}
            markAsPaid={markAsPaid}
            markAsDelivered={markAsDelivered}
            deleteOrder={deleteOrder}
          />

          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50">Prev</button>
            <span className="px-4 py-2">Page {page} of {totalPages}</span>
            <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50">Next</button>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminOrdersPage;
