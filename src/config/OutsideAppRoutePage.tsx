import { Route, Routes } from "react-router-dom";
import OutsideAppRouteConfig from "./OutsideAppRouteConfig";

const OutsideAppRoutePage = () => {
  return (
    <Routes>
      {OutsideAppRouteConfig.map((route, index) => (
        <Route key={index} path={route.path} element={route.element()} />
      ))}
    </Routes>
  );
};

export default OutsideAppRoutePage;
