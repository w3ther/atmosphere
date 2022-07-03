import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { deleteNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { gun } from "utils";
export type WeatherData = {
  temperature: number;
  windSpeed: number;
  longLat: [number, number];
  updatedAt: number;
};
type LoaderData = {
  weatherDataArray: Array<WeatherData>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.nodeId, "noteId not found");
  const weatherDataArray = new Array<WeatherData>();

  await gun
    .get("weatherNodes")
    .get(params.nodeId)
    .map()
    .on((data) => {
      if (data) {
        const weatherData = {} as WeatherData;
        weatherData.temperature =
          data.temperature === 0 || data.temperature ? data.temperature : null;
        weatherData.windSpeed =
          data.windSpeed === 0 || data.windSpeed ? data.windSpeed : null;
        weatherData.updatedAt =
          data.updatedAt === 0 || data.updatedAt ? data.updatedAt : null;
        weatherDataArray.push(weatherData);
      }
    });
  // sort weatherDataArray by updatedAt which is a millisecond timestamp
  weatherDataArray.sort((a, b) => {
    return b.updatedAt - a.updatedAt;
  });
  return json<LoaderData>({ weatherDataArray });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.nodeId, "noteId not found");

  await deleteNote({ userId, id: params.nodeId });

  return redirect("/admin");
};

export default function NoteDetailsPage() {
  // const data = useLoaderData() as LoaderData;

  return (
    <div>
      {/* {data.weatherDataArray.length === 0 ? (
        <p className="p-4">No weather data yet</p>
      ) : (
        <ol className="w-full bg-white border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-gray-600 dark:text-white">
          {data.weatherDataArray.map((weatherData, i) => (
            <li
              key={`${weatherData.updatedAt}${weatherData.temperature}${weatherData.windSpeed}`}
              className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"
            >
              <p>{i + 1}.</p>
              <p className="py-6">Temperature: {weatherData.temperature}</p>
              <p className="py-6">Windspeed: {weatherData.windSpeed}</p>
              <p className="py-6">
                Updated At:{" "}
                {new Date(weatherData.updatedAt).toLocaleTimeString()}
              </p>
              <br />
            </li>
          ))}
        </ol>
      )} */}

      <hr className="my-4" />
      {/* <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form> */}
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
