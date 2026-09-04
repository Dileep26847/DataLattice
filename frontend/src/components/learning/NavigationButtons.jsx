function NavigationButtons({

  previousLesson,

  nextLesson,

  setSelectedLesson,

}) {

  return (

    <div className="flex justify-between mt-8">

      <button

        disabled={!previousLesson}

        onClick={() => setSelectedLesson(previousLesson)}

        className="px-8 py-3 rounded-xl bg-slate-200 disabled:opacity-40"

      >

        ← Previous

      </button>

      <button

        disabled={!nextLesson}

        onClick={() => setSelectedLesson(nextLesson)}

        className="px-8 py-3 rounded-xl bg-cyan-600 text-white disabled:opacity-40"

      >

        Next →

      </button>

    </div>

  );

}

export default NavigationButtons;