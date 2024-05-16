import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const ErrorComp = ({ message }: { message: string }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 h-screen w-full z-50 backdrop-blur-sm bg-slate-700/30 flex items-center justify-center">
      <div className="bg-white rounded-md px-6 py-4">
        <h1>Sorry, something went wrong...</h1>
        <p className="font-bold">{message}</p>
        <Button onClick={() => navigate(-1)} style="w-fit mx-auto text-xs">
          &larr; Go Back
        </Button>
      </div>
    </div>
  );
};
