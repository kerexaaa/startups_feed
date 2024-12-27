import { twMerge } from "tailwind-merge";

interface ButtonProps {
  type?: "submit" | "button" | "reset" | undefined;
  className?: string;
  children: React.ReactNode;
  onClick?(): void;
  disabled?: boolean;
}

const Button = ({
  className,
  children,
  onClick,
  type,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        `outline-none cursor-pointer text-xl font-semibold font-worksans`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
