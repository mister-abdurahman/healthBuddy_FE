import React from "react";

export const Card = ({
  style,
  children,
}: {
  style?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`mt-4 p-4 rounded-xl shadow-md ${style}`}>{children}</div>
  );
};
