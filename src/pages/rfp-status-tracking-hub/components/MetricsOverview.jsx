import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = ({ metrics }) => {
  const metricCards = [
    {
      id: 1,
      label: 'Active RFPs',
      value: metrics?.activeRfps,
      change: '+12%',
      trend: 'up',
      icon: 'FileText',
      color: 'var(--color-primary)'
    },
    {
      id: 2,
      label: 'Pending Responses',
      value: metrics?.pendingResponses,
      change: '-8%',
      trend: 'down',
      icon: 'Clock',
      color: 'var(--color-warning)'
    },
    {
      id: 3,
      label: 'Avg Response Time',
      value: `${metrics?.avgResponseTime}d`,
      change: '-15%',
      trend: 'down',
      icon: 'TrendingDown',
      color: 'var(--color-success)'
    },
    {
      id: 4,
      label: 'Completion Rate',
      value: `${metrics?.completionRate}%`,
      change: '+5%',
      trend: 'up',
      icon: 'CheckCircle2',
      color: 'var(--color-success)'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards?.map((metric) => (
        <div
          key={metric?.id}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Icon name={metric?.icon} size={20} color={metric?.color} />
            </div>
            <span
              className={`text-xs font-medium ${
                metric?.trend === 'up' ? 'text-success' : 'text-error'
              }`}
            >
              {metric?.change}
            </span>
          </div>

          <div>
            <p className="text-2xl font-bold text-foreground mb-1">
              {metric?.value}
            </p>
            <p className="text-sm text-muted-foreground">{metric?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;