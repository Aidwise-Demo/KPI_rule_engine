
export interface KPI {
  id: string;
  name: string;
  businessUnit: string | null;
  department: string | null;
  owner: string | null;
  target: number | null;
  actual: number | null;
  status: 'On Track' | 'Off Track' | 'Alert' | 'Harvested' | 'To Commence';
  objectiveContribution: number;
  type: 'Strategic' | 'Operational';
  objective: string;
  quarterlyPerformance: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
  };
  benchmark: number;
}
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { KPI } from "@/data/kpiData"; // Keep the interface

export function useKPIData(csvUrl: string) {
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(csvUrl)
      .then(res => res.text())
      .then(text => {
        Papa.parse<any>(text, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            const parsed = (result.data as any[]).map(row => ({
              ...row,
              businessUnit: row.businessUnit || null,
              department: row.department || null,
              owner: row.owner || null,
              target: row.target !== "" ? Number(row.target) : null,
              actual: row.actual !== "" ? Number(row.actual) : null,
              objectiveContribution: Number(row.objectiveContribution),
              benchmark: Number(row.benchmark),
              quarterlyPerformance: {
                q1: Number(row["quarterlyPerformance.q1"]),
                q2: Number(row["quarterlyPerformance.q2"]),
                q3: Number(row["quarterlyPerformance.q3"]),
                q4: Number(row["quarterlyPerformance.q4"]),
              }
            }));
            setKPIs(parsed);
            setLoading(false);
          }
        });
      });
  }, [csvUrl]);

  return { kpis, loading };
}// export const kpiData: KPI[] = [
//   {
//     id: "kpi1",
//     name: "Customer Satisfaction Score",
//     businessUnit: "Corporate Division",
//     department: "Customer Experience",
//     owner: "Jane Smith",
//     target: 85,
//     actual: 78,
//     status: "On Track",
//     objectiveContribution: 25,
//     type: "Strategic",
//     objective: "Improve Customer Experience",
//     quarterlyPerformance: {
//       q1: 65,
//       q2: 55,
//       q3: 78,
//       q4: 0
//     },
//     benchmark: 95
//   },
//   {
//     id: "kpi2",
//     name: "Revenue Growth",
//     businessUnit: "Corp Branch",
//     department: "Finance",
//     owner: "John Doe",
//     target: 15,
//     actual: 12,
//     status: "Alert",
//     objectiveContribution: 35,
//     type: "Strategic",
//     objective: "Expand the business",
//     quarterlyPerformance: {
//       q1: 16,
//       q2: 14,
//       q3: 12,
//       q4: 0
//     },
//     benchmark: 18
//   },
//   {
//     id: "kpi3",
//     name: "Employee Engagement",
//     businessUnit: "Corporate Division",
//     department: "HR",
//     owner: "Dylan Green",
//     target: 80,
//     actual: 41,
//     status: "On Track",
//     objectiveContribution: 20,
//     type: "Strategic",
//     objective: "Improve employee satisfaction",
//     quarterlyPerformance: {
//       q1: 42,
//       q2: 41,
//       q3: 41,
//       q4: 0
//     },
//     benchmark: 90
//   },
//   {
//     id: "kpi4",
//     name: "Cost Reduction",
//     businessUnit: null,
//     department: null,
//     owner: "Business Head",
//     target: 10,
//     actual: 8,
//     status: "Off Track",
//     objectiveContribution: 15,
//     type: "Operational",
//     objective: "Improve cyber resilience",
//     quarterlyPerformance: {
//       q1: 5,
//       q2: 6,
//       q3: 8,
//       q4: 0
//     },
//     benchmark: 12
//   },
//   {
//     id: "kpi5",
//     name: "Product Development Cycle",
//     businessUnit: "Corp Branch",
//     department: "Product",
//     owner: "James Miller",
//     target: null,
//     actual: 45,
//     status: "To Commence",
//     objectiveContribution: 8,
//     type: "Strategic",
//     objective: "Improve productivity",
//     quarterlyPerformance: {
//       q1: 0,
//       q2: 0,
//       q3: 0,
//       q4: 0
//     },
//     benchmark: 30
//   },
//   {
//     id: "kpi6",
//     name: "Market Share",
//     businessUnit: "Corporate Division",
//     department: "Marketing",
//     owner: "Stephen Gmel",
//     target: 25,
//     actual: 22,
//     status: "On Track",
//     objectiveContribution: 30,
//     type: "Strategic",
//     objective: "Expand the business",
//     quarterlyPerformance: {
//       q1: 20,
//       q2: 21,
//       q3: 22,
//       q4: 0
//     },
//     benchmark: 40
//   },
//   {
//     id: "kpi7",
//     name: "IT System Uptime",
//     businessUnit: "Dept of SI",
//     department: "IT",
//     owner: "Division Owner",
//     target: 99.9,
//     actual: 99.7,
//     status: "On Track",
//     objectiveContribution: 5,
//     type: "Operational",
//     objective: "Improve cyber resilience",
//     quarterlyPerformance: {
//       q1: 99.8,
//       q2: 99.7,
//       q3: 99.7,
//       q4: 0
//     },
//     benchmark: 99.99
//   },
//   {
//     id: "kpi8",
//     name: "Training Completion Rate",
//     businessUnit: "Education Programs",
//     department: "HR",
//     owner: null,
//     target: 95,
//     actual: 87,
//     status: "Alert",
//     objectiveContribution: 10,
//     type: "Strategic",
//     objective: "Drive collaboration",
//     quarterlyPerformance: {
//       q1: 90,
//       q2: 88,
//       q3: 87,
//       q4: 0
//     },
//     benchmark: 100
//   }
// ];
