
import React from 'react';
import Layout from '@/components/Layout';
import { useRules } from '@/context/RulesContext';
import { useKPIFilters } from '@/hooks/useKPIFilters';
import { useKPIEvaluation } from '@/hooks/useKPIEvaluation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCharts from '@/components/dashboard/DashboardCharts';
import KPIDetailTable from '@/components/dashboard/KPIDetailTable';
import KPICardGrid from '@/components/dashboard/KPICardGrid';

const Dashboard: React.FC = () => {
  const { rules } = useRules();
  const activeRules = rules.filter(rule => rule.isActive);
  
  const {
    businessUnitFilter,
    setBusinessUnitFilter,
    kpiTypeFilter,
    setKPITypeFilter,
    businessUnits,
    filteredKPIs
  } = useKPIFilters();
  
  const { evaluatedKPIs, flaggedCount } = useKPIEvaluation(filteredKPIs, activeRules);
  
  return (
    <Layout className="bg-slate-50">
      <div className="container mx-auto px-4 py-6">
        <DashboardHeader
          businessUnitFilter={businessUnitFilter}
          setBusinessUnitFilter={setBusinessUnitFilter}
          kpiTypeFilter={kpiTypeFilter}
          setKPITypeFilter={setKPITypeFilter}
          businessUnits={businessUnits}
          activeRules={activeRules.length}
          flaggedCount={flaggedCount}
          totalKPIs={filteredKPIs.length}
        />
        
        <DashboardCharts filteredKPIs={filteredKPIs} />
        
        <KPIDetailTable evaluatedKPIs={evaluatedKPIs} />
        
        <KPICardGrid evaluatedKPIs={evaluatedKPIs} />
      </div>
    </Layout>
  );
};

export default Dashboard;
