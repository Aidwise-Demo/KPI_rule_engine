
import React from 'react';
import KPICard from '@/components/dashboard/KPICard';
import { KPI } from '@/data/kpiData';

interface KPICardGridProps {
  evaluatedKPIs: {
    kpi: KPI;
    flaggedRules: string[];
  }[];
}

const KPICardGrid: React.FC<KPICardGridProps> = ({ evaluatedKPIs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {evaluatedKPIs.map(({ kpi, flaggedRules }) => (
        <KPICard 
          key={kpi.id} 
          kpi={kpi} 
          flaggedRules={flaggedRules} 
        />
      ))}
    </div>
  );
};

export default KPICardGrid;
