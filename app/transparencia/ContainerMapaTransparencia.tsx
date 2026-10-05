'use client'

import { MapaExibicaoProps } from "@/components/MapaExibicao"
import dynamic from "next/dynamic"

const MapaExibicao = dynamic(() => import("@/components/MapaExibicao"), { ssr: false })

export default function ContainerMapaTransparencia({ marcadores }: MapaExibicaoProps) {
    return (
        <aside className="w-full lg:w-7/12 h-[50vh] sm:h-[60vh] lg:h-[70vh] border border-gray-400 flex rounded-sm items-center justify-center">
            <MapaExibicao marcadores={marcadores} />
        </aside>
    )
}