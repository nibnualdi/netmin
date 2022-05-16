import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = Cookies.get("auth");

  const url = window.location.href.split("home:")[1]
  let user = url.includes("%20") ? url.replace("%20", " ") : url

  return <>{auth === user ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoute;
