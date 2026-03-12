import { Activity, AlertTriangle, Clock, MapPin } from 'lucide-react';
import { EarthquakeEvent } from '../lib/api';
import { format } from 'date-fns';

interface StatsPanelProps {
  data: EarthquakeEvent[];
}

export function StatsPanel({ data }: StatsPanelProps) {
  if (!data || data.length === 0) return null;

  const total = data.length;
  const maxMagEvent = data.reduce((prev, current) => (prev.properties.mag > current.properties.mag) ? prev : current);
  const maxMag = maxMagEvent.properties.mag;
  const recentEvent = data.reduce((prev, current) => (prev.properties.time > current.properties.time) ? prev : current);
  const avgDepth = data.reduce((sum, event) => sum + event.geometry.coordinates[2], 0) / total;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Earthquakes</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{total}</p>
          </div>
          <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center">
            <Activity className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4">Since 1900, Magnitude &ge; 4.0</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Max Magnitude</p>
            <p className="text-3xl font-bold text-rose-600 mt-1">{maxMag.toFixed(1)}</p>
          </div>
          <div className="h-12 w-12 bg-rose-50 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-rose-600" />
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4 truncate" title={maxMagEvent.properties.place}>
          {maxMagEvent.properties.place}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Most Recent</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {format(new Date(recentEvent.properties.time), 'MMM d, yyyy')}
            </p>
          </div>
          <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4">
          Mag {recentEvent.properties.mag.toFixed(1)}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Average Depth</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{avgDepth.toFixed(1)} <span className="text-lg font-normal text-slate-500">km</span></p>
          </div>
          <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center">
            <MapPin className="h-6 w-6 text-amber-600" />
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4">Across all recorded events</p>
      </div>
    </div>
  );
}
