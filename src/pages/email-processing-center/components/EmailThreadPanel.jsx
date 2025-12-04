import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmailThreadPanel = ({ emails, selectedEmailId, onEmailSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredEmails = emails?.filter(email => {
    const matchesSearch = email?.subject?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         email?.sender?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesFilter = filterStatus === 'all' || email?.processingStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed':
        return 'text-success bg-success/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'pending':
        return 'text-muted-foreground bg-muted';
      case 'error':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processed':
        return 'CheckCircle2';
      case 'processing':
        return 'Loader2';
      case 'pending':
        return 'Clock';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Mail';
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const emailDate = new Date(date);
    const diffMs = now - emailDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return emailDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Inbox" size={20} color="var(--color-primary)" />
          <h2 className="text-lg font-semibold text-foreground">Email Threads</h2>
          <span className="ml-auto px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
            {filteredEmails?.length}
          </span>
        </div>

        <div className="relative mb-3">
          <Icon 
            name="Search" 
            size={18} 
            color="var(--color-muted-foreground)" 
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'pending', 'processing', 'processed', 'error']?.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredEmails?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="Inbox" size={48} color="var(--color-muted-foreground)" className="mb-4" />
            <p className="text-sm text-muted-foreground">No emails found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredEmails?.map((email) => (
              <button
                key={email?.id}
                onClick={() => onEmailSelect(email?.id)}
                className={`w-full p-4 text-left transition-colors hover:bg-muted/50 ${
                  selectedEmailId === email?.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <Image
                    src={email?.senderAvatar}
                    alt={email?.senderAvatarAlt}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-foreground truncate">
                        {email?.sender}
                      </span>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {formatDate(email?.receivedAt)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground font-medium mb-1 truncate">
                      {email?.subject}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {email?.preview}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(email?.processingStatus)}`}>
                        <Icon name={getStatusIcon(email?.processingStatus)} size={12} />
                        {email?.processingStatus}
                      </span>
                      {email?.attachmentCount > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-foreground bg-muted rounded-md">
                          <Icon name="Paperclip" size={12} />
                          {email?.attachmentCount}
                        </span>
                      )}
                      {email?.requiresReview && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-warning bg-warning/10 rounded-md">
                          <Icon name="AlertTriangle" size={12} />
                          Review
                        </span>
                      )}
                      {email?.rfpReference && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-md">
                          <Icon name="FileText" size={12} />
                          {email?.rfpReference}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailThreadPanel;