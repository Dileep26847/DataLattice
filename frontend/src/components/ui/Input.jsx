function Input({

  label,

  name,

  value,

  onChange,

  type = "text",

  placeholder = "",

}) {

  return (

    <div className="space-y-2">

      {label && (

        <label className="font-medium text-gray-700">

          {label}

        </label>

      )}

      <input

        type={type}

        name={name}

        value={value}

        onChange={onChange}

        placeholder={placeholder}

        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"

      />

    </div>

  );

}

export default Input;