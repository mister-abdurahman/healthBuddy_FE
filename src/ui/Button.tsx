import React, { ReactNode } from "react";

export const Button = ({
  children,
  style,
  onClick,
}: {
  children: ReactNode;
  style?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-secondary text-secondary_light font-semibold px-5 py-2 rounded-md shadow-md ${style}`}
    >
      {children}
    </button>
  );
};
