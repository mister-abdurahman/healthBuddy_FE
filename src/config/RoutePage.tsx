import { Route, Routes } from "react-router-dom";
import RouteConfig from "./RouteConfig";

const RoutePage = () => {
  return (
    <Routes>
      {RouteConfig.map((route, index) => (
        <Route key={index} path={route.path} element={route.element()} />
      ))}
    </Routes>
  );
};

export default RoutePage;
