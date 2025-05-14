
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Rule, defaultRules } from '@/types/rules';
import { nanoid } from 'nanoid';
import { useToast } from '@/components/ui/use-toast';

interface RulesContextType {
  rules: Rule[];
  toggleRule: (id: string) => void;
  addRule: (name: string, description: string) => void;
  deleteRule: (id: string) => void;
}

const RulesContext = createContext<RulesContextType | undefined>(undefined);

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

  return (
    <RulesContext.Provider value={{ rules, toggleRule, addRule, deleteRule }}>
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
