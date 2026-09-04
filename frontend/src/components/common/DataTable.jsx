function DataTable({
  columns = [],
  data = [],
  renderActions,
  emptyMessage = "No Data Found",
}) {

  return (

    <div className="overflow-x-auto rounded-3xl border border-slate-200">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            {columns.map((column) => (

              <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase"
              >
                {column.label}
              </th>

            ))}

            {renderActions && (

              <th className="px-6 py-4 text-center text-sm font-bold text-slate-700 uppercase">

                Actions

              </th>

            )}

          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>

              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="text-center py-16 text-slate-500"
              >

                {emptyMessage}

              </td>

            </tr>

          ) : (

            data.map((row, index) => (

              <tr
                key={row.id || index}
                className="border-t hover:bg-slate-50 transition"
              >

                {columns.map((column) => (

                  <td
                    key={column.key}
                    className="px-6 py-5 text-slate-700"
                  >

                    {column.render
                      ? column.render(row)
                      : row[column.key]}

                  </td>

                ))}

                {renderActions && (

                  <td className="px-6 py-5 text-center">

                    {renderActions(row)}

                  </td>

                )}

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}

export default DataTable;