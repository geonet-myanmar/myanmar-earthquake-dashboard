import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EarthquakeEvent } from '../lib/api';
import { format } from 'date-fns';

interface TimelineChartProps {
  data: EarthquakeEvent[];
}

export function TimelineChart({ data }: TimelineChartProps) {
  const chartData = useMemo(() => {
    // Group by year
    const yearCounts: Record<string, number> = {};
    
    data.forEach((event) => {
      const year = format(new Date(event.properties.time), 'yyyy');
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    });

    return Object.keys(yearCounts)
      .sort()
      .map((year) => ({
        year,
        count: yearCounts[year],
      }));
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[350px]">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Events Over Time (Yearly)</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
              dy={10} 
              minTickGap={20}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorCount)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
