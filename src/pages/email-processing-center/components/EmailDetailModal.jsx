import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmailDetailModal = ({ email, onClose, onReprocess }) => {
  const [activeTab, setActiveTab] = useState('content');

  if (!email) return null;

  const tabs = [
    { id: 'content', label: 'Email Content', icon: 'Mail' },
    { id: 'attachments', label: 'Attachments', icon: 'Paperclip', count: email?.attachments?.length || 0 },
    { id: 'history', label: 'Processing History', icon: 'History' }
  ];

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-lg shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Image
              src={email?.senderAvatar}
              alt={email?.senderAvatarAlt}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-foreground">{email?.subject}</h2>
              <p className="text-sm text-muted-foreground">From: {email?.sender}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab?.id
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.count !== undefined && tab?.count > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                  {tab?.count}
                </span>
              )}
              {activeTab === tab?.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Received</span>
                  <p className="text-sm text-foreground mt-1">
                    {new Date(email.receivedAt)?.toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Status</span>
                  <p className="text-sm text-foreground mt-1 capitalize">{email?.processingStatus}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">RFP Reference</span>
                  <p className="text-sm text-foreground mt-1">{email?.rfpReference || 'Not linked'}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Confidence Score</span>
                  <p className="text-sm text-foreground mt-1">{email?.confidenceScore}%</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Email Body</h3>
                <div className="p-4 bg-background border border-border rounded-lg">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{email?.body}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="space-y-3">
              {email?.attachments && email?.attachments?.length > 0 ? (
                email?.attachments?.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
                        <Icon name="FileText" size={20} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{attachment?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {attachment?.size} • {attachment?.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                        attachment?.parsed 
                          ? 'text-success bg-success/10' :'text-warning bg-warning/10'
                      }`}>
                        {attachment?.parsed ? 'Parsed' : 'Pending'}
                      </span>
                      <Button size="sm" variant="outline" iconName="Download" iconPosition="left">
                        Download
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Icon name="Paperclip" size={48} color="var(--color-muted-foreground)" className="mb-3" />
                  <p className="text-sm text-muted-foreground">No attachments in this email</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {email?.processingHistory && email?.processingHistory?.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      event?.status === 'success' ?'bg-success/10' 
                        : event?.status === 'error' ?'bg-error/10' :'bg-warning/10'
                    }`}>
                      <Icon 
                        name={event?.status === 'success' ? 'CheckCircle2' : event?.status === 'error' ? 'XCircle' : 'Clock'} 
                        size={16} 
                        color={event?.status === 'success' ? 'var(--color-success)' : event?.status === 'error' ? 'var(--color-error)' : 'var(--color-warning)'}
                      />
                    </div>
                    {index < email?.processingHistory?.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="text-sm font-medium text-foreground">{event?.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event?.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(event.timestamp)?.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            variant="default"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => onReprocess(email?.id)}
          >
            Reprocess Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailDetailModal;