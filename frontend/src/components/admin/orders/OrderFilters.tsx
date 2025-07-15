import React, { Dispatch, SetStateAction } from 'react';

// Define the types for your props
interface OrderFiltersProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  paymentStatusFilter: string;
  setPaymentStatusFilter: Dispatch<SetStateAction<string>>;
  shipmentStatusFilter: string;
  setShipmentStatusFilter: Dispatch<SetStateAction<string>>;
  dateRange: string;
  setDateRange: Dispatch<SetStateAction<string>>;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  search,
  setSearch,
  paymentStatusFilter,
  setPaymentStatusFilter,
  shipmentStatusFilter,
  setShipmentStatusFilter,
  dateRange,
  setDateRange,
}) => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <input
      type="text"
      placeholder="Search by order ID/email..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border px-4 py-2 rounded w-full md:w-1/3"
    />

    <select
      value={paymentStatusFilter}
      onChange={(e) => setPaymentStatusFilter(e.target.value)}
      className="border px-4 py-2 rounded w-full md:w-1/6"
    >
      <option value="">Payment Status</option>
      <option value="paid">Paid</option>
      <option value="unpaid">Unpaid</option>
    </select>

    <select
      value={shipmentStatusFilter}
      onChange={(e) => setShipmentStatusFilter(e.target.value)}
      className="border px-4 py-2 rounded w-full md:w-1/6"
    >
      <option value="">Shipment Status</option>
      <option value="delivered">Delivered</option>
      <option value="pending">Pending</option>
    </select>

    <select
      value={dateRange}
      onChange={(e) => setDateRange(e.target.value)}
      className="border px-4 py-2 rounded w-full md:w-1/6"
    >
      <option value="7d">Last 7 Days</option>
      <option value="30d">Last 30 Days</option>
      <option value="all">All Time</option>
    </select>
  </div>
);

export default OrderFilters;
