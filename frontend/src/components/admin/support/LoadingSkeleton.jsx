function LoadingSkeleton() {

  return (

    <div className="space-y-6">

      {

        Array.from({ length: 6 }).map((_, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-6 animate-pulse border border-slate-100"
          >

            <div className="flex justify-between items-center">

              <div className="space-y-4 flex-1">

                <div className="h-5 w-56 bg-slate-200 rounded-full"></div>

                <div className="h-4 w-80 bg-slate-200 rounded-full"></div>

                <div className="flex gap-3 mt-4">

                  <div className="h-8 w-24 bg-slate-200 rounded-full"></div>

                  <div className="h-8 w-28 bg-slate-200 rounded-full"></div>

                </div>

              </div>

              <div className="h-12 w-28 bg-slate-200 rounded-2xl"></div>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default LoadingSkeleton;