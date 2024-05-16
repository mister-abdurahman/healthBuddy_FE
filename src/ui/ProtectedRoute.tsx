import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Data/State/store";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  // const user = useSelector((state: RootState) => state.user.userDetails);
  const signedIn = useSelector((state: RootState) => state.auth.isSignIn);

  useEffect(
    function () {
      if (!signedIn) navigate("/signin");
    },
    [signedIn, navigate]
  );

  // while loading, show spinner
  //   if (isLoading)
  //     return (
  //       <FullPage>
  //         <Spinner />{" "}
  //       </FullPage>
  //     );

  // if authenticated, render app
  if (signedIn) return children;
};
