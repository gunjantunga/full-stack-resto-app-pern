import Input from "../../components/Input";
import Button from "../../components/Button";
import Textarea from "../../components/Textarea";
import RoleSelect from "../../components/RoleSelect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userDetails from "../../store/user-store";
import { notify } from "../../components/Toast/ToastConfig";

function UserSignUp() {

    const [userSignupData, setUserSignupData] = useState({
        name: "",
        email: '',
        password: "",
        phone: "",
        address: "",
        role: "customer"
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formDataError, setFormDataError] = useState({});
    let setUser = userDetails((state) => state.setUser);

    const validateForm = () => {

        let error = {};
        let formIsValid = true;

        if (!userSignupData.name) {
            error.name = "Name is required";
            formIsValid = false;
        }
        if (!userSignupData.email) {
            error.email = "Email is required";
            formIsValid = false;
        }
        if (!userSignupData.password) {
            error.password = "Password is required";
            formIsValid = false;
        }

        if (!userSignupData.address) {
            error.address = "Address is required";
            formIsValid = false;
        }

        if (!userSignupData.phone) {
            error.phone = "Phone Number is required";
            formIsValid = false;
        }
        if (!userSignupData.role) {
            error.role = "Role is required";
            formIsValid = false;
        }


        setFormDataError(error);
        return formIsValid;

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserSignupData({
            ...userSignupData,
            [name]: value
        })
    }
    const handleSignup = async () => {
        if (!validateForm()) return;
        setLoading(true);
        let body = {
            name: userSignupData.name,
            email: userSignupData.email,
            password_hash: userSignupData.password,
            phone: userSignupData.phone,
            address: userSignupData.address,
            role: userSignupData.role
        }
        try {
            let response = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                setUserSignupData({
                    name: "",
                    email: '',
                    password: "",
                    phone: "",
                    address: "",
                    role: "customer"
                })
                setUser({ email: userSignupData.email, role: userSignupData.role })
                navigate("/login")
            }
            if (!response.ok) {
                let result = await response.json();
                notify.error(result.message)
            }
        } catch (error) {
            console.error(error);
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
                <div className="signup-container">
                    <h2>User Signup</h2>

                    <div className="signup-form">
                        <Input
                            label="Name"
                            placeholder="User name"
                            type="text"
                            value={userSignupData.name}
                            name="name"
                            onChange={handleInputChange}
                            error={formDataError?.name}
                        />

                        <Input
                            label="Email"
                            placeholder="Email"
                            type="email"
                            value={userSignupData.email}
                            name="email"
                            onChange={handleInputChange}
                            error={formDataError?.email}
                        />

                        <Input
                            label="Password"
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={userSignupData.password}
                            onChange={handleInputChange}
                            error={formDataError?.password}
                        />

                        <Input
                            label="Phone"
                            placeholder="Phone no."
                            type="tel"
                            name="phone"
                            value={userSignupData.phone}
                            onChange={handleInputChange}
                            error={formDataError?.phone}
                        />

                        <div className="role-wrapper">
                            <RoleSelect
                                value={userSignupData.role}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="address-wrapper">
                            <Textarea
                                label="Address"
                                placeholder="Address"
                                type="text"
                                name="address"
                                value={userSignupData.address}
                                onChange={handleInputChange}
                                error={formDataError?.address}
                            />
                        </div>
                    </div>

                    <div className="signup-button">
                        <Button disabled={loading} onClick={handleSignup}>
                            Sign Up
                        </Button>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button className="button-link" onClick={() => navigate("/login")}>
                            Already have account ? Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSignUp;