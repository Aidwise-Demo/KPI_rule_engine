
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { KPI } from '@/data/kpiData';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface KPIStatusChartProps {
  kpis: KPI[];
}

const KPIStatusChart: React.FC<KPIStatusChartProps> = ({ kpis }) => {
  // Count KPIs by status
  const statusData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    kpis.forEach(kpi => {
      if (!counts[kpi.status]) {
        counts[kpi.status] = 0;
      }
      counts[kpi.status]++;
    });
    
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [kpis]);

  const COLORS = {
    'On Track': '#4ade80',
    'Off Track': '#ef4444',
    'Alert': '#f59e0b',
    'Harvested': '#3b82f6',
    'To Commence': '#6b7280',
  };

  const chartConfig = {
    onTrack: { label: 'On Track', theme: { light: '#4ade80', dark: '#4ade80' } },
    offTrack: { label: 'Off Track', theme: { light: '#ef4444', dark: '#ef4444' } },
    alert: { label: 'Alert', theme: { light: '#f59e0b', dark: '#f59e0b' } },
    harvested: { label: 'Harvested', theme: { light: '#3b82f6', dark: '#3b82f6' } },
    toCommence: { label: 'To Commence', theme: { light: '#6b7280', dark: '#6b7280' } },
  };

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, value }) => `${value}`}
            >
              {statusData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.name as keyof typeof COLORS] || '#000000'} 
                />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
            <Legend 
              formatter={(value) => <span className="text-sm">{value}</span>}
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default KPIStatusChart;
