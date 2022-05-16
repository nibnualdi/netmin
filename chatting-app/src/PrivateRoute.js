import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = Cookies.get("auth");

  return <>{auth ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoute;
