// src/data/useRulesApi.ts
import { useEffect, useState } from "react";
import { Rule } from "@/types/rules";

export function useRulesApi() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rules")
      .then(res => res.json())
      .then(data => {
        setRules(data);
        setLoading(false);
      });
  }, []);

  return { rules, loading };
}