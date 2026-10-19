import { Navigate } from "react-router";

const PrivateRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
