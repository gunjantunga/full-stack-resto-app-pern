import { useState } from "react";
import LoginPage from "./Login";
import UserSignUp from "./Register";
import "../../styles/login-signup.css";


function UserAuth() {
    const [login, setLogin] = useState(false);
    return (
        <div className="container">
            {login ? <LoginPage /> : <UserSignUp />}
            <div style={{ textAlign: "center" }}>
                <button className="button-link" onClick={() => setLogin(!login)}>{login ? "Do not have account? Signup" : "Already have account ? login"}</button>
            </div>
        </div>
    )
}

export default UserAuth;