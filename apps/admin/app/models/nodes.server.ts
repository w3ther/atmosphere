import { gun } from "utils";

export function getAllWeatherNodes() {
  const weatherNodes = gun.get("weatherNodes");
  weatherNodes.map().once((weatherNodes) => {
    console.log("this weather node is", weatherNodes);
  });
  return weatherNodes;
}
