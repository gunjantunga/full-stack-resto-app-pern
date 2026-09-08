import AppRoutes from "./routes/AppRoutes";
import "./styles/login-signup.css";
import { useEffect } from "react";
import useAuthStore from "./store/auth-store";
import userDetails from "./store/user-store";
import { ToastSetup } from "./components/Toast/ToastConfig";

function App() {

  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const setCheckingAuth = useAuthStore((state) => state.setCheckingAuth);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = userDetails((state) => state.setUser);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch("http://localhost:8000/refresh", {
          method: "POST",
          credentials: "include"
        });

        if (response.ok) {
          let result = await response.json();
          setAccessToken(result.accessToken);
          setUser(result.data);
        }
      } catch (error) {
        console.error("Session expired or no valid cookie found");
      } finally {
        setCheckingAuth(false);
      }
    };

    verifySession();
  }, []);

  // BLOCK THE ROUTER FROM RENDERING UNTIL THE CHECK IS DONE
  if (isCheckingAuth) {
    return <div style={{ display: "flex", justifyContent: "center" }}>Loading...</div>;
  }

  return (
    <div>
      {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
      <ToastSetup />
      <AppRoutes />
      {/* </div> */}
    </div>
  )
}

export default App;
