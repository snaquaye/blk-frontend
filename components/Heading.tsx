import { ReactNode, ElementType } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export default function Heading({ 
  children, 
  level = 1, 
  className = "" 
}: HeadingProps) {
  const baseStyles = "font-bold text-black";
  
  const sizeStyles = {
    1: "text-5xl md:text-6xl font-black tracking-tight",
    2: "text-3xl md:text-4xl font-bold",
    3: "text-2xl md:text-3xl font-bold",
    4: "text-xl md:text-2xl font-semibold",
    5: "text-lg md:text-xl font-semibold",
    6: "text-base md:text-lg font-medium",
  };

  const Tag = `h${level}` as ElementType;

  return (
    <Tag className={`${baseStyles} ${sizeStyles[level]} ${className}`}>
      {children}
    </Tag>
  );
}
