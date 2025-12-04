import React from 'react';
import Icon from '../../../components/AppIcon';
import StatusCard from './StatusCard';

const StatusColumn = ({ status, rfps, onStatusChange, onAssigneeChange }) => {
  const getColumnConfig = (status) => {
    const configs = {
      draft: {
        title: 'Draft',
        icon: 'FileEdit',
        color: 'var(--color-muted-foreground)',
        bgColor: 'bg-muted/50'
      },
      distributed: {
        title: 'Distributed',
        icon: 'Send',
        color: 'var(--color-primary)',
        bgColor: 'bg-primary/5'
      },
      collecting: {
        title: 'Collecting Responses',
        icon: 'Inbox',
        color: 'var(--color-warning)',
        bgColor: 'bg-warning/5'
      },
      evaluating: {
        title: 'Evaluating',
        icon: 'BarChart3',
        color: 'var(--color-accent)',
        bgColor: 'bg-accent/5'
      },
      decided: {
        title: 'Decision Made',
        icon: 'CheckCircle2',
        color: 'var(--color-success)',
        bgColor: 'bg-success/5'
      },
      closed: {
        title: 'Closed',
        icon: 'Archive',
        color: 'var(--color-muted-foreground)',
        bgColor: 'bg-muted/50'
      }
    };
    return configs?.[status] || configs?.draft;
  };

  const config = getColumnConfig(status);

  return (
    <div className="flex flex-col h-full min-w-[320px]">
      <div className={`${config?.bgColor} rounded-t-lg p-4 border-b border-border`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name={config?.icon} size={20} color={config?.color} />
            <h2 className="text-sm font-semibold text-foreground">{config?.title}</h2>
          </div>
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-background text-xs font-medium text-foreground">
            {rfps?.length}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/50">
        {rfps?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icon name="Inbox" size={32} color="var(--color-muted-foreground)" />
            <p className="text-sm text-muted-foreground mt-2">No RFPs in this stage</p>
          </div>
        ) : (
          rfps?.map((rfp) => (
            <StatusCard
              key={rfp?.id}
              rfp={rfp}
              onStatusChange={onStatusChange}
              onAssigneeChange={onAssigneeChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StatusColumn;