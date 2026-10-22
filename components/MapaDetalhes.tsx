'use client'

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

interface MapaDetalhesProps {
    lat: number;
    lng: number;
}

export default function MapaDetalhes({ lat, lng }: MapaDetalhesProps) {
    const posicao: L.LatLngTuple = [lat, lng];

    const limiteVotorantim: L.LatLngBoundsLiteral = [
        [-23.6850, -47.4950],
        [-23.5110, -47.3110]
    ];

    return (
        <MapContainer 
            center={posicao} 
            zoom={16} 
            minZoom={12}
            maxZoom={18}
            maxBounds={limiteVotorantim}
            maxBoundsViscosity={1.0}
            style={{ width: "100%", height: "100%", minHeight: "260px" }}
            zoomControl={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={posicao} icon={customIcon} />
        </MapContainer>
    );
}
