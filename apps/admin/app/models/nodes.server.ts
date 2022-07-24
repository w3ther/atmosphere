import { weatherNode } from "database";
import { prisma } from "~/db.server";
import { gun } from "utils";

export function getAllWeatherNodes() {
  const weatherNodes = gun.get("weatherNodes");
  weatherNodes.map().once((weatherNodes) => {
    console.log("this weather node is", weatherNodes);
  });
  return weatherNodes;
}

export function getNodeInfoDatabase({ id }: Pick<weatherNode, "id">) {
  return prisma.weatherNode.findFirst({
    where: { id },
  });
}
