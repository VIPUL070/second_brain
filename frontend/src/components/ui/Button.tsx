import type {ReactNode } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary",
  size: "sm" | "md" | "lg",
  text: string,
  startIcon?: ReactNode,
  endIcon?: ReactNode,
  onClick?: () => void

}

const Button = (props: ButtonProps) => {
  const {variant,size,text,startIcon,onClick} = props;

  return (
    <button  onClick={onClick}>
      {text}
    </button>
  )
}

export default Button;