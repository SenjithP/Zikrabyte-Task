import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function UserPrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("userData") ? true : false;
  return isAuthenticated ? <>{children}</> : <Navigate to="/userLogin" />;
}

UserPrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserPrivateRoute;
