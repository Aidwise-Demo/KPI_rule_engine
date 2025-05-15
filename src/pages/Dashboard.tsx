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
  
  const { evaluatedKPIs } = useKPIEvaluation(filteredKPIs, rules);
  
  // Only show KPIs that are NOT flagged by active rules
  const displayedKPIs = useMemo(() => {
    return evaluatedKPIs
      .filter(item => {
        // If no rules are active, show all KPIs
        if (activeRules.length === 0) return true;
        
        // For each active rule, check if this KPI is flagged by it
        const activeRuleIds = activeRules.map(rule => rule.id);
        const flaggedByActiveRules = item.flaggedRules.some(flaggedRule => {
          const flaggingRule = rules.find(r => r.name === flaggedRule);
          return flaggingRule && activeRuleIds.includes(flaggingRule.id);
        });
        
        // Only display KPIs that are NOT flagged by any active rules
        return !flaggedByActiveRules;
      })
      .map(item => ({
        ...item.kpi,
        hasFlagged: false // They're not flagged since we're filtering those out
      }));
  }, [evaluatedKPIs, activeRules, rules]);
  
  // Debug logging
  useEffect(() => {
    console.log("Active rules changed:", activeRules.length);
    console.log("Total KPIs:", filteredKPIs.length);
    console.log("Displayed KPIs after filtering:", displayedKPIs.length);
  }, [activeRules, filteredKPIs.length, displayedKPIs.length]);
  
  // Count of KPIs removed by active rules
  const removedCount = filteredKPIs.length - displayedKPIs.length;
  
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
          flaggedCount={removedCount}
          totalKPIs={filteredKPIs.length}
        />
        
        <DashboardCharts filteredKPIs={displayedKPIs} />
        
        <KPIDetailTable evaluatedKPIs={evaluatedKPIs.filter(item => {
          // If no rules are active, show all KPIs
          if (activeRules.length === 0) return true;
          
          // Otherwise, show KPIs that aren't flagged by any active rule
          const activeRuleIds = activeRules.map(rule => rule.id);
          const flaggedByActiveRules = item.flaggedRules.some(flaggedRule => {
            const flaggingRule = rules.find(r => r.name === flaggedRule);
            return flaggingRule && activeRuleIds.includes(flaggingRule.id);
          });
          
          return !flaggedByActiveRules;
        })} />
        
        <KPICardGrid evaluatedKPIs={evaluatedKPIs.filter(item => {
          // If no rules are active, show all KPIs
          if (activeRules.length === 0) return true;
          
          // Otherwise, show KPIs that aren't flagged by any active rule
          const activeRuleIds = activeRules.map(rule => rule.id);
          const flaggedByActiveRules = item.flaggedRules.some(flaggedRule => {
            const flaggingRule = rules.find(r => r.name === flaggedRule);
            return flaggingRule && activeRuleIds.includes(flaggingRule.id);
          });
          
          return !flaggedByActiveRules;
        })} />
      </div>
    </Layout>
  );
};

export default Dashboard;
