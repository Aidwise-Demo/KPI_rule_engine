
import React from 'react';
import { useRules } from '@/context/RulesContext';
import RuleItem from '@/components/rules/RuleItem';
import AddRuleDialog from '@/components/rules/AddRuleDialog';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const RulesPage: React.FC = () => {
  const { rules, toggleRule, deleteRule } = useRules();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Rules Engine</h1>
          <AddRuleDialog />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>KPI Rules Configuration</CardTitle>
            <CardDescription>
              Enable or disable rules to customize how the KPI dashboard analyzes and flags issues
            </CardDescription>
          </CardHeader>
          <CardContent>
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
