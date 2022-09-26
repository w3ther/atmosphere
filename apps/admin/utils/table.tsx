import { Link } from "@remix-run/react";
import { weatherNode } from "database";

export default function Table({
  columns,
  data,
}: {
  columns: { name: string }[];
  data: weatherNode[];
}) {
  return (
    <div className="overflow-x-auto   max-w-[1000px]  flex rounded-lg">
      <table className="w-full text-sm text-left  text-gray-400 shadow-xl shadow-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th key={column.name} className="px-4 py-2">
                {column.name}
              </th>
            ))}

            <th scope="col" className="py-3 px-6">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <>
              <tr
                key={row.name}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {row.name}
                </th>
                <td className="py-4 px-4">{row.owner}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div
                      className={`${
                        row ? "bg-green-400" : "bg-red-500"
                      } h-2.5 w-2.5 rounded-full mr-2`}
                    ></div>{" "}
                    {row.isActive ? "Online" : "Offline"}
                  </div>
                </td>
                <td className="py-4 px-4">{row.type}</td>
                <td className="py-4 px-4">{row.lat}</td>
                <td className="py-4 px-4">{row.lon}</td>
                <td className="py-4 px-4">{row.city}</td>
                <td className="py-4 px-4">{row.country}</td>
                <td className="py-4 px-6 text-right">
                  <Link
                    to={`/admin/nodes/${row.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
