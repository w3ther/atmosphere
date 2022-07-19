import { json, LoaderFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils";
import CreateMap from "../../mapUtils/map.client";
import { gun } from "utils";

const Fallback = () => {
  return <div>Loading IDE...</div>;
};
type LoaderData = {
  resultKeys: string[];
};
export const loader: LoaderFunction = async ({ request }) => {
  let resultKeys: string[] = [];

  await gun
    .get("weatherNodes")
    .map()
    .on((data, id) => {
      if (data) {
        resultKeys.push(id);
      }
    });
  console.log("resultKeys", resultKeys);
  return json<LoaderData>({ resultKeys });
};
export default function AdminPage() {
  return (
    <div className="md:p-10 grid-cols-1 ">
      <div className="flex  flex-col md:flex-row content-center justify-center">
        <InfoCard
          {...{
            title: "Number Of Active Nodes",
            description: "54",
          }}
        />
        <InfoCard
          {...{
            title: "Average Temperature",
            description: "96°F",
          }}
        />
        <InfoCard
          {...{
            title: "Unique Collections",
            description: "4 Collections",
          }}
        />
      </div>
      <ClientOnly fallback={<Fallback />}>
        {() => <CreateMap></CreateMap>}
      </ClientOnly>
    </div>
  );
}

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}): JSX.Element {
  return (
    <div className="m-2 md:w-80 justify-center ">
      <a
        href="#"
        className="block p-6  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </a>
    </div>
  );
}
