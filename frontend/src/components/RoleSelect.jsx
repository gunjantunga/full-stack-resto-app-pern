import React from "react";
import "../styles/form.css";
function RoleSelect({ value, onChange, error }) {
    return (
        <div className="role-field">
            <label htmlFor="role">Account Type</label>

            <div className="role-select-wrapper">
                <select
                    id="role"
                    name="role"
                    value={value}
                    onChange={onChange}
                    className="role-select"
                >
                    <option value="customer">Customer</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="partner">Delivery Partner</option>
                </select>

                <span className="role-arrow">⌄</span>
            </div>

        </div>
    );
}

export default RoleSelect;