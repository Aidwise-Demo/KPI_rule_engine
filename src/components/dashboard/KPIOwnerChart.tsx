
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { KPI } from '@/data/kpiData';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface KPIOwnerChartProps {
  kpis: KPI[];
}

const KPIOwnerChart: React.FC<KPIOwnerChartProps> = ({ kpis }) => {
  // Count KPIs by owner
  const ownerData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    kpis.forEach(kpi => {
      const ownerName = kpi.owner || 'Not Assigned';
      if (!counts[ownerName]) {
        counts[ownerName] = 0;
      }
      counts[ownerName]++;
    });
    
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [kpis]);

  // Define colors for owners
  const COLORS = [
    '#3b82f6',  // Division Owner
    '#7e22ce',  // Dylan Green
    '#f97316',  // Business Head
    '#0ea5e9',  // James Miller
    '#ec4899',  // Stephen Gmel
    '#64748b',  // Not Assigned
    '#14b8a6',  // Jane Smith
    '#8b5cf6',  // John Doe
  ];
  
  const chartConfig = {
    divisionOwner: { label: 'Division Owner', theme: { light: '#3b82f6' } },
    dylanGreen: { label: 'Dylan Green', theme: { light: '#7e22ce' } },
    businessHead: { label: 'Business Head', theme: { light: '#f97316' } },
    jamesMiller: { label: 'James Miller', theme: { light: '#0ea5e9' } },
    stephenGmel: { label: 'Stephen Gmel', theme: { light: '#ec4899' } },
    notAssigned: { label: 'Not Assigned', theme: { light: '#64748b' } },
    janeSmith: { label: 'Jane Smith', theme: { light: '#14b8a6' } },
    johnDoe: { label: 'John Doe', theme: { light: '#8b5cf6' } },
  };

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={ownerData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ value }) => `${value}`}
            >
              {ownerData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
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

export default KPIOwnerChart;
