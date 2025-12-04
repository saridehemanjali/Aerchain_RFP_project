import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationStatus = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const integrations = [
    {
      id: 1,
      name: 'Email System',
      status: 'active',
      lastSync: '2 minutes ago',
      icon: 'Mail',
      description: 'Connected to Exchange Server'
    },
    {
      id: 2,
      name: 'Calendar Sync',
      status: 'active',
      lastSync: '5 minutes ago',
      icon: 'Calendar',
      description: 'Syncing deadlines and meetings'
    },
    {
      id: 3,
      name: 'ERP Integration',
      status: 'warning',
      lastSync: '1 hour ago',
      icon: 'Database',
      description: 'Slow response detected'
    },
    {
      id: 4,
      name: 'Document Storage',
      status: 'active',
      lastSync: '10 minutes ago',
      icon: 'FolderOpen',
      description: 'All files synchronized'
    }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      active: {
        color: 'bg-success',
        textColor: 'text-success',
        label: 'Active'
      },
      warning: {
        color: 'bg-warning',
        textColor: 'text-warning',
        label: 'Warning'
      },
      error: {
        color: 'bg-error',
        textColor: 'text-error',
        label: 'Error'
      }
    };
    return configs?.[status] || configs?.active;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon name="Zap" size={20} color="var(--color-primary)" />
          <h3 className="text-sm font-semibold text-foreground">
            System Integrations
          </h3>
          <div className="flex items-center gap-1">
            {integrations?.map((integration) => (
              <span
                key={integration?.id}
                className={`w-2 h-2 rounded-full ${
                  getStatusConfig(integration?.status)?.color
                }`}
              />
            ))}
          </div>
        </div>
        <Icon
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          size={20}
          color="var(--color-muted-foreground)"
        />
      </button>
      {isExpanded && (
        <div className="border-t border-border p-4 space-y-3">
          {integrations?.map((integration) => {
            const statusConfig = getStatusConfig(integration?.status);
            return (
              <div
                key={integration?.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    name={integration?.icon}
                    size={20}
                    color="var(--color-foreground)"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">
                      {integration?.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {integration?.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${statusConfig?.color}`}
                      />
                      <span className={`text-xs font-medium ${statusConfig?.textColor}`}>
                        {statusConfig?.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {integration?.lastSync}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RefreshCw"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IntegrationStatus;