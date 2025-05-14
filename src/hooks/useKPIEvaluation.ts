
import { useMemo } from 'react';
import { KPI } from '@/data/kpiData';
import { Rule } from '@/types/rules';

export const useKPIEvaluation = (kpis: KPI[], activeRules: Rule[]) => {
  const evaluatedKPIs = useMemo(() => {
    return kpis.map(kpi => {
      const flaggedRules = activeRules
        .filter(rule => {
          // Check if KPI violates this rule
          switch (rule.id) {
            case "rule1": // KPI benchmark >150% of internal target
              return kpi.target !== null && kpi.benchmark > kpi.target * 1.5;
              
            case "rule2": // KPI is not linked to any BU or Department
              return kpi.businessUnit === null && kpi.department === null;
              
            case "rule3": // KPI linked to multiple conflicting objectives
              // Simplified check - would need real data for proper implementation
              return kpi.objective.includes("Improve") && kpi.objective.includes("Expand");
              
            case "rule4": // KPI marked as strategic but shows < 10% contribution
              return kpi.type === "Strategic" && kpi.objectiveContribution < 10;
              
            case "rule5": // KPI performance < 60% for 2 consecutive quarters
              if (kpi.target === null) return false;
              const q1Perf = kpi.quarterlyPerformance.q1 / kpi.target * 100;
              const q2Perf = kpi.quarterlyPerformance.q2 / kpi.target * 100;
              const q3Perf = kpi.quarterlyPerformance.q3 / kpi.target * 100;
              return (q1Perf < 60 && q2Perf < 60) || (q2Perf < 60 && q3Perf < 60);
              
            case "rule6": // KPI status is "On Track" but actuals are below 50% of target
              return kpi.status === "On Track" && 
                     kpi.target !== null && 
                     kpi.actual !== null && 
                     kpi.actual < kpi.target * 0.5;
              
            case "rule7": // KPI target not defined for current FY
              return kpi.target === null;
              
            case "rule8": // Too many strategic KPIs on objective
              // Simplified - would need to group by objective in real app
              return kpi.type === "Strategic" && 
                     kpis.filter(k => k.objective === kpi.objective && k.type === "Strategic").length > 5;
              
            case "rule9": // Objective has no assigned KPI Owner
              return kpi.owner === null;
              
            case "rule10": // Operational KPI reported at BU level only
              return kpi.type === "Operational" && kpi.businessUnit !== null && kpi.department === null;
              
            case "rule11": // Strategic Objective has 0 linked KPIs
              // Simplified implementation
              return false; // This would check if any objective has no KPIs
              
            default:
              return false;
          }
        })
        .map(rule => rule.name);
      
      return {
        kpi,
        flaggedRules
      };
    });
  }, [kpis, activeRules]);

  const flaggedCount = useMemo(() => {
    return evaluatedKPIs.filter(item => item.flaggedRules.length > 0).length;
  }, [evaluatedKPIs]);

  return { evaluatedKPIs, flaggedCount };
};
