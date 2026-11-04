'use client'

import dynamic from "next/dynamic";
import type { MapaExibicaoProps } from "@/components/MapaExibicao";

const MapaExibicao = dynamic(() => import('@/components/MapaExibicao'), { ssr: false });

export default function ContainerMapaGerente({ marcadores }: MapaExibicaoProps) {
    return (
        <div className="lg:w-1/2 h-100 sm:h-96 md:h-112 lg:h-130 z-10">
            <MapaExibicao marcadores={marcadores} />
        </div>
    )
}