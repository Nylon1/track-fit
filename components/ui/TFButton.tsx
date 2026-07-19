"use client";

import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type TFButtonVariant =
  | "primary"
  | "secondary"
  | "ghost";

type TFButtonState =
  | "idle"
  | "loading"
  | "success";

type TFButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: TFButtonVariant;
    state?: TFButtonState;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
  };

export default function TFButton({
  children,
  variant = "primary",
  state = "idle",
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: TFButtonProps) {
  const isLoading = state === "loading";
  const isSuccess = state === "success";
  const isDisabled = disabled || isLoading;

  const variantClasses: Record<
    TFButtonVariant,
    string
  > = {
    primary: "tf-button-primary",
    secondary: "tf-button-secondary",
    ghost: "tf-button-ghost",
  };

  return (
    <button
      type="button"
      className={[
        "tf-button",
        variantClasses[variant],
        fullWidth ? "tf-button-full" : "",
        isLoading ? "tf-button-loading" : "",
        isSuccess ? "tf-button-success" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      <span className="tf-button-content">
        {isLoading ? (
          <>
            <span
              className="tf-button-loader"
              aria-hidden="true"
            />

            <span>Checking coverage</span>
          </>
        ) : isSuccess ? (
          <>
            <SuccessIcon />
            <span>Area covered</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span
                className="tf-button-icon"
                aria-hidden="true"
              >
                {leftIcon}
              </span>
            )}

            <span>{children}</span>

            {rightIcon && (
              <span
                className="tf-button-icon tf-button-icon-right"
                aria-hidden="true"
              >
                {rightIcon}
              </span>
            )}
          </>
        )}
      </span>
    </button>
  );
}

function SuccessIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 10.25L8.1 13.85L15.6 6.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}