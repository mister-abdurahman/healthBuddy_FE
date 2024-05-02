import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  // load authenticated user
  const [isAuthenticated] = useState(true);
  // if no auth user, redirect to /login

  // call navigate hook inside a fn, thats why we used useEffect.
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate]
  );

  // while loading, show spinner
  //   if (isLoading)
  //     return (
  //       <FullPage>
  //         <Spinner />{" "}
  //       </FullPage>
  //     );

  // if authenticated, render app
  if (isAuthenticated) return children;
};
