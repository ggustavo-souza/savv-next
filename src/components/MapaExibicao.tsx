'use client'

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { MarcadorServico } from "../types/Servico";

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

interface MapaExibicaoProps {
    marcadores: MarcadorServico[]
}

export default function MapaExibicao({ marcadores }: MapaExibicaoProps) {
    const COORDENADAS_VOTORANTIM: L.LatLngTuple = [-23.5466, -47.4382];
    
    // sul e oeste: -23.6850, -47.4950
    // norte e leste: -23.5110, -47.3110
    const limiteVotorantim: L.LatLngBoundsLiteral = [
        [-23.6850, -47.4950],
        [-23.5110, -47.3110]
    ];

    return (
        <MapContainer 
            center={COORDENADAS_VOTORANTIM} 
            zoom={13} 
            maxBounds={limiteVotorantim}
            maxBoundsViscosity={1.0}
            style={{ width: "100%", height: "100%", minHeight: "400px" }}
            zoomControl={false}
            keyboard={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {marcadores.map((marcador) => (
                <Marker 
                    key={marcador.id} 
                    position={[marcador.coordenadas.lat, marcador.coordenadas.lng]}
                    icon={customIcon}
                    title={`ID: ${marcador.id} - ${marcador.situacao}`}
                />
            ))}
        </MapContainer>
    );
}
