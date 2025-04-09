import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-grow p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
