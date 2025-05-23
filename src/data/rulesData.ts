import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Rule } from "@/types/rules";

export function useRulesData(csvUrl: string) {
  const [rules, setRules] = useState<Rule[]>([]);
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
              id: row.id,
              name: row.name,
              description: row.description,
              isActive: String(row.isActive).toLowerCase() === "true"
            }));
            setRules(parsed);
            setLoading(false);
          }
        });
      });
  }, [csvUrl]);

  return { rules, loading };
}