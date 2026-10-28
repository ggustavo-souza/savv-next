'use client'

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

export default function MapaPrefeituraLeaflet() {
  const PREFEITURA_VOTORANTIM: L.LatLngTuple = [-23.5446, -47.4388];

  return (
    <MapContainer
      center={PREFEITURA_VOTORANTIM}
      zoom={16}
      minZoom={14}
      maxZoom={18}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      zoomControl={false}
      keyboard={false}
      attributionControl={false}
      style={{ width: "100%", height: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={PREFEITURA_VOTORANTIM} icon={customIcon}>
        <Popup>
          <strong>Prefeitura Municipal de Votorantim</strong>
          <br />
          Av. 31 de Março, 327 - Centro
        </Popup>
      </Marker>
    </MapContainer>
  );
}
