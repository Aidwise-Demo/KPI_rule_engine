
import { useMemo, useState } from 'react';
import { KPI, kpiData } from '@/data/kpiData';

export const useKPIFilters = () => {
  const [businessUnitFilter, setBusinessUnitFilter] = useState<string>("All");
  const [kpiTypeFilter, setKPITypeFilter] = useState<string>("All");
  
  const businessUnits = useMemo(() => {
    const units = new Set<string>();
    kpiData.forEach(kpi => {
      if (kpi.businessUnit) units.add(kpi.businessUnit);
    });
    return ["All", ...Array.from(units)];
  }, []);

  const filteredKPIs = useMemo(() => {
    return kpiData.filter(kpi => {
      if (businessUnitFilter !== "All" && kpi.businessUnit !== businessUnitFilter) return false;
      if (kpiTypeFilter !== "All" && kpi.type !== kpiTypeFilter) return false;
      return true;
    });
  }, [businessUnitFilter, kpiTypeFilter]);

  return {
    businessUnitFilter,
    setBusinessUnitFilter,
    kpiTypeFilter,
    setKPITypeFilter,
    businessUnits,
    filteredKPIs
  };
};
