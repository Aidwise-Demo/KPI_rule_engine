import { useMemo, useState } from 'react';
import { KPI } from '@/data/kpiData';

// Accept kpis as a parameter
export const useKPIFilters = (kpis: KPI[] = []) => {
  const [businessUnitFilter, setBusinessUnitFilter] = useState<string>("All");
  const [kpiTypeFilter, setKPITypeFilter] = useState<string>("All");

  const businessUnits = useMemo(() => {
    const units = new Set<string>();
    kpis.forEach(kpi => {
      if (kpi.businessUnit) units.add(kpi.businessUnit);
    });
    return ["All", ...Array.from(units)];
  }, [kpis]);

  const filteredKPIs = useMemo(() => {
    return kpis.filter(kpi => {
      if (businessUnitFilter !== "All" && kpi.businessUnit !== businessUnitFilter) return false;
      if (kpiTypeFilter !== "All" && kpi.type !== kpiTypeFilter) return false;
      return true;
    });
  }, [kpis, businessUnitFilter, kpiTypeFilter]);

  return {
    businessUnitFilter,
    setBusinessUnitFilter,
    kpiTypeFilter,
    setKPITypeFilter,
    businessUnits,
    filteredKPIs
  };
};