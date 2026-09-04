function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
}) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",

    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",

    success:
      "bg-green-600 text-white hover:bg-green-700 shadow-sm",

    danger:
      "bg-red-600 text-white hover:bg-red-700 shadow-sm",

    outline:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",

    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100",

    accent:
      "bg-cyan-600 text-white hover:bg-cyan-700 shadow-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-4
        py-2.5
        text-sm
        font-semibold
        transition-all
        duration-200
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant] || variants.primary}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;