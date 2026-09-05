import AppRoutes from "./routes/AppRoutes";
import "./styles/login-signup.css";

function App() {

  return (
    <div>
      <h2>Yumazing</h2>
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        <AppRoutes />
      </div>
    </div>
  )
}

export default App
