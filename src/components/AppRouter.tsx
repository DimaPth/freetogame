import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { privateRoutes, publicRoutes } from "../routes";

const AppRouter: FC = () => {
  const auth = false;
  return auth ? (
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
