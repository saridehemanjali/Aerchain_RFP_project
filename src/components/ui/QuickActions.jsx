import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActions = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const actionsByRoute = {
    '/rfp-creation-workspace': [
      { icon: 'FileText', label: 'New RFP from Template', action: 'new-rfp-template' },
      { icon: 'Copy', label: 'Duplicate Existing RFP', action: 'duplicate-rfp' },
      { icon: 'Upload', label: 'Import Requirements', action: 'import-requirements' },
      { icon: 'Save', label: 'Save as Draft', action: 'save-draft' }
    ],
    '/vendor-management-console': [
      { icon: 'UserPlus', label: 'Add New Vendor', action: 'add-vendor' },
      { icon: 'Upload', label: 'Bulk Import Vendors', action: 'bulk-import' },
      { icon: 'Download', label: 'Export Vendor List', action: 'export-vendors' },
      { icon: 'Mail', label: 'Send Bulk Email', action: 'bulk-email' }
    ],
    '/email-processing-center': [
      { icon: 'RefreshCw', label: 'Sync Email Inbox', action: 'sync-inbox' },
      { icon: 'Filter', label: 'Apply Smart Filters', action: 'apply-filters' },
      { icon: 'Archive', label: 'Archive Processed', action: 'archive-processed' },
      { icon: 'Settings', label: 'Configure Rules', action: 'configure-rules' }
    ],
    '/rfp-status-tracking-hub': [
      { icon: 'Download', label: 'Export Status Report', action: 'export-report' },
      { icon: 'Bell', label: 'Set Status Alerts', action: 'set-alerts' },
      { icon: 'Filter', label: 'Apply Custom Filter', action: 'custom-filter' },
      { icon: 'RefreshCw', label: 'Refresh All Data', action: 'refresh-data' }
    ]
  };

  const currentActions = actionsByRoute?.[location?.pathname] || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleActionClick = (action) => {
    console.log('Quick action triggered:', action);
    setIsOpen(false);
  };

  if (currentActions?.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="default"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Zap"
        iconPosition="left"
        className="gap-2"
      >
        Quick Actions
        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
      </Button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg animate-fade-in z-[1100]">
          <div className="p-2">
            <div className="px-3 py-2 mb-1">
              <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Common tasks for this workflow
              </p>
            </div>
            <div className="space-y-1">
              {currentActions?.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleActionClick(action?.action)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-md hover:bg-muted transition-colors duration-200"
                >
                  <Icon name={action?.icon} size={18} color="var(--color-primary)" />
                  <span>{action?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;