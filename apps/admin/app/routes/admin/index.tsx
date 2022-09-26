import { json, LoaderFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils";
import CreateMap from "../../mapUtils/map.client";
import { useLoaderData } from "@remix-run/react";
import Table from "utils/table";
import { useMemo } from "react";
import { weatherNode } from "database";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

const Fallback = () => {
  return <div>Loading IDE...</div>;
};
type LoaderData = {
  weatherNodes: weatherNode[];
  relayNodes: weatherNode[];
};
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const weatherNodesAll = await prisma.weatherNode.findMany({
    where: { isActive: true, userId },
  });

  const weatherNodes = weatherNodesAll.filter((x) => !x.isRelay);
  const relayNodes = weatherNodesAll.filter((x) => x.isRelay);
  return json<LoaderData>({ weatherNodes, relayNodes });
};
export default function AdminPage() {
  let nodeData = useLoaderData<LoaderData>();
  const columns = useMemo<{ name: keyof weatherNode }[]>(
    () => [
      {
        name: "name",
      },
      {
        name: "owner",
      },
      {
        name: "isActive",
      },
      {
        name: "type",
      },
      {
        name: "lon",
      },
      {
        name: "lat",
      },
      {
        name: "city",
      },
      {
        name: "country",
      },
    ],
    []
  );
  const AgeDisplay = (cellProps: any) => (
    <div className="text-right md:min-w-[200px]">{cellProps.cell.value}</div>
  );
  const data = useMemo(() => nodeData.weatherNodes, []);
  return (
    <div className="grid  grid-cols-1 w-full gap-4 md:m-4">
      <div className="flex-wrap flex max-w-full items-center justify-center md:justify-start flex-col md:flex-row  ">
        <InfoCard
          {...{
            title: "Number of Active Nodes",
            description: data.filter((node) => node.isActive).length,
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
      <div className="max-w-full flex items-center justify-center md:justify-start">
        <Table columns={columns} data={data} />
      </div>
      <div className="w-full">
        {nodeData.relayNodes.length > 0 && (
          <Table columns={columns} data={nodeData.relayNodes} />
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-start">
        <InfoCard
          {...{
            title: "Number of Relay Nodes",
            description: nodeData.relayNodes.length,
          }}
        />
      </div>

      <ClientOnly fallback={<Fallback />}>
        {() => <CreateMap></CreateMap>}
      </ClientOnly>
    </div>
  );
}
// built in background blur, not used
function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string | number;
}): JSX.Element {
  return (
    <div className="relative h-28 mb-4 max-w-full mr-4">
      {/* <div className="absolute md:w-80 h-28 justify-center bg-gradient-to-r from-gray-800 to-blue-500 blur-xl opacity-75 leading-none "></div> */}
      <div className="relative md:w-[320px] w-96 justify-center leading-none ">
        <div className="block p-6  h-28  rounded-lg border  shadow-2xl shadow-gray-400  bg-gray-800 border-gray-700 hover:bg-gray-700 text-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {title}
          </h5>
          <p className="font-normal text-gray-700 text-lg text-bold dark:text-gray-400">
            {description}
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
}
