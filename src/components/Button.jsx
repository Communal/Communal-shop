import React from "react";
import { cn } from "../utils/cn";

// No TypeScript interfaces here — just props via destructuring
const Button = React.forwardRef(
  (
    {
      className,
      disabled,
      children,
      variant = "default",
      size = "base",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        {...props}
        className={cn("button relative text-sm", className, variant, size)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
