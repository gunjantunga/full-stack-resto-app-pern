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
                <main style={{ marginLeft: '260px', padding: '24px', flex: 1 }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;