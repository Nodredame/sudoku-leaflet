import React from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Leaflet helper for region icons
// Handles Regional markers and popup boxes
type RegionPoint = {
  label: string;
  latitude: number;
  longitude: number;
};

function getBalloonIcon(done: boolean) {
    return L.divIcon({
        className: 'custom-balloon',
        html: done ? 'Pass' : 'Fail',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
    });
}

type MarkerProps = {
    point: RegionPoint;
    isCompleted: boolean;
    onSelect: (point: RegionPoint | null) => void;
};

export default function RegionMarker({ point, isCompleted, onSelect }: MarkerProps) {
    const map = useMap();
    const icon = getBalloonIcon(isCompleted);

    const handleClick = () => {
        const confirmed = window.confirm(`Solve ${point.label}'s Sudoku puzzle?`);
        if (confirmed) {
            onSelect(point);
            map.setView([point.latitude, point.longitude], 5);
        } 
        else {
            onSelect(null);
        }
    };

    return (
        <Marker
            key={point.label}
            position={[point.latitude, point.longitude]}
            icon={icon}
            eventHandlers={{ click: handleClick }}
        >
        <Popup offset={[0, -25]}>{point.label}</Popup>
        </Marker>
  );
}