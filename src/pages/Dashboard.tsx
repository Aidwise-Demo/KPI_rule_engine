
import React, { useEffect, useMemo } from 'react';
import Layout from '@/components/Layout';
import { useRules } from '@/context/RulesContext';
import { useKPIFilters } from '@/hooks/useKPIFilters';
import { useKPIEvaluation } from '@/hooks/useKPIEvaluation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCharts from '@/components/dashboard/DashboardCharts';
import KPIDetailTable from '@/components/dashboard/KPIDetailTable';
import KPICardGrid from '@/components/dashboard/KPICardGrid';
import { cn } from '@/lib/utils';

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
  
  // Filter KPIs that have been flagged by active rules
  const flaggedKPIs = useMemo(() => {
    return evaluatedKPIs
      .filter(item => item.flaggedRules.length > 0)
      .map(item => ({
        ...item.kpi,
        hasFlagged: true
      }));
  }, [evaluatedKPIs]);
  
  // Debug logging
  useEffect(() => {
    console.log("Active rules changed:", activeRules.length);
    console.log("Flagged KPIs:", flaggedCount);
    console.log("Filtered flagged KPIs:", flaggedKPIs.length);
  }, [activeRules, flaggedCount, flaggedKPIs.length]);
  
  return (
    <Layout className={cn("bg-slate-50")}>
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
        
        <DashboardCharts filteredKPIs={flaggedKPIs} />
        
        <KPIDetailTable evaluatedKPIs={evaluatedKPIs.filter(item => item.flaggedRules.length > 0)} />
        
        <KPICardGrid evaluatedKPIs={evaluatedKPIs.filter(item => item.flaggedRules.length > 0)} />
      </div>
    </Layout>
  );
};

export default Dashboard;
