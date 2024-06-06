import { Routes, Route } from "react-router-dom";
import RegistrationPage from "../Pages/RegisterPage/RegistrationPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import HomePage from "../Pages/HomePage/HomePage";
import UserPrivateRoute from "../Components/UserPrivateRoute";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/userRegister" element={<RegistrationPage />} />
        <Route path="/userLogin" element={<LoginPage />} />
        <Route
          path="/userHome"
          element={
            <UserPrivateRoute>
              <HomePage />
            </UserPrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AllRoutes;
