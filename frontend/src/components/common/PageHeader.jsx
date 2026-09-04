function PageHeader({
  title,
  subtitle,
  action,
}) {

  return (

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

      <div>

        <h1 className="text-4xl font-black text-slate-800">

          {title}

        </h1>

        {subtitle && (

          <p className="text-slate-500 mt-2 text-lg">

            {subtitle}

          </p>

        )}

      </div>

      {action && (

        <div>

          {action}

        </div>

      )}

    </div>

  );

}

export default PageHeader;