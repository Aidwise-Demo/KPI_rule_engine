
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, BanIcon } from 'lucide-react';
import { Rule } from '@/types/rules';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RuleItemProps {
  rule: Rule;
  onToggle: () => void;
  onDelete: () => void;
}

const RuleItem: React.FC<RuleItemProps> = ({ rule, onToggle, onDelete }) => {
  const handleToggle = () => {
    console.log(`Toggle rule: ${rule.id} - ${rule.name} (current: ${rule.isActive})`);
    onToggle();
  };

  return (
    <Card className={cn("mb-4 transition-all", 
      !rule.isActive && "opacity-60")}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-base">{rule.name}</h3>
          <p className="text-sm text-muted-foreground">{rule.description}</p>
          {rule.isActive && (
            <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
              <BanIcon size={12} />
              KPIs matching this rule are hidden
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <Switch
              checked={rule.isActive}
              onCheckedChange={handleToggle}
              aria-label={`Toggle ${rule.name}`}
            />
            <span className="text-xs text-muted-foreground mt-1">
              {rule.isActive ? 'Hide matches' : 'Show all'}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onDelete}
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RuleItem;
