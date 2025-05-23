
export interface Rule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

// export const defaultRules: Rule[] = [
//   {
//     id: "rule1",
//     name: "KPI benchmark >150% of internal target",
//     description: "Highlights KPIs that significantly exceed internal targets",
//     isActive: true
//   },
//   {
//     id: "rule2",
//     name: "KPI is not linked to any BU or Department",
//     description: "Identifies KPIs without proper organizational alignment",
//     isActive: true
//   },
//   {
//     id: "rule3",
//     name: "KPI linked to multiple conflicting objectives",
//     description: "Flags KPIs that have contradictory objective linkages",
//     isActive: true
//   },
//   {
//     id: "rule4",
//     name: "KPI marked as strategic but shows < 10% contribution to objective",
//     description: "Identifies strategic KPIs with minimal impact",
//     isActive: true
//   },
//   {
//     id: "rule5",
//     name: "KPI performance < 60% for 2 consecutive quarters",
//     description: "Flags consistently underperforming KPIs",
//     isActive: true
//   },
//   {
//     id: "rule6",
//     name: "KPI status is \"On Track\" but actuals are below 50% of target",
//     description: "Identifies potentially miscategorized KPIs",
//     isActive: true
//   },
//   {
//     id: "rule7",
//     name: "KPI target not defined for current FY",
//     description: "Highlights KPIs missing target definitions",
//     isActive: true
//   },
//   {
//     id: "rule8",
//     name: "Objective has more than 5 KPIs of type \"Strategic\"",
//     description: "Flags objectives with too many strategic KPIs",
//     isActive: true
//   },
//   {
//     id: "rule9",
//     name: "Objective has no assigned KPI Owner",
//     description: "Identifies objectives lacking ownership",
//     isActive: true
//   },
//   {
//     id: "rule10",
//     name: "Operational KPI reported at BU level only",
//     description: "Highlights operational KPIs with limited reporting scope",
//     isActive: true
//   },
//   {
//     id: "rule11",
//     name: "Strategic Objective has 0 linked KPIs",
//     description: "Flags strategic objectives without associated KPIs",
//     isActive: true
//   }
// ];
