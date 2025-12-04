import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const statusOptions = [
    { value: 'draft', label: 'Move to Draft' },
    { value: 'distributed', label: 'Move to Distributed' },
    { value: 'collecting', label: 'Move to Collecting' },
    { value: 'evaluating', label: 'Move to Evaluating' },
    { value: 'decided', label: 'Move to Decided' },
    { value: 'closed', label: 'Move to Closed' }
  ];

  const assigneeOptions = [
    { value: 'sarah-chen', label: 'Assign to Sarah Chen' },
    { value: 'michael-rodriguez', label: 'Assign to Michael Rodriguez' },
    { value: 'emily-watson', label: 'Assign to Emily Watson' },
    { value: 'david-kim', label: 'Assign to David Kim' }
  ];

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] animate-fade-in">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-[600px]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Icon name="CheckSquare" size={20} color="var(--color-primary)" />
              <span className="text-sm font-semibold text-foreground">
                {selectedCount} RFP{selectedCount > 1 ? 's' : ''} selected
              </span>
            </div>

            <div className="h-6 w-px bg-border" />

            <div className="flex items-center gap-2">
              <Select
                options={statusOptions}
                value=""
                onChange={(value) => onBulkAction('status', value)}
                placeholder="Change Status"
                className="w-48"
              />

              <Select
                options={assigneeOptions}
                value=""
                onChange={(value) => onBulkAction('assignee', value)}
                placeholder="Reassign"
                className="w-48"
              />

              <Button
                variant="outline"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => onBulkAction('deadline')}
              >
                Extend Deadline
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearSelection}
          />
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;