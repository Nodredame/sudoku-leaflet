import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type RegionPoint = {
  label: string;
  latitude: number;
  longitude: number;
};

const regionData: RegionPoint[] = [
  { label: 'Australia', latitude: -30, longitude: 140 },
  { label: 'Asia', latitude: 50, longitude: 100 },
  { label: 'Africa', latitude: 3, longitude: 20 },
  { label: 'Europe', latitude: 45, longitude: 30 },
  { label: 'North America', latitude: 35, longitude: -100 },
  { label: 'South America', latitude: -20, longitude: -50 },
];

function ZoomToRegion({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.setView([lat, lng], 5);
  return null;
}

function ResetZoom() {
  const map = useMap();
  map.setView([20, 0], 2);
  return null;
}

function getBalloonIcon(done: boolean) {
  return L.divIcon({
    className: 'custom-balloon',
    html: done ? '🟢' : '🎈',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
}

type MarkerProps = {
  point: RegionPoint;
  isCompleted: boolean;
  onSelect: (point: RegionPoint | null) => void;
};

function RegionMarker({ point, isCompleted, onSelect }: MarkerProps) {
  const icon = getBalloonIcon(isCompleted);

  const handleClick = () => {
    const confirmed = window.confirm(`Solve ${point.label}'s Sudoku puzzle?`);
    if (confirmed) {
      onSelect(point);
    } else {
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
      <Popup>{point.label}</Popup>
    </Marker>
  );
}

export default function PuzzleMapInterface() {
  const [selectedRegion, setSelectedRegion] = useState<RegionPoint | null>(null);
  const [completedRegions, setCompletedRegions] = useState(() => new Set<string>());

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {regionData.map((point) => (
        <RegionMarker
          key={point.label}
          point={point}
          isCompleted={completedRegions.has(point.label)}
          onSelect={(p) => setSelectedRegion(p)}
        />
      ))}

      {selectedRegion ? (
        <ZoomToRegion lat={selectedRegion.latitude} lng={selectedRegion.longitude} />
      ) : (
        <ResetZoom />
      )}
    </MapContainer>
  );
}
