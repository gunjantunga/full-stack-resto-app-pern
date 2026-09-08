import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <AdminSidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <AdminHeader />
                {/* Main Content Area - Margined to accommodate fixed sidebar/header */}
                <main style={{ marginLeft: '260px', padding: '24px', flex: 1 }}>
                    <Outlet /> {/* This renders the nested routes like Dashboard, Restaurants, etc. */}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;