
import { KPI } from '@/data/kpiData';

export const evaluateRuleLogic = (ruleName: string, kpi: KPI): boolean => {
  // Extract rule logic based on rule name
  const lowerCaseName = ruleName.toLowerCase();
  
  if (lowerCaseName.includes('benchmark') && lowerCaseName.includes('150%') && lowerCaseName.includes('target')) {
    return kpi.target !== null && kpi.benchmark > kpi.target * 1.5;
  }
  
  if (lowerCaseName.includes('not linked') && (lowerCaseName.includes('bu') || lowerCaseName.includes('department'))) {
    return kpi.businessUnit === null && kpi.department === null;
  }
  
  if (lowerCaseName.includes('conflicting objectives') || lowerCaseName.includes('multiple') && lowerCaseName.includes('objectives')) {
    return kpi.objective.includes("Improve") && kpi.objective.includes("Expand");
  }
  
  if (lowerCaseName.includes('strategic') && lowerCaseName.includes('10%') && lowerCaseName.includes('contribution')) {
    return kpi.type === "Strategic" && kpi.objectiveContribution < 10;
  }
  
  if (lowerCaseName.includes('performance') && lowerCaseName.includes('60%') && lowerCaseName.includes('consecutive')) {
    if (kpi.target === null) return false;
    const q1Perf = kpi.quarterlyPerformance.q1 / kpi.target * 100;
    const q2Perf = kpi.quarterlyPerformance.q2 / kpi.target * 100;
    const q3Perf = kpi.quarterlyPerformance.q3 / kpi.target * 100;
    return (q1Perf < 60 && q2Perf < 60) || (q2Perf < 60 && q3Perf < 60);
  }
  
  if (lowerCaseName.includes('on track') && lowerCaseName.includes('below') && lowerCaseName.includes('50%')) {
    return kpi.status === "On Track" && 
           kpi.target !== null && 
           kpi.actual !== null && 
           kpi.actual < kpi.target * 0.5;
  }
  
  if (lowerCaseName.includes('target not defined') || lowerCaseName.includes('missing target')) {
    return kpi.target === null;
  }
  
  if (lowerCaseName.includes('too many') && lowerCaseName.includes('strategic')) {
    return false; // Would need access to full KPI list for this
  }
  
  if (lowerCaseName.includes('no owner') || lowerCaseName.includes('no assigned owner')) {
    return kpi.owner === null;
  }
  
  if (lowerCaseName.includes('operational') && lowerCaseName.includes('bu level')) {
    return kpi.type === "Operational" && kpi.businessUnit !== null && kpi.department === null;
  }
  
  // Default case - no match
  return false;
};
