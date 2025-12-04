import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusIndicator = ({ status, message }) => {
  const statusConfig = {
    idle: {
      icon: 'Circle',
      color: 'var(--color-muted-foreground)',
      bgColor: 'bg-muted',
      text: 'Ready'
    },
    processing: {
      icon: 'Loader',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10',
      text: 'Processing...'
    },
    success: {
      icon: 'CheckCircle2',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10',
      text: 'Success'
    },
    error: {
      icon: 'AlertCircle',
      color: 'var(--color-error)',
      bgColor: 'bg-error/10',
      text: 'Error'
    },
    warning: {
      icon: 'AlertTriangle',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10',
      text: 'Warning'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.idle;

  return (
    <div className={`flex items-center gap-2 px-3 py-2 ${config?.bgColor} rounded-md`}>
      <Icon
        name={config?.icon}
        size={16}
        color={config?.color}
        className={status === 'processing' ? 'animate-spin' : ''}
      />
      <span className="text-sm font-medium text-foreground">
        {message || config?.text}
      </span>
    </div>
  );
};

export default StatusIndicator;