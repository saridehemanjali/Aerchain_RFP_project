import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewQueueSidebar = ({ reviewItems, onItemClick, onBulkAction }) => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedItems, setSelectedItems] = useState([]);

  const tabs = [
    { id: 'pending', label: 'Pending Review', icon: 'Clock', count: reviewItems?.filter(i => i?.status === 'pending')?.length },
    { id: 'errors', label: 'Processing Errors', icon: 'AlertCircle', count: reviewItems?.filter(i => i?.status === 'error')?.length },
    { id: 'attachments', label: 'Attachments', icon: 'Paperclip', count: reviewItems?.filter(i => i?.type === 'attachment')?.length }
  ];

  const filteredItems = reviewItems?.filter(item => {
    if (selectedTab === 'pending') return item?.status === 'pending';
    if (selectedTab === 'errors') return item?.status === 'error';
    if (selectedTab === 'attachments') return item?.type === 'attachment';
    return true;
  });

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev?.includes(itemId) 
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems?.length === filteredItems?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems?.map(item => item?.id));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'validation':
        return 'CheckCircle2';
      case 'attachment':
        return 'Paperclip';
      case 'parsing':
        return 'FileSearch';
      case 'error':
        return 'AlertCircle';
      default:
        return 'AlertTriangle';
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border-l border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="ListChecks" size={20} color="var(--color-primary)" />
          <h2 className="text-lg font-semibold text-foreground">Review Queue</h2>
        </div>

        <div className="flex flex-col gap-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setSelectedTab(tab?.id)}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </div>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                selectedTab === tab?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {filteredItems?.length > 0 && (
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleSelectAll}
              className="text-xs font-medium text-primary hover:underline"
            >
              {selectedItems?.length === filteredItems?.length ? 'Deselect All' : 'Select All'}
            </button>
            {selectedItems?.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {selectedItems?.length} selected
              </span>
            )}
          </div>
          {selectedItems?.length > 0 && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                iconName="CheckCircle2"
                iconPosition="left"
                onClick={() => onBulkAction('approve', selectedItems)}
                className="flex-1"
              >
                Approve
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                iconName="XCircle"
                iconPosition="left"
                onClick={() => onBulkAction('reject', selectedItems)}
                className="flex-1"
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {filteredItems?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Icon name="CheckCircle2" size={48} color="var(--color-success)" className="mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">All Clear!</p>
            <p className="text-xs text-muted-foreground">No items require review</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredItems?.map((item) => (
              <div
                key={item?.id}
                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onItemClick(item?.id)}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(item?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      handleSelectItem(item?.id);
                    }}
                    className="mt-1 w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={getTypeIcon(item?.type)} size={16} color="var(--color-primary)" />
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(item?.priority)}`}>
                        {item?.priority}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {item?.title}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {item?.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Mail" size={12} />
                      <span className="truncate">{item?.emailSubject}</span>
                    </div>
                    {item?.fieldName && (
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Icon name="Tag" size={12} />
                        <span>{item?.fieldName}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Icon name="Clock" size={12} />
                      <span>{new Date(item.createdAt)?.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewQueueSidebar;