import { json, LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { weatherNode } from "database";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUser(request);
  const nodes = await prisma.weatherNode.findMany({
    where: {
      userId: user?.id,
    },
  });

  return json({ nodes });
};
export default function NotesPage() {
  const data = useLoaderData();
  return (
    <div>
      <main className="">
        <div className="flex flex-row justify-start items-center w-full h-24 border">
          <div className="text-black  text-5xl h-full px-10 pt-7 ">
            <Link to={"/admin/nodes"}>Nodes</Link>
          </div>
          <Link to={"create"} className="ml-auto">
            {" "}
            <div className="px-8  ">
              <div className="grid gap-8 items-start justify-center">
                <div className="relative group">
                  {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-600 via-slate-200 to-sky-600  rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div> */}
                  <button className="relative px-7 py-4 h-12 bg-sky-600 rounded-lg leading-none flex items-center ">
                    <span className="flex items-center space-x-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </span>
                    <span className="pl-6 text-white group-hover:text-gray-100 transition duration-200">
                      add new weather node &rarr;
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex bg-gray-900 h-screen">
          <div className="w-48 text-sm font-medium   bg-gray-700  text-white">
            {data.nodes.map((node: weatherNode) => {
              return (
                <Link
                  key={node.id}
                  to={`/admin/nodes/${node.id}`}
                  aria-current="true"
                  className="block py-2 px-4 w-full text-white  rounded-t-lg border-b border-gray-200 cursor-pointer hover:bg-gray-600 "
                >
                  {node.name}
                </Link>
              );
            })}
          </div>
          <div className=" flex-1 ">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
