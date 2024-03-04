import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import Layout from "../components/Layout";
import { useContext } from "react";

const ProtectedRoute = ({ element }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    // Check if the user is not authenticated
    console.log("Not auth")
    return <Navigate to="/" />;
  }

  return <Layout element={element}/>;
};

export default ProtectedRoute;
