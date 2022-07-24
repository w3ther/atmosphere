import { json, LoaderFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils";
import CreateMap from "../../mapUtils/map.client";
import { useLoaderData } from "@remix-run/react";
import Table from "utils/table";
import { useMemo } from "react";
import { weatherNode } from "database";

const getData = (): weatherNode[] => [
  {
    name: "Apollo 1",
    userId: "1",
    owner: "W3ther",
    id: "1",
    city: "College Park",
    country: "USA",
    type: "eagle",
    lat: 33.6534,
    lon: 84.4494,
    timezone: "EST",
    isActive: true,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
];

const Fallback = () => {
  return <div>Loading IDE...</div>;
};
type LoaderData = {
  numberOfActiveNodes: number;
  numberOfRelayNodes: number;
};
export const loader: LoaderFunction = async () => {
  const numberOfActiveNodes = 56;
  const numberOfRelayNodes = 4;

  // await gun
  //   .get("weatherNodes")
  //   .map()
  //   .on((data, id) => {
  //     if (data) {
  //       resultKeys.push(id);
  //     }
  //   });
  // console.log("resultKeys", resultKeys);
  return json<LoaderData>({ numberOfActiveNodes, numberOfRelayNodes });
};
export default function AdminPage() {
  let nodeDate = useLoaderData<LoaderData>();
  const columns = useMemo(
    () => [
      {
        name: "Name",
      },
      {
        name: "Owner",
      },
      {
        name: "Status",
      },
      {
        name: "Type",
      },

      // {
      //   Header: "Status",
      //   accessor: "status",
      //   Cell: StatusPill,
      // },
      // {
      //   Header: (prop: any) => <h1 className="text-right">Type</h1>,
      //   accessor: "type",

      //   Cell: (cellProps: JSX.IntrinsicAttributes) => (
      //     <AgeDisplay {...cellProps} />
      //   ),
      //   minWidth: 200,
      //   width: 200,
      // },
    ],
    []
  );
  const AgeDisplay = (cellProps: any) => (
    <div className="text-right md:min-w-[200px]">{cellProps.cell.value}</div>
  );
  const data = useMemo(() => getData(), []);
  return (
    <div className=" grid grid-cols-1 max-w-full gap-4 rid-flow-row">
      <div className="flex flex-col flex-wrap md:flex-row content-center justify-start ">
        <div className=" w-full flex justify-start items-center mb-6">
          <div className="h-full  overflow-hidden ">
            {/* <h3 className="text-xl">Node Summary</h3> */}
            <div className="flex-wrap flex md:flex-row sm:flex-col justify-start">
              <div className="">
                <InfoCard
                  {...{
                    title: "Number of Active Nodes",
                    description: data.filter((node) => node.isActive).length,
                  }}
                />
                <div className="grow">
                  <Table columns={columns} data={data} />
                </div>
              </div>
              <div>
                <InfoCard
                  {...{
                    title: "Number of Relay Nodes",
                    description: "4",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

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
        <div>
          <ClientOnly fallback={<Fallback />}>
            {() => <CreateMap></CreateMap>}
          </ClientOnly>
        </div>
      </div>
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
    <div className="relative h-28 mb-4 mr-4">
      {/* <div className="absolute md:w-80 h-28 justify-center bg-gradient-to-r from-gray-800 to-blue-500 blur-xl opacity-75 leading-none "></div> */}
      <div className="relative md:w-80 justify-center leading-none ">
        <div className="block p-6  h-28  rounded-lg border  shadow-md  bg-gray-800 border-gray-700 hover:bg-gray-700 text-center">
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
