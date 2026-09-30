'use client'

import dynamic from "next/dynamic";
import type { MapaExibicaoProps } from "../components/MapaExibicao"

const MapaExibicao = dynamic(() => import('@/src/components/MapaExibicao'), { ssr: false });

export default function ContainerMapaHome({ marcadores }: MapaExibicaoProps) {
    return (
        <div className="w-3/4 h-130 z-10">
            <MapaExibicao marcadores={marcadores} />
        </div>
    )
}