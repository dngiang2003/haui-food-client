import { Navigate } from "react-router-dom";
import config from "~/config";
import { getLocalStorageItem } from "~/utils/localStorage";

const ProtectedRoute = ({ children }) => {
  const isLogin = getLocalStorageItem("user");

  if (!isLogin) {
    return <Navigate to={config.routes.forbidden} replace />;
  }

  return children;
};

export default ProtectedRoute;
