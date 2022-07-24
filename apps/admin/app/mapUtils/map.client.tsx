import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
export default function CreateMap() {
  return (
    <div className="rounded-lg  overflow-hidden">
      <MapContainer
        center={[33.749, -84.388]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[33.74, 84.388]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}
