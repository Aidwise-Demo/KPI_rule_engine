
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KPI } from '@/data/kpiData';

interface KPICardProps {
  kpi: KPI;
  flaggedRules: string[];
}

const KPICard: React.FC<KPICardProps> = ({ kpi, flaggedRules }) => {
  const statusColors: Record<string, string> = {
    'On Track': 'bg-green-500 text-white',
    'Off Track': 'bg-red-500 text-white',
    'Alert': 'bg-amber-500 text-white',
    'Harvested': 'bg-blue-500 text-white',
    'To Commence': 'bg-gray-500 text-white',
  };

  return (
    <Card className={flaggedRules.length > 0 ? 'border-amber-500 border-2' : ''}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg">{kpi.name}</h3>
          <Badge className={statusColors[kpi.status]}>{kpi.status}</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-muted-foreground">Business Unit:</span>
          <span>{kpi.businessUnit || 'Not assigned'}</span>
          
          <span className="text-muted-foreground">Owner:</span>
          <span>{kpi.owner || 'Not assigned'}</span>
          
          <span className="text-muted-foreground">Type:</span>
          <span>{kpi.type}</span>
          
          <span className="text-muted-foreground">Objective:</span>
          <span>{kpi.objective}</span>
          
          <span className="text-muted-foreground">Target:</span>
          <span>{kpi.target !== null ? kpi.target : 'Not defined'}</span>
          
          <span className="text-muted-foreground">Actual:</span>
          <span>{kpi.actual !== null ? kpi.actual : 'Not available'}</span>
        </div>
        
        {flaggedRules.length > 0 && (
          <div className="mt-4">
            <h4 className="text-amber-500 font-medium text-sm mb-2">Issues Found:</h4>
            <ul className="text-xs space-y-1 list-disc pl-4">
              {flaggedRules.map((rule, index) => (
                <li key={index} className="text-amber-700">{rule}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;
