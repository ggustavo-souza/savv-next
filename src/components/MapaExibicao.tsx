'use client'

import { APIProvider, Map, useMap, Marker, Pin, AdvancedMarker } from "@vis.gl/react-google-maps"
import { useEffect } from "react";
import type { MarcadorServico } from "../types/Servico";

function MapRestrictor() {
    const map = useMap() // hook usado pra criar configurações e modificar o mapa

    useEffect(() => {
        if (!map || !window.google) return;

        const limiteVotorantim = new google.maps.LatLngBounds(
            new google.maps.LatLng(-23.6850, -47.4950), //sul e oeste
            new google.maps.LatLng(-23.5110, -47.3110) // norte e leste
        );

        map.setOptions({
            restriction: {
                latLngBounds: limiteVotorantim,
                strictBounds: true
            }
        })
    }, [map])

    return null
}

interface MapaExibicaoProps {
    marcadores: MarcadorServico[]
}

export default function MapaExibicao({marcadores}: MapaExibicaoProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    const esconderEstabelecimento: google.maps.MapTypeStyle[] = [
        {
            featureType: "poi",
            elementType: "all",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    const COORDENADAS_VOTORANTIM = { lat: -23.5466, lng: -47.4382 }

    return (
        <APIProvider apiKey={apiKey ? apiKey : 'none'}>
            <Map
                defaultCenter={COORDENADAS_VOTORANTIM}
                defaultZoom={13}
                disableDefaultUI={true}
                keyboardShortcuts={false}
                styles={esconderEstabelecimento}
                //Colocar o mapId depois
            >
                <MapRestrictor />
                
                {marcadores.map((marcador) => (
                    //mudar pra AdvancedMarker depois que pegar o mapId
                    <Marker 
                        key={marcador.id}
                        position={marcador.coordenadas}
                        title={`ID: ${marcador.id} - ${marcador.situacao}`}
                    />
                ))}
            </Map>
        </APIProvider>
    )
}