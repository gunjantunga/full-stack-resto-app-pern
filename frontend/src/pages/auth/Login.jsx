import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth-store";
import userDetails from "../../store/user-store";
import { notify } from "../../components/Toast/ToastConfig";

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [formDataError, setFormDataError] = useState({});
    const navigate = useNavigate();
    let setAccessToken = useAuthStore((state) => state.setAccessToken);
    let setUser = userDetails((state) => state.setUser);
    let user = userDetails((state) => state.user);
    const validateForm = () => {

        let error = {};
        let formIsValid = true;

        if (!email) {
            error.email = "Email is required";
            formIsValid = false;
        }
        if (!password) {
            error.password = "Password is required";
            formIsValid = false;
        }

        setFormDataError(error);
        return formIsValid;

    }

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            let response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password, role: user.role })
            })
            if (response.ok) {
                let result = await response.json();
                setAccessToken(result.accessToken);
                setUser(result.data);
                // 2. Redirect dynamically based on the user's role
                const role = result.data.role;
                if (role === 'admin') {
                    navigate("/admin");
                } else if (role === 'restaurant') {
                    navigate("/restaurant");
                } else if (role === 'partner') {
                    navigate("/partner");
                } else {
                    navigate("/customer");
                }
            }
            if (!response.ok) {
                let result = await response.json();
                notify.error(result.message)
            }
        } catch (err) {
            console.error('Error', err);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="auth-split-layout">
            {/* Left Side: 60% Image */}
            <div className="auth-image-section"></div>

            {/* Right Side: 40% Form */}
            <div className="auth-form-section">
                <div className="auth-container">
                    <h2>User Login</h2>

                    <div className="auth-form">
                        <Input
                            label="Email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={formDataError?.email}
                        />

                        <Input
                            label="Password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={formDataError?.password}
                        />
                    </div>

                    <div className="auth-button">
                        <Button disabled={loading} onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button className="button-link" onClick={() => navigate("/signup")}>
                            Do not have account? Signup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;