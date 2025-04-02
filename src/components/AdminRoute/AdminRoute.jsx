import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

// Composant qui permet de protéger les routes d'administration
function AdminRoute() {
  const { jeton } = useContext(AuthContext); //

  if (!jeton) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
}

export default AdminRoute;
