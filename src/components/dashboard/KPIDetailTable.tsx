
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KPITable from '@/components/dashboard/KPITable';
import { KPI } from '@/data/kpiData';

interface KPIDetailTableProps {
  evaluatedKPIs: {
    kpi: KPI;
    flaggedRules: string[];
  }[];
}

const KPIDetailTable: React.FC<KPIDetailTableProps> = ({ evaluatedKPIs }) => {
  return (
    <Card className="mb-6 shadow-md">
      <CardHeader className="pb-2 bg-card/50 border-b">
        <CardTitle className="text-md">KPI Details</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <KPITable kpis={evaluatedKPIs} />
      </CardContent>
    </Card>
  );
};

export default KPIDetailTable;
