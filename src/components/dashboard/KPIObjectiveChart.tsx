
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { KPI } from '@/data/kpiData';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface KPIObjectiveChartProps {
  kpis: KPI[];
}

const KPIObjectiveChart: React.FC<KPIObjectiveChartProps> = ({ kpis }) => {
  // Group KPIs by objective
  const objectiveData = React.useMemo(() => {
    const objectives = new Map<string, { objective: string, count: number }>();
    
    kpis.forEach(kpi => {
      if (!objectives.has(kpi.objective)) {
        objectives.set(kpi.objective, { 
          objective: kpi.objective,
          count: 0 
        });
      }
      
      const data = objectives.get(kpi.objective)!;
      data.count++;
      objectives.set(kpi.objective, data);
    });
    
    return Array.from(objectives.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Get top 10 objectives
  }, [kpis]);
  
  const chartConfig = {
    count: { label: 'Count', theme: { light: '#3b82f6' } },
  };

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={objectiveData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 130, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis 
              type="category" 
              dataKey="objective" 
              tick={{ fontSize: 10 }} 
              width={120}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default KPIObjectiveChart;
