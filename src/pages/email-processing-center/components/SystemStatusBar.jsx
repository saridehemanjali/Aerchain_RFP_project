import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusBar = ({ systemStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'error':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'CheckCircle2';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Icon name="Activity" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">System Status</span>
            </div>
            {Object.entries(systemStatus)?.map(([key, { status, label, lastSync }]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(status)}`}>
                  <Icon name={getStatusIcon(status)} size={12} />
                  {label}
                </span>
                {lastSync && (
                  <span className="text-xs text-muted-foreground">
                    Last sync: {new Date(lastSync)?.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Icon name="Mail" size={14} />
              <span>{systemStatus?.emailsProcessed || 0} emails processed today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="Zap" size={14} />
              <span>{systemStatus?.aiCreditsRemaining || 0} AI credits remaining</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusBar;