import type { GunOptions } from "gun";
import Gun from "gun";

export const piPort_DEV = 8766;

export const adminPort_DEV = 3000;
export const THIS_ADMIN_URL =
  process.env.THIS_ADMIN_URL || `http://localhost:${adminPort_DEV}`;

export const PI_PEERS =
  process.env.PI_PEERS || `http://localhost:${piPort_DEV}/gun`; // listen to all pi peers

export const ADMIN_PEERS = process.env.ADMIN_PEERS || ``; // only listen to other admin peers, not this peer

export const adminPeersArray = ADMIN_PEERS.split(";");
export const piPeersArray = ADMIN_PEERS.split(";");

export const peersArray = adminPeersArray.concat(piPeersArray);

export const gunConfig = {
  localStorage: false,
  radisk: true,
  peers: peersArray,
} as GunOptions;

export const gun = Gun(gunConfig);
