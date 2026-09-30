'use client'

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

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

interface MapaSelecaoProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({ onLocationSelect }: MapaSelecaoProps) {
    const [position, setPosition] = useState<L.LatLng | null>(null);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });

    return position === null ? null : (
        <Marker position={position} icon={customIcon} />
    );
}

export default function MapaSelecao({ onLocationSelect }: MapaSelecaoProps) {
    const COORDENADAS_VOTORANTIM: L.LatLngTuple = [-23.5466, -47.4382];
    
    const limiteVotorantim: L.LatLngBoundsLiteral = [
        [-23.6850, -47.4950],
        [-23.5110, -47.3110]
    ];

    return (
        <MapContainer 
            center={COORDENADAS_VOTORANTIM} 
            zoom={14} 
            minZoom={13}
            maxZoom={16}
            maxBounds={limiteVotorantim}
            maxBoundsViscosity={1.0}
            style={{ width: "100%", height: "400px", borderRadius: "0.5rem", zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onLocationSelect={onLocationSelect} />
        </MapContainer>
    );
}
