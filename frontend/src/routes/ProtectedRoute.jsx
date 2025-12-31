import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("primetradeaitoken");
  return token ? children : <Navigate to="/login" />;
}
