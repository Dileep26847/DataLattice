function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
}) {

  const variants = {
    primary:
      "bg-cyan-600 hover:bg-cyan-700 text-white",

    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-800",

    success:
      "bg-emerald-600 hover:bg-emerald-700 text-white",

    danger:
      "bg-rose-600 hover:bg-rose-700 text-white",

    outline:
      "border border-slate-300 hover:bg-slate-100 text-slate-700",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-2xl
        font-semibold
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;