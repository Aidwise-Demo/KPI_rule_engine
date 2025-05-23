
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Rule, defaultRules } from '@/types/rules';
import { nanoid } from 'nanoid';
import { useToast } from '@/components/ui/use-toast';

interface RulesContextType {
  rules: Rule[];
  toggleRule: (id: string) => void;
  addRule: (name: string, description: string) => void;
  deleteRule: (id: string) => void;
  exportRulesToCSV: () => void;
  importRulesFromCSV: (file: File) => Promise<void>;
}

const RulesContext = createContext<RulesContextType | undefined>(undefined);

// Local Storage key
const RULES_STORAGE_KEY = 'kpi-dashboard-rules';

export const RulesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rules, setRules] = useState<Rule[]>(defaultRules);
  const { toast } = useToast();

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
    
    const rule = rules.find(r => r.id === id);
    if (rule) {
      toast({
        title: `Rule ${rule.isActive ? "disabled" : "enabled"}`,
        description: rule.name
      });
    }
  };

  const addRule = (name: string, description: string) => {
    const newRule: Rule = {
      id: nanoid(),
      name,
      description,
      isActive: true
    };
    
    setRules([...rules, newRule]);
    toast({
      title: "Rule added",
      description: name
    });
  };

  const deleteRule = (id: string) => {
    const rule = rules.find(r => r.id === id);
    setRules(rules.filter(rule => rule.id !== id));
    
    if (rule) {
      toast({
        title: "Rule deleted",
        description: rule.name,
        variant: "destructive"
      });
    }
  };

  // Export rules to CSV
  const exportRulesToCSV = () => {
    const csvContent = convertRulesToCSV(rules);
    downloadCSV(csvContent, 'kpi-rules.csv');
    
    toast({
      title: "Rules exported",
      description: `${rules.length} rules exported to CSV`
    });
  };

  // Import rules from CSV
  const importRulesFromCSV = async (file: File): Promise<void> => {
    try {
      const content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string || '');
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      });
      
      const importedRules = parseRulesCSV(content);
      
      if (importedRules.length === 0) {
        toast({
          title: "Import failed",
          description: "No valid rules found in CSV file",
          variant: "destructive"
        });
        return;
      }
      
      setRules(importedRules);
      saveRulesToStorage(importedRules);
      
      toast({
        title: "Rules imported",
        description: `${importedRules.length} rules imported from CSV`
      });
    } catch (error) {
      console.error('Error importing CSV:', error);
      toast({
        title: "Import failed",
        description: "Could not read the CSV file",
        variant: "destructive"
      });
    }
  };

  return (
    <RulesContext.Provider value={{ 
      rules, 
      toggleRule, 
      addRule, 
      deleteRule,
      exportRulesToCSV,
      importRulesFromCSV
    }}>
      {children}
    </RulesContext.Provider>
  );
};

export const useRules = () => {
  const context = useContext(RulesContext);
  if (context === undefined) {
    throw new Error('useRules must be used within a RulesProvider');
  }
  return context;
};