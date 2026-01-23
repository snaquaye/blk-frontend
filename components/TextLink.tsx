import Link from "next/link";
import { ReactNode } from "react";

interface TextLinkProps {
  children: ReactNode;
  href: string;
  variant?: "default" | "button" | "subtle";
  className?: string;
}

export default function TextLink({ 
  children, 
  href, 
  variant = "default",
  className = "" 
}: TextLinkProps) {
  const baseStyles = "inline-block transition-colors";
  
  const variantStyles = {
    default: "text-black hover:opacity-70 underline-offset-2 hover:underline",
    button: "px-6 py-2 border border-black text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-white",
    subtle: "text-gray-600 hover:text-black",
  };

  return (
    <Link 
      href={href} 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
