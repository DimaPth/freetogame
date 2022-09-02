import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Home from "../pages/Home/Home";
import { privateRoutes, publicRoutes } from "../routes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../redux/slices/userSlice";

const AppRouter: FC = () => {
  const { isAuth } = useAuth();
  const dispatch = useDispatch();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setUser({
          username: user.displayName,
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        })
      );
    } else {
      removeUser();
    }
  });

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Home />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
