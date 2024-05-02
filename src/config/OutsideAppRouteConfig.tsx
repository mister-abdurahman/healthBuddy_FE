import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

type RouteItem = {
  path: string;
  element: () => React.ReactNode;
  id: string;
};

const OutsideAppRouteConfig: RouteItem[] = [
  {
    id: "signup",
    path: "signup",
    element: () => <SignUp />,
  },
  {
    id: "signin",
    path: "signin",
    element: () => <SignIn />,
  },
  {
    id: "/",
    path: "/",
    element: () => <SignIn />,
  },
];

export default OutsideAppRouteConfig;
