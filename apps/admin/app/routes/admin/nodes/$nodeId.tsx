import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { weatherNode } from "database";
import { getNodeInfoDatabase } from "~/models/nodes.server";

type LoaderData = {
  nodes: weatherNode | null;
};
export const loader: LoaderFunction = async ({ request, params }) => {
  // const nodes = await getNodeInfoDatabase({ id: params.nodeId ?? "" });
  const tempData = {
    name: "Apollo 1",
    timezone: "EST",
    city: "Atlanta",
    country: "USA",
    createdAt: new Date("03/05/2022"),
    id: "1",
    lat: 33.749,
    lon: 84.388,
    owner: "W3ther",
    type: "Main Node",
    userId: "1",
    updatedAt: new Date("03/05/2022"),
  } as weatherNode;
  return json<LoaderData>({ nodes: tempData });
};

export default function nodesId() {
  const data = useLoaderData<LoaderData>();
  return <div className="text-black">{data.nodes!.name}</div>;
}
