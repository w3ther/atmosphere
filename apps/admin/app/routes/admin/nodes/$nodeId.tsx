import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { weatherNode } from "database";
import { getNodeInfoDatabase } from "~/models/nodes.server";

type LoaderData = {
  node: weatherNode | null;
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const node = await getNodeInfoDatabase({ id: params.nodeId || "" });

  return json<LoaderData>({ node });
};

export default function nodesId() {
  const data = useLoaderData<LoaderData>();
  if (data.node) {
    return (
      <div>
        <div className="text-white">{data.node.name}</div>
        <div className="text-white">{data.node.country}</div>
        <div className="text-white">{data.node.city}</div>
        <div className="text-white">{data.node.lon}</div>
        <div className="text-white">{data.node.lat}</div>
      </div>
    );
  }
}
