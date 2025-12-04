import React from 'react';
import Icon from '../../../components/AppIcon';

const VendorStatsCards = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Vendors',
      value: stats?.totalVendors,
      change: '+12',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      label: 'Active Vendors',
      value: stats?.activeVendors,
      change: '+8',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      label: 'Pending Approval',
      value: stats?.pendingVendors,
      change: '-3',
      changeType: 'positive',
      icon: 'Clock',
      color: 'warning'
    },
    {
      label: 'Avg Performance',
      value: `${stats?.avgPerformance}%`,
      change: '+2.5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'primary'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      error: 'bg-error/10 text-error'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${getColorClasses(stat?.color)} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat?.changeType === 'positive' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
              {stat?.change}
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">{stat?.value}</p>
            <p className="text-sm text-muted-foreground">{stat?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorStatsCards;