import clsx from "clsx";

export const Variants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

const Button = ({
  variant = Variants.PRIMARY,
  type = "button",
  onClick,
  leftIcon,
  rightIcon,
  children,
  className,
}) => {
  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "cursor-pointer flex items-center rounded py-1 border shadow-sm transition-all hover:text-rose-600 hover:shadow-md",
        className,
        !leftIcon && "pl-2",
        !rightIcon && "pr-2",
        variant === Variants.PRIMARY && "bg-rose-50 border-rose-50",
        variant === Variants.SECONDARY &&
          "text-gray-800 bg-white border-gray-100 hover:bg-rose-50 hover:border-rose-600"
      )}
    >
      {LeftIcon && <LeftIcon size={"1.5rem"} />}
      <span>{children}</span>
      {RightIcon && <RightIcon size={"1.5rem"} />}
    </button>
  );
};

export default Button;
