
import React from 'react';
import { KPI } from '@/data/kpiData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface KPITableProps {
  kpis: Array<{ kpi: KPI; flaggedRules: string[] }>;
}

const KPITable: React.FC<KPITableProps> = ({ kpis }) => {
  const statusColors: Record<string, string> = {
    'On Track': 'bg-green-500 text-white',
    'Off Track': 'bg-red-500 text-white',
    'Alert': 'bg-amber-500 text-white',
    'Harvested': 'bg-blue-500 text-white',
    'To Commence': 'bg-gray-500 text-white',
  };

  if (kpis.length === 0) {
    return (
      <div className="py-6 text-center text-muted-foreground">
        No KPIs match the current filters and rules.
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>KPI Name</TableHead>
            <TableHead>Business Unit</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Target</TableHead>
            <TableHead className="text-right">Actual</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Issues</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kpis.map(({ kpi, flaggedRules }) => (
            <TableRow key={kpi.id}>
              <TableCell className="font-medium">{kpi.name}</TableCell>
              <TableCell>{kpi.businessUnit || 'Not Assigned'}</TableCell>
              <TableCell>{kpi.owner || 'Not Assigned'}</TableCell>
              <TableCell className="text-right">{kpi.target !== null ? kpi.target : 'Not defined'}</TableCell>
              <TableCell className="text-right">{kpi.actual !== null ? kpi.actual : 'N/A'}</TableCell>
              <TableCell>
                <Badge className={statusColors[kpi.status]}>{kpi.status}</Badge>
              </TableCell>
              <TableCell>
                {flaggedRules.length > 0 && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle size={16} className="text-amber-500" />
                    <span className="text-sm text-amber-500">{flaggedRules.length}</span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default KPITable;
