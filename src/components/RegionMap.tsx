import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import RegionMarker from './RegionMarker';
import SudokuOverlay from './SudokuOverlay';
import { useMap } from 'react-leaflet';

// This component is responsible for leaflet logic
// Setting up regions on leaflet map
type RegionPoint = {
    label: string;
    latitude: number;
    longitude: number;
};

//Static continental regions for game playability
const regionData: RegionPoint[] = [
    { label: 'Australia', latitude: -30, longitude: 140 },
    { label: 'Asia', latitude: 50, longitude: 100 },
    { label: 'Africa', latitude: 3, longitude: 20 },
    { label: 'Europe', latitude: 45, longitude: 30 },
    { label: 'North America', latitude: 35, longitude: -100 },
    { label: 'South America', latitude: -20, longitude: -50 },
];

type RegionProgress = {
    userInput: number[][];
    isCompleted: boolean;
    hasGivenUp: boolean;
};

export default function RegionMap() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [regionProgress, setRegionProgress] = useState<Record<string, RegionProgress>>(() =>

    Object.fromEntries(
        regionData.map((r: RegionPoint) => [
            r.label,
            {userInput: Array(9).fill(0).map(() => Array(9).fill(0)),
            isCompleted: false,
            hasGivenUp: false,
            },
        ])
    )
    );

    const handleLeave = () => {
        setSelectedRegion(null);
    };

    const handleSubmit = (region: string, completed: boolean, updatedInput: number[][]) => {
        setRegionProgress((prev) => ({...prev,
        [region]:   {userInput: updatedInput,
                    isCompleted: completed,
                    hasGivenUp: true, // submit saves progress
        },
        }));
        if (completed) setSelectedRegion(null);
    };  

    const handleRestart = (region: string) => {
        setRegionProgress((prev) => ({...prev, [region]: {
            userInput: Array(9).fill(0).map(() => Array(9).fill(0)),
            isCompleted: false,
            hasGivenUp: false,
        },
        }));
    };
// Zooming is not ideal but can be rounded out time permitted,
// currently uses region points and resets to base leaflet view
    const regionPoint = regionData.find((r: RegionPoint) => r.label === selectedRegion);
    function ResetZoom() {
        const map = useMap();
        map.setView([20, 0], 2);
        return null;
    }
    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
        />
        {regionData.map((point: RegionPoint) => (
            <RegionMarker
            key={point.label}
            point={point}
            isCompleted={regionProgress[point.label].isCompleted}
            onSelect={(p) => setSelectedRegion(p?.label ?? null)}
        />
        ))}
        {!selectedRegion && <ResetZoom />}
        </MapContainer>
            {selectedRegion && regionPoint && (
                <SudokuOverlay
                region={selectedRegion}
                puzzleId={selectedRegion}
                onLeave={handleLeave}
                onSubmit={handleSubmit}
                onRestart={handleRestart}
                initialInput={regionProgress[selectedRegion].userInput}
                />         
            )}
        </div>
    );  
}