function ProgressBar({ progress = 0 }) {

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

      <div className="flex justify-between mb-3">

        <span className="font-semibold">

          Course Progress

        </span>

        <span>

          {progress}%

        </span>

      </div>

      <div className="w-full h-4 bg-slate-200 rounded-full">

        <div

          className="bg-cyan-600 h-4 rounded-full"

          style={{

            width: `${progress}%`

          }}

        />

      </div>

    </div>

  );

}

export default ProgressBar;