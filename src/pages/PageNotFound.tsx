import React from "react";
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-bold">404</h2>
        <p className="">Oops, Page not found</p>
        <p className="underline text-secondary" onClick={() => navigate(-1)}>
          &larr; Go back to App
        </p>
      </div>
    </div>
  );
};
