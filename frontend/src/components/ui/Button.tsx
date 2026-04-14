import type { ReactNode } from "react";
import Loader from "./Loader";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  title: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-purple-dark text-offwhite-font",
  secondary: "bg-purple text-black",
};

const sizeStyles = {
  sm: "py-1 px-1 text-sm",
  md: "py-2 px-4 text-md",
  lg: "py-3 px-5 text-lg",
};

const iconStyles = {
  primary: "text-offwhite-font",
  secondary: "text-black",
};

const defaultStyles = "rounded-md cursor-pointer px-4 py-2 ";

const Button = (props: ButtonProps) => {
  const { variant, size, title, startIcon, endIcon, onClick, loading } = props;

  return (
    <button
      className={`${variantStyles[variant]} ${defaultStyles} ${
        sizeStyles[size]
      } ${loading ? "opacity-40 " : ""}`}
      disabled={loading}
      onClick={onClick}
    >
      <div className="flex items-center">
        {loading ? (
          <Loader />
        ) : (
          <>
            {startIcon ? (
              <div className={`${iconStyles[variant]}`}>{startIcon}</div>
            ) : null}
            <div className="pl-2 pr-2">{title}</div>
            {endIcon ? <div>{endIcon}</div> : null}
          </>
        )}
      </div>
    </button>
  );
};

export default Button;
