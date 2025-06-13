import { Route, Routes } from "react-router-dom";
import User from "../pages/User";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/user" element={<User />} />
      </Route>
      <Route path="/*" element={<Register />} />
    </Routes>
  );
};
