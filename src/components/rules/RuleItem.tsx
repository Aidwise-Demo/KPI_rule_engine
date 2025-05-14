
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { Rule } from '@/types/rules';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RuleItemProps {
  rule: Rule;
  onToggle: () => void;
  onDelete: () => void;
}

const RuleItem: React.FC<RuleItemProps> = ({ rule, onToggle, onDelete }) => {
  return (
    <Card className={cn("mb-4 transition-all", 
      !rule.isActive && "opacity-60")}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-base">{rule.name}</h3>
          <p className="text-sm text-muted-foreground">{rule.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <Switch
            checked={rule.isActive}
            onCheckedChange={onToggle}
            aria-label={`Toggle ${rule.name}`}
          />
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
