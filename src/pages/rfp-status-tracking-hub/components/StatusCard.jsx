import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatusCard = ({ rfp, onStatusChange, onAssigneeChange, isDragging }) => {
  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-muted text-muted-foreground',
      distributed: 'bg-primary/10 text-primary',
      collecting: 'bg-warning/10 text-warning',
      evaluating: 'bg-accent/10 text-accent',
      decided: 'bg-success/10 text-success',
      closed: 'bg-muted text-muted-foreground'
    };
    return colors?.[status] || colors?.draft;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-muted-foreground'
    };
    return colors?.[priority] || colors?.low;
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(rfp?.deadline);
  const isUrgent = daysRemaining <= 3 && daysRemaining >= 0;
  const isOverdue = daysRemaining < 0;

  return (
    <div
      className={`bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 ${
        isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'
      }`}
      draggable
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-foreground line-clamp-1">
              {rfp?.title}
            </h3>
            <Icon
              name="GripVertical"
              size={16}
              color="var(--color-muted-foreground)"
              className="flex-shrink-0"
            />
          </div>
          <p className="text-xs text-muted-foreground">{rfp?.category}</p>
        </div>
        <Icon
          name="AlertCircle"
          size={16}
          className={getPriorityColor(rfp?.priority)}
        />
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Responses</span>
          <span className="font-medium text-foreground">
            {rfp?.responsesReceived}/{rfp?.vendorsInvited}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Deadline</span>
          <span
            className={`font-medium ${
              isOverdue
                ? 'text-error'
                : isUrgent
                ? 'text-warning' :'text-foreground'
            }`}
          >
            {isOverdue
              ? `${Math.abs(daysRemaining)} days overdue`
              : `${daysRemaining} days left`}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Assignee</span>
          <button
            onClick={() => onAssigneeChange(rfp?.id)}
            className="font-medium text-primary hover:underline"
          >
            {rfp?.assignee}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
            rfp?.status
          )}`}
        >
          {rfp?.status?.charAt(0)?.toUpperCase() + rfp?.status?.slice(1)}
        </span>
        {rfp?.hasNewActivity && (
          <span className="flex items-center gap-1 text-xs text-success">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
            New
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link to={`/rfp-creation-workspace?id=${rfp?.id}`} className="flex-1">
          <Button variant="outline" size="sm" fullWidth iconName="Eye" iconPosition="left">
            View
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreVertical"
          onClick={() => onStatusChange(rfp?.id)}
        />
      </div>
    </div>
  );
};

export default StatusCard;