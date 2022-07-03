import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getNoteListItems } from "~/models/note.server";
import Gun from "gun";
import { gun } from "utils";
type LoaderData = {
  resultKeys: string[];
};

// export const loader: LoaderFunction = async ({ request }) => {
//   let resultKeys: string[] = [];
//   await gun
//     .get("weatherNodes")
//     .map()
//     .on((data, id) => {
//       if (data) {
//         resultKeys.push(id);
//       }
//     });

//   return json<LoaderData>({ resultKeys });
// };

export default function NotesPage() {
  // const data = useLoaderData();
  // console.log("hhh", data);
  return (
    <div>
      <main>
        <div>
          <h1 className="text-black">Nodes</h1>
        </div>
        <div className="hidden flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
