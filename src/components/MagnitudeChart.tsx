import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EarthquakeEvent } from '../lib/api';

interface MagnitudeChartProps {
  data: EarthquakeEvent[];
}

export function MagnitudeChart({ data }: MagnitudeChartProps) {
  const chartData = useMemo(() => {
    const bins = {
      '4.0-4.9': 0,
      '5.0-5.9': 0,
      '6.0-6.9': 0,
      '7.0+': 0,
    };

    data.forEach((event) => {
      const mag = event.properties.mag;
      if (mag >= 7.0) bins['7.0+']++;
      else if (mag >= 6.0) bins['6.0-6.9']++;
      else if (mag >= 5.0) bins['5.0-5.9']++;
      else if (mag >= 4.0) bins['4.0-4.9']++;
    });

    return Object.keys(bins).map((key) => ({
      name: key,
      count: bins[key as keyof typeof bins],
    }));
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[350px]">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Magnitude Distribution</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
