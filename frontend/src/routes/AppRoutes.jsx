import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/Login";
import UserSignUp from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoutes";
import AdminLayout from "../layouts/AdminLayout";
import AddNewRestaurant from "../pages/restaurants/AddNewRestaurant";
function AppRoutes() {

    return (
        <Routes>
            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/signup"
                element={<UserSignUp />}
            />

            {/* customer Routes */}
            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["customer"]}
                    />
                }
            >

                {/* <Route
                    element={<CustomerLayout />}
                > */}
                <Route
                    path="/customer"
                    element={<>Customer</>}
                />

                {/* </Route> */}

            </Route>

            {/* Restaurant Routes */}
            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["restaurant"]}
                    />
                }
            >

                {/* <Route
                    element={<CustomerLayout />}
                > */}
                <Route
                    path="/restaurant"
                    element={<>Restaurant</>}
                />

                {/* </Route> */}

            </Route>


            {/* Admin Route */}
            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["admin"]}
                    />
                }
            >

                <Route
                    element={<AdminLayout />}
                >

                    <Route
                        path="/admin"
                        element={<>Admin</>}
                    />
                    <Route
                        path="/admin/restaurants"
                        element={<><AddNewRestaurant /></>}
                    />

                </Route>

            </Route>

            {/* fallback */}
            <Route
                path="*"
                element={<LoginPage />}
            />
        </Routes>
    )
}

export default AppRoutes;