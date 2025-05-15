
import React, { useRef } from 'react';
import { useRules } from '@/context/RulesContext';
import RuleItem from '@/components/rules/RuleItem';
import AddRuleDialog from '@/components/rules/AddRuleDialog';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const RulesPage: React.FC = () => {
  const { rules, toggleRule, deleteRule, exportRulesToCSV, importRulesFromCSV } = useRules();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type !== 'text/csv') {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a CSV file',
          variant: 'destructive',
        });
        return;
      }
      
      importRulesFromCSV(file);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

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
          <CardFooter className="flex justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {rules.length} rules configured
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={triggerFileInput}
              >
                <Upload className="h-4 w-4" />
                Import CSV
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={exportRulesToCSV}
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv"
                onChange={handleFileUpload}
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default RulesPage;
