import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import SharePage from "./pages/SharePage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/share/:shareLink" element={<SharePage />} />
    </Routes>
    <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
}

export default App;
