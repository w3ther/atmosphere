import { Form, Link, NavLink, Outlet } from "@remix-run/react";
import stylesHref from "leaflet/dist/leaflet.css";
import { useUser } from "~/utils";

import { useState } from "react";
import { LinksFunction } from "@remix-run/node";
export const links: LinksFunction = () => {
  return [
    // add a local stylesheet, remix will fingerprint the file name for
    // production caching
    { rel: "stylesheet", href: stylesHref },
  ];
};
export default function NotesPage() {
  const navLinks = [
    {
      key: ".",
      title: "Overview",
      emoji: "📝",
    },
    {
      key: "nodes",
      title: "Nodes",
      emoji: "📡",
    },
    {
      key: "data",
      title: "Data",
      emoji: "📊",
    },
    {
      key: "deploy",
      title: "Deploy",
      emoji: "🚀",
    },
    {
      key: "settings",
      title: "Settings",
      emoji: "⚙️",
    },
  ];
  const user = useUser();
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white ">
        <h1 className="text-3xl font-bold hidden md:inline">
          <Link to="/">Admin Demo</Link>
        </h1>
        <section className="MOBILE-MENU flex md:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>
          <div
            className={
              isNavOpen
                ? "flex absolute w-full h-screen top-0 left-0 bg-white z-10 flex-col justify-evenly items-center"
                : "hidden"
            }
          >
            {" "}
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <div className="h-full md:w-60 w-13 border-r bg-gray-50">
              <hr />

              {navLinks.length === 0 ? (
                <p className="p-4">No notes yet</p>
              ) : (
                <ol className="flex flex-col items-center justify-between ">
                  {navLinks.map((link) => (
                    <li key={link.key}>
                      <NavLink
                        className={({ isActive }) =>
                          `block border-b p-4 text-xl text-black min-h-[150px]${
                            isActive ? "bg-white" : ""
                          }`
                        }
                        to={link.key}
                      >
                        <span className="text-md"> {link.emoji} </span>{" "}
                        <span className="pl-2">{link.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </section>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white  ">
        <div className="h-full md:w-60 w-13 border-r bg-gray-50 hidden md:block">
          {/* <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Node
          </Link> */}

          <hr />

          <ol>
            {navLinks.map((link) => (
              <li key={link.key}>
                <NavLink
                  className={({ isActive }) =>
                    `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                  }
                  to={link.key}
                >
                  <span className="text-md"> {link.emoji} </span>{" "}
                  <span className="pl-2">{link.title}</span>
                </NavLink>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
