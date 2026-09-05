import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formDataError, setFormDataError] = useState({});
    const navigate = useNavigate();

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

    const handleLogin = () => {
        if (!validateForm()) return;
    }

    return (
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
                <Button onClick={handleLogin}>
                    Login
                </Button>
            </div>
            <div style={{ textAlign: "center" }}>
                <button className="button-link" onClick={() => navigate("/signup")}>Do not have account? Signup</button>
            </div>
        </div>
    )
}
export default LoginPage;