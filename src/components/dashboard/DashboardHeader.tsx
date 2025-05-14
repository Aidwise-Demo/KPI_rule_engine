
import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  businessUnitFilter: string;
  setBusinessUnitFilter: (value: string) => void;
  kpiTypeFilter: string;
  setKPITypeFilter: (value: string) => void;
  businessUnits: string[];
  activeRules: number;
  flaggedCount: number;
  totalKPIs: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  businessUnitFilter,
  setBusinessUnitFilter,
  kpiTypeFilter,
  setKPITypeFilter,
  businessUnits,
  activeRules,
  flaggedCount,
  totalKPIs
}) => {
  return (
    <div className="flex flex-col mb-6">
      <div className="flex items-center gap-2 mb-2">
        <LayoutDashboard className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">KPI Performance Dashboard</h1>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm border">
          <span className="text-sm font-medium">Active rules:</span>
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">{activeRules}</span>
          <span className="mx-1">|</span>
          <span className="text-sm font-medium">KPIs with issues:</span>
          <span className={cn("px-2 py-0.5 rounded font-medium", 
            flaggedCount > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          )}>
            {flaggedCount} of {totalKPIs}
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
  );
};

export default DashboardHeader;
