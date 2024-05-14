import { createContext, useContext, useState } from "react";

const AppContext = createContext<{
  signedIn?: boolean;
  signInOut?: () => void;
  openHamburger?: boolean;
  toggleSideMenu?: () => void;
  closeHamburger?: () => void;
}>({});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);

  function signInOut() {
    setSignedIn((signin) => !signin);
  }
  function toggleSideMenu() {
    setOpenHamburger((openHamburger) => !openHamburger);
  }
  function closeHamburger() {
    setOpenHamburger(false);
  }

  return (
    <AppContext.Provider
      value={{
        signedIn,
        signInOut,
        openHamburger,
        toggleSideMenu,
        closeHamburger,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useAppContext() {
  const context = useContext(AppContext);
  // if (context === "undefined") throw new Error("error");
  if (!context) throw new Error("error in app context");

  return context;
}

export { AppProvider, useAppContext };
