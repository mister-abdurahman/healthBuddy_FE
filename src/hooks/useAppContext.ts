import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useAppContext() {
  const context = useContext(AppContext);
  // if (context === "undefined") throw new Error("error");
  if (!context) throw new Error("error in app context");

  return context;
}
