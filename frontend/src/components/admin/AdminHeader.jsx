import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import "../../styles/admin-style.css";

const AdminHeader = () => {
    return (
        <header className="admin-header">
            <div className="header-left">
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search orders, restaurants..." />
                </div>
            </div>

            <div className="header-right">
                <button className="icon-btn notification-btn">
                    <Bell size={20} />
                    <span className="notification-badge">3</span>
                </button>

                <div className="admin-profile">
                    <div className="avatar">
                        <User size={20} />
                    </div>
                    <div className="profile-info">
                        <span className="profile-name">Admin User</span>
                        <span className="profile-role">Super Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;