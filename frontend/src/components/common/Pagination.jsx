function Pagination({

  currentPage,

  totalPages,

  onPageChange,

}) {

  if (totalPages <= 1) return null;

  return (

    <div className="flex justify-end items-center gap-2 mt-8">

      <button

        disabled={currentPage===1}

        onClick={()=>onPageChange(currentPage-1)}

        className="px-4 py-2 rounded-xl border disabled:opacity-50"

      >

        Prev

      </button>

      {

        [...Array(totalPages)].map((_,index)=>(

          <button

            key={index}

            onClick={()=>onPageChange(index+1)}

            className={`w-10 h-10 rounded-xl ${
              currentPage===index+1
              ? "bg-cyan-600 text-white"
              : "border"
            }`}

          >

            {index+1}

          </button>

        ))

      }

      <button

        disabled={currentPage===totalPages}

        onClick={()=>onPageChange(currentPage+1)}

        className="px-4 py-2 rounded-xl border disabled:opacity-50"

      >

        Next

      </button>

    </div>

  );

}

export default Pagination;