import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const PageContainer = ({
  children,
  title,
  backBtn = true,
  style,
}: {
  children: React.ReactNode;
  title: string;
  backBtn?: boolean;
  style?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className={style}>
      {backBtn && (
        <span>
          <FaArrowCircleLeft
            className="fill-secondary w-8 h-8"
            onClick={() => navigate(-1)}
          />
        </span>
      )}
      <p className="text-2xl font-semibold mt-4">{title}</p>
      {children}
    </div>
  );
};
