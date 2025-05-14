
import React from 'react';
import { useRules } from '@/context/RulesContext';
import RuleItem from '@/components/rules/RuleItem';
import AddRuleDialog from '@/components/rules/AddRuleDialog';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const RulesPage: React.FC = () => {
  const { rules, toggleRule, deleteRule } = useRules();

  return (
    <Layout className="bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Rules Engine</h1>
          </div>
          <AddRuleDialog />
        </div>

        <Card className="shadow-md border-t-4 border-t-primary">
          <CardHeader className="bg-card/50">
            <CardTitle>KPI Rules Configuration</CardTitle>
            <CardDescription>
              Enable or disable rules to customize how the KPI dashboard analyzes and flags issues
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {rules.map((rule) => (
                <RuleItem
                  key={rule.id}
                  rule={rule}
                  onToggle={() => toggleRule(rule.id)}
                  onDelete={() => deleteRule(rule.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RulesPage;
