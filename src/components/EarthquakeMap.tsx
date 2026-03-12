import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { EarthquakeEvent } from '../lib/api';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface EarthquakeMapProps {
  data: EarthquakeEvent[];
}

export function EarthquakeMap({ data }: EarthquakeMapProps) {
  // Myanmar center approximately
  const center: [number, number] = [21.9162, 95.9560];
  const [tectonicData, setTectonicData] = useState<any>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/drtinkooo/myanmar-earthquake-archive/main/Myanmar_Tectonic_Map_2011.geojson')
      .then(res => res.json())
      .then(data => setTectonicData(data))
      .catch(err => console.error("Failed to load tectonic data:", err));
  }, []);

  const getMarkerColor = (mag: number) => {
    if (mag >= 7.0) return '#e11d48'; // rose-600
    if (mag >= 6.0) return '#ea580c'; // orange-600
    if (mag >= 5.0) return '#f59e0b'; // amber-500
    return '#3b82f6'; // blue-500
  };

  const getMarkerRadius = (mag: number) => {
    return Math.max(3, (mag - 3) * 4);
  };

  return (
    <div className="h-full min-h-[500px] w-full rounded-xl overflow-hidden shadow-sm border border-slate-100 z-0 relative">
      <MapContainer center={center} zoom={5} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {tectonicData && (
          <GeoJSON
            data={tectonicData}
            style={{
              color: '#ef4444', // red-500
              weight: 2,
              opacity: 0.6,
              dashArray: '4 4'
            }}
          />
        )}
        {data.map((event) => {
          const [lon, lat, depth] = event.geometry.coordinates;
          const mag = event.properties.mag;
          return (
            <CircleMarker
              key={event.id}
              center={[lat, lon]}
              radius={getMarkerRadius(mag)}
              fillColor={getMarkerColor(mag)}
              color={getMarkerColor(mag)}
              weight={1}
              opacity={0.8}
              fillOpacity={0.4}
            >
              <Popup className="rounded-lg">
                <div className="p-1">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">
                    Magnitude {mag.toFixed(1)}
                  </h3>
                  <p className="text-xs text-slate-600 mb-2">{event.properties.place}</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-medium text-slate-900">
                      {format(new Date(event.properties.time), 'MMM d, yyyy')}
                    </span>
                    <span className="text-slate-500">Time:</span>
                    <span className="font-medium text-slate-900">
                      {format(new Date(event.properties.time), 'HH:mm:ss')}
                    </span>
                    <span className="text-slate-500">Depth:</span>
                    <span className="font-medium text-slate-900">{depth.toFixed(1)} km</span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
