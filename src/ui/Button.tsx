import { ReactNode } from "react";

export const Button = ({
  children,
  style,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  style?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-secondary text-secondary_light font-semibold px-5 py-2 rounded-md shadow-md ${style}`}
    >
      {children}
    </button>
  );
};
