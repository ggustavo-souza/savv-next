'use client'

import dynamic from "next/dynamic";

const MapaPrefeituraLeaflet = dynamic(() => import("./MapaPrefeituraLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[140px] bg-gray-100 flex items-center justify-center text-xs text-gray-400">
      Carregando mapa...
    </div>
  ),
});

export default function MapaPrefeitura() {
  return (
    <div className="relative w-full h-36 rounded-xs overflow-hidden border border-gray-300">
      <MapaPrefeituraLeaflet />
      <a
        href="https://maps.google.com/?q=Prefeitura+Municipal+de+Votorantim"
        target="_blank"
        rel="noopener noreferrer"
        title="Abrir no Google Maps"
        aria-label="Abrir localização da Prefeitura de Votorantim no Google Maps"
        className="absolute inset-0 z-10 cursor-pointer"
      />
    </div>
  );
}
