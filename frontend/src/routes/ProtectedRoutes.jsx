import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth-store";
import userDetails from "../store/user-store";

function ProtectedRoute({ allowedRoles = [] }) {

    // For now, get authentication information
    // from localStorage.

    let token = useAuthStore((state) => state.accessToken)
    let user = userDetails((state) => state.user);
    // User is not logged in
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // If roles are provided, check user's role
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
    ) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;