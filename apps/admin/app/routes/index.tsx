import { Link } from "@remix-run/react";
import stylesHref from "leaflet/dist/leaflet.css";
import { useOptionalUser } from "~/utils";
import type { LinksFunction } from "@remix-run/node";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="relative minh-screen bg-white flex flex-col items-center justify-center">
      <div className="lg:relative shadow-xl sm:overflow-hidden sm:rounded-2xl  lg:min-h-max">
        <div className="absolute inset-0">
          <img
            className=" h-full w-full object-cover"
            src="hurricane2.webp"
            alt="BB King playing blues on his Les Paul guitar"
          />
          <div className="absolute inset-0 bg-[color:rgba(121,121,121,0.5)] mix-blend-multiply" />
        </div>
        <div className="lg:pb-18 relative pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
          <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl lg:px-40">
            <span className="block uppercase text-white drop-shadow-md ">
              W3ther
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
            Weather data and analytics for all
          </p>
          <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
            {user ? (
              <Link
                to="/admin"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
              >
                View nodes for {user.email}
              </Link>
            ) : (
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <Link
                  to="/join"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600  "
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
