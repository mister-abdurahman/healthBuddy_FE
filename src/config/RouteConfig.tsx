type RouteItem = {
  path: string;
  element: () => React.ReactNode;
  id: string;
};

const RouteConfig: RouteItem[] = [
  // {
  //   id: "dashboard",
  //   path: "/",
  //   element: () => <div>Dashboard</div>,
  // },
  {
    id: "dashboard",
    path: "/dashboard",
    element: () => <div>Dashboard</div>,
  },
];

export default RouteConfig;
