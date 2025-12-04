import React from 'react';
import Icon from '../../../components/AppIcon';

const TimelineView = ({ rfp }) => {
  const timelineEvents = [
    {
      id: 1,
      status: 'draft',
      title: 'RFP Created',
      description: 'Initial draft created by Sarah Chen',
      timestamp: '2025-11-15 09:30 AM',
      icon: 'FileEdit',
      color: 'var(--color-muted-foreground)'
    },
    {
      id: 2,
      status: 'distributed',
      title: 'Distributed to Vendors',
      description: '12 vendors invited to participate',
      timestamp: '2025-11-18 02:15 PM',
      icon: 'Send',
      color: 'var(--color-primary)'
    },
    {
      id: 3,
      status: 'collecting',
      title: 'Response Collection Started',
      description: 'First vendor response received',
      timestamp: '2025-11-20 10:45 AM',
      icon: 'Inbox',
      color: 'var(--color-warning)'
    },
    {
      id: 4,
      status: 'collecting',
      title: 'Follow-up Sent',
      description: 'Reminder sent to 5 pending vendors',
      timestamp: '2025-11-25 03:00 PM',
      icon: 'Mail',
      color: 'var(--color-warning)'
    },
    {
      id: 5,
      status: 'evaluating',
      title: 'Evaluation Phase Started',
      description: '9 responses received, evaluation in progress',
      timestamp: '2025-11-28 09:00 AM',
      icon: 'BarChart3',
      color: 'var(--color-accent)'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">RFP Timeline</h3>
        <button className="text-sm text-primary hover:underline">
          View Full History
        </button>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-6">
          {timelineEvents?.map((event, index) => (
            <div key={event?.id} className="relative flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center z-10">
                <Icon name={event?.icon} size={16} color={event?.color} />
              </div>

              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-semibold text-foreground">
                    {event?.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {event?.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;