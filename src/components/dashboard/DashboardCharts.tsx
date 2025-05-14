
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KPIStatusChart from '@/components/dashboard/KPIStatusChart';
import KPIBusinessUnitChart from '@/components/dashboard/KPIBusinessUnitChart';
import KPIObjectiveChart from '@/components/dashboard/KPIObjectiveChart';
import KPIOwnerChart from '@/components/dashboard/KPIOwnerChart';
import { KPI } from '@/data/kpiData';

interface DashboardChartsProps {
  filteredKPIs: KPI[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ filteredKPIs }) => {
  return (
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
  );
};

export default DashboardCharts;
