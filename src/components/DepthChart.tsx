import { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { EarthquakeEvent } from '../lib/api';

interface DepthChartProps {
  data: EarthquakeEvent[];
}

export function DepthChart({ data }: DepthChartProps) {
  const chartData = useMemo(() => {
    return data.map((event) => ({
      mag: Number(event.properties.mag.toFixed(1)),
      depth: Number(event.geometry.coordinates[2].toFixed(1)),
      name: event.properties.place,
    }));
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[350px]">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Depth vs Magnitude</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              type="number" 
              dataKey="mag" 
              name="Magnitude" 
              domain={['dataMin - 0.5', 'dataMax + 0.5']} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
              dy={10} 
            />
            <YAxis 
              type="number" 
              dataKey="depth" 
              name="Depth (km)" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
            />
            <ZAxis type="number" range={[50, 50]} />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }} 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Scatter name="Earthquakes" data={chartData} fill="#10b981" opacity={0.6} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
