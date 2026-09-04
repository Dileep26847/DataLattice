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
      "bg-cyan-600 hover:bg-cyan-700 text-white",

    secondary:
      "bg-slate-700 hover:bg-slate-800 text-white",

    success:
      "bg-green-600 hover:bg-green-700 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    outline:
      "border border-cyan-600 text-cyan-600 hover:bg-cyan-50",

  };

  return (

    <button

      type={type}

      onClick={onClick}

      disabled={disabled}

      className={`

        px-5

        py-3

        rounded-xl

        font-semibold

        transition-all

        duration-200

        disabled:opacity-50

        disabled:cursor-not-allowed

        ${variants[variant]}

        ${className}

      `}

    >

      {children}

    </button>

  );

}

export default Button;