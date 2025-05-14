
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { KPI } from '@/data/kpiData';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface KPIBusinessUnitChartProps {
  kpis: KPI[];
}

const KPIBusinessUnitChart: React.FC<KPIBusinessUnitChartProps> = ({ kpis }) => {
  // Count KPIs by business unit
  const buData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    kpis.forEach(kpi => {
      const buName = kpi.businessUnit || 'Not Assigned';
      if (!counts[buName]) {
        counts[buName] = 0;
      }
      counts[buName]++;
    });
    
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [kpis]);

  // Define colors for business units
  const COLORS = [
    '#3b82f6', // Corporate Division
    '#1e40af', // Corp Branch
    '#f97316', // Dept of SI
    '#7e22ce', // Education Programs
    '#64748b', // Not Assigned
  ];
  
  const chartConfig = {
    corporateDivision: { label: 'Corporate Division', theme: { light: '#3b82f6', dark: '#3b82f6' } },
    corpBranch: { label: 'Corp Branch', theme: { light: '#1e40af', dark: '#1e40af' } },
    deptOfSI: { label: 'Dept of SI', theme: { light: '#f97316', dark: '#f97316' } },
    educationPrograms: { label: 'Education Programs', theme: { light: '#7e22ce', dark: '#7e22ce' } },
    notAssigned: { label: 'Not Assigned', theme: { light: '#64748b', dark: '#64748b' } },
  };

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={buData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ value }) => `${value}`}
            >
              {buData.map((entry, index) => (
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

export default KPIBusinessUnitChart;
