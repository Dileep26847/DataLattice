function Card({
  title,
  subtitle,
  children,
  action,
  className = "",
}) {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-100
        hover:shadow-xl
        transition-all
        duration-300
        p-6
        ${className}
      `}
    >
      {(title || action) && (
        <div className="flex items-start justify-between mb-6">

          <div>

            {title && (
              <h2 className="text-2xl font-black text-slate-800">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="text-slate-500 mt-2">
                {subtitle}
              </p>
            )}

          </div>

          {action}

        </div>
      )}

      {children}

    </div>
  );
}

export default Card;