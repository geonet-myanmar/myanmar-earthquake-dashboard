import { EarthquakeEvent } from '../lib/api';
import { StatsPanel } from './StatsPanel';
import { EarthquakeMap } from './EarthquakeMap';
import { MagnitudeChart } from './MagnitudeChart';
import { DepthChart } from './DepthChart';
import { TimelineChart } from './TimelineChart';
import { RefreshCw } from 'lucide-react';

interface DashboardProps {
  data: EarthquakeEvent[];
  isLoading: boolean;
  onRefresh: () => void;
  lastUpdated: Date | null;
}

export function Dashboard({ data, isLoading, onRefresh, lastUpdated }: DashboardProps) {
  if (isLoading && data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
          <p className="text-slate-600 font-medium">Loading earthquake data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Myanmar Earthquakes
            </h1>
            <p className="text-slate-500 mt-1">
              Historical seismic activity within Myanmar's national boundary
            </p>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-sm text-slate-500">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 shadow-sm"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </header>

        <StatsPanel data={data} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
            <EarthquakeMap data={data} />
          </div>
          <div className="flex flex-col gap-6">
            <MagnitudeChart data={data} />
            <DepthChart data={data} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <TimelineChart data={data} />
        </div>
      </div>
    </div>
  );
}
