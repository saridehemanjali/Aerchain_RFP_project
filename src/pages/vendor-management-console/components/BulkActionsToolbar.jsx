import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsToolbar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Select bulk action...', disabled: true },
    { value: 'send-email', label: 'Send Email Campaign' },
    { value: 'update-category', label: 'Update Category' },
    { value: 'update-status', label: 'Change Status' },
    { value: 'assign-tag', label: 'Assign Tags' },
    { value: 'export-data', label: 'Export Selected Data' },
    { value: 'schedule-review', label: 'Schedule Performance Review' },
    { value: 'send-rfp', label: 'Send RFP Invitation' },
    { value: 'archive', label: 'Archive Vendors' }
  ];

  const handleExecuteAction = async () => {
    if (!selectedAction) return;

    setIsProcessing(true);
    await onBulkAction(selectedAction);
    setIsProcessing(false);
    setSelectedAction('');
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-card border border-border rounded-lg shadow-lg px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="CheckSquare" size={18} color="var(--color-primary)" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {selectedCount} vendor{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-3">
          <Select
            options={bulkActionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
            placeholder="Choose action"
            className="w-64"
          />

          <Button
            variant="default"
            size="sm"
            onClick={handleExecuteAction}
            disabled={!selectedAction || isProcessing}
            loading={isProcessing}
            iconName="Play"
            iconPosition="left"
          >
            Execute
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Clear
          </Button>
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBulkAction('export-selected')}
            title="Export selected vendors"
          >
            <Icon name="Download" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBulkAction('print-selected')}
            title="Print selected vendors"
          >
            <Icon name="Printer" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;