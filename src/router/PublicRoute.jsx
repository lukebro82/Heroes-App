import { useContext } from "react";
import { AuthContext } from "../auth";
import { Navigate } from "react-router";

export const PublicRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);

  return logged ? <Navigate to="/marvel" /> : children;
};
