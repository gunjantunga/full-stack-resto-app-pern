import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {
    LayoutDashboard,
    Store,
    Users,
    BookOpen,
    UtensilsCrossed,
    ClipboardList,
    LogOut
} from 'lucide-react';
import "../../styles/admin-style.css";

const AdminSidebar = () => {
    const menuItems = [
        { path: '/admin', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/admin/restaurants', name: 'Restaurants', icon: <Store size={20} /> },
        { path: '/admin/partners', name: 'Partners', icon: <Users size={20} /> },
        { path: '/admin/menu', name: 'Menu', icon: <BookOpen size={20} /> },
        { path: '/admin/items', name: 'Items', icon: <UtensilsCrossed size={20} /> },
        { path: '/admin/orders', name: 'Orders', icon: <ClipboardList size={20} /> },
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-logo-container">
                {/* Replace with your actual logo path */}
                <img src={logo} className="sidebar-logo" />
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {menuItems.map((item) => (
                        <li key={item.name} className="nav-item">
                            <NavLink
                                to={item.path}
                                end={item.path === '/admin'}
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;