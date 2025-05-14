import React, { useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import { kpiData } from '@/data/kpiData';
import { useRules } from '@/context/RulesContext';
import KPICard from '@/components/dashboard/KPICard';
import KPIStatusChart from '@/components/dashboard/KPIStatusChart';
import KPIBusinessUnitChart from '@/components/dashboard/KPIBusinessUnitChart';
import KPIObjectiveChart from '@/components/dashboard/KPIObjectiveChart';
import KPIOwnerChart from '@/components/dashboard/KPIOwnerChart';
import KPITable from '@/components/dashboard/KPITable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LayoutDashboard } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { rules } = useRules();
  const activeRules = rules.filter(rule => rule.isActive);
  const [businessUnitFilter, setBusinessUnitFilter] = useState<string>("All");
  const [kpiTypeFilter, setKPITypeFilter] = useState<string>("All");
  
  const businessUnits = useMemo(() => {
    const units = new Set<string>();
    kpiData.forEach(kpi => {
      if (kpi.businessUnit) units.add(kpi.businessUnit);
    });
    return ["All", ...Array.from(units)];
  }, [kpiData]);

  const filteredKPIs = useMemo(() => {
    return kpiData.filter(kpi => {
      if (businessUnitFilter !== "All" && kpi.businessUnit !== businessUnitFilter) return false;
      if (kpiTypeFilter !== "All" && kpi.type !== kpiTypeFilter) return false;
      return true;
    });
  }, [kpiData, businessUnitFilter, kpiTypeFilter]);
  
  const evaluatedKPIs = useMemo(() => {
    return filteredKPIs.map(kpi => {
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
                     kpiData.filter(k => k.objective === kpi.objective && k.type === "Strategic").length > 5;
              
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
  }, [filteredKPIs, activeRules]);
  
  const flaggedCount = evaluatedKPIs.filter(item => item.flaggedRules.length > 0).length;
  
  return (
    <Layout className="bg-slate-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col mb-6">
          <div className="flex items-center gap-2 mb-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">KPI Performance Dashboard</h1>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm border">
              <span className="text-sm font-medium">Active rules:</span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">{activeRules.length}</span>
              <span className="mx-1">|</span>
              <span className="text-sm font-medium">KPIs with issues:</span>
              <span className={cn("px-2 py-0.5 rounded font-medium", 
                flaggedCount > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              )}>
                {flaggedCount} of {filteredKPIs.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border">
                <span className="text-sm font-medium">Business Units:</span>
                <Select value={businessUnitFilter} onValueChange={setBusinessUnitFilter}>
                  <SelectTrigger className="w-[180px] h-8 border-0 shadow-none bg-transparent">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessUnits.map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border">
                <span className="text-sm font-medium">KPI Type:</span>
                <Select value={kpiTypeFilter} onValueChange={setKPITypeFilter}>
                  <SelectTrigger className="w-[180px] h-8 border-0 shadow-none bg-transparent">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Strategic">Strategic</SelectItem>
                    <SelectItem value="Operational">Operational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-md">
            <CardHeader className="pb-2 bg-card/50 border-b">
              <CardTitle className="text-md">KPI Breakdown By Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <KPIStatusChart kpis={filteredKPIs} />
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2 bg-card/50 border-b">
              <CardTitle className="text-md">KPI Distribution By Business Unit</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <KPIBusinessUnitChart kpis={filteredKPIs} />
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2 bg-card/50 border-b">
              <CardTitle className="text-md">KPI Status Breakdown by Strategic Objective</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <KPIObjectiveChart kpis={filteredKPIs} />
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2 bg-card/50 border-b">
              <CardTitle className="text-md">KPI Breakdown by Owner</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <KPIOwnerChart kpis={filteredKPIs} />
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-2 bg-card/50 border-b">
            <CardTitle className="text-md">KPI Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <KPITable kpis={evaluatedKPIs} />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evaluatedKPIs.map(({ kpi, flaggedRules }) => (
            <KPICard 
              key={kpi.id} 
              kpi={kpi} 
              flaggedRules={flaggedRules} 
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
