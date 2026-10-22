'use client'

import dynamic from 'next/dynamic';

const MapaDetalhes = dynamic(() => import('@/components/MapaDetalhes'), { ssr: false });

interface ContainerMapaDetalhesProps {
    lat: number
    lng: number
}

export default function ContainerMapaDetalhes({lat, lng}: ContainerMapaDetalhesProps) {
    return (
        <>
            <div className="rounded-xs overflow-hidden border border-gray-200 h-64">
                <MapaDetalhes lat={lat} lng={lng} />
            </div>
        </>
    )
}