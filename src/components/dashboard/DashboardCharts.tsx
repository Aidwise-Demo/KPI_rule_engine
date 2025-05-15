
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KPIStatusChart from '@/components/dashboard/KPIStatusChart';
import KPIBusinessUnitChart from '@/components/dashboard/KPIBusinessUnitChart';
import KPIObjectiveChart from '@/components/dashboard/KPIObjectiveChart';
import KPIOwnerChart from '@/components/dashboard/KPIOwnerChart';
import { KPI } from '@/data/kpiData';

interface DashboardChartsProps {
  filteredKPIs: (KPI & { hasFlagged?: boolean })[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ filteredKPIs }) => {
  const NoDataMessage = () => (
    <div className="flex h-[200px] items-center justify-center text-muted-foreground">
      No KPIs match the current filters and rules.
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2 bg-card/50 border-b">
          <CardTitle className="text-md">KPI Breakdown By Status</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {filteredKPIs.length > 0 ? <KPIStatusChart kpis={filteredKPIs} /> : <NoDataMessage />}
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader className="pb-2 bg-card/50 border-b">
          <CardTitle className="text-md">KPI Distribution By Business Unit</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {filteredKPIs.length > 0 ? <KPIBusinessUnitChart kpis={filteredKPIs} /> : <NoDataMessage />}
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader className="pb-2 bg-card/50 border-b">
          <CardTitle className="text-md">KPI Status Breakdown by Strategic Objective</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {filteredKPIs.length > 0 ? <KPIObjectiveChart kpis={filteredKPIs} /> : <NoDataMessage />}
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader className="pb-2 bg-card/50 border-b">
          <CardTitle className="text-md">KPI Breakdown by Owner</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {filteredKPIs.length > 0 ? <KPIOwnerChart kpis={filteredKPIs} /> : <NoDataMessage />}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
