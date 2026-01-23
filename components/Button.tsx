import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({ 
  children, 
  href,
  onClick,
  variant = "outline", 
  size = "md",
  className = "",
  type = "button",
  disabled = false
}: ButtonProps) {
  const baseStyles = "inline-block font-medium uppercase tracking-wider transition-colors";
  
  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800 border border-black",
    secondary: "bg-gray-100 text-black hover:bg-gray-200 border border-gray-200",
    outline: "bg-transparent text-black border border-black hover:bg-black hover:text-white",
  };

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2 text-xs",
    lg: "px-8 py-3 text-sm",
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${combinedStyles} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
