import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";

export interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "dark" | "link";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
  id?: string;
  "aria-label"?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  id,
  "aria-label": ariaLabel,
}: ButtonProps) {
  if (variant === "link") {
    return (
      <Link
        href={href}
        onClick={onClick}
        id={id}
        aria-label={ariaLabel}
        className={`inline-flex items-center text-[var(--ink)] underline underline-offset-4 font-medium transition-colors duration-200 hover:text-[var(--orange-strong)] ${className}`}
      >
        {children}
      </Link>
    );
  }

  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full select-none cursor-pointer transition-[background-color,transform,box-shadow] duration-200 active:scale-[0.97]";

  const sizeStyles =
    size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm md:text-base";

  const variantStyles =
    variant === "primary"
      ? "bg-[var(--orange)] text-[var(--on-orange)] hover:bg-[var(--orange-strong)] group"
      : "bg-[var(--ink)] text-[var(--bg)] hover:opacity-90";

  return (
    <Link
      href={href}
      onClick={onClick}
      id={id}
      aria-label={ariaLabel}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
    >
      <span>{children}</span>
      {variant === "primary" && (
        <ArrowRight
          size={18}
          className="ml-2 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
