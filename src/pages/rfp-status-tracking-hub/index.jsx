import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import QuickActions from '../../components/ui/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StatusColumn from './components/StatusColumn';
import FilterSidebar from './components/FilterSidebar';
import TimelineView from './components/TimelineView';
import BulkActionsBar from './components/BulkActionsBar';
import IntegrationStatus from './components/IntegrationStatus';
import MetricsOverview from './components/MetricsOverview';

const RFPStatusTrackingHub = () => {
  const [viewMode, setViewMode] = useState('board');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedRfps, setSelectedRfps] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
    priority: 'all',
    assignee: 'all',
    overdue: false,
    urgent: false,
    upcoming: false,
    hasNewActivity: false,
    awaitingResponse: false
  });
  const [savedPresets, setSavedPresets] = useState([]);

  const mockRfps = [
    {
      id: 'rfp-001',
      title: 'Cloud Infrastructure Migration Services',
      category: 'IT Services',
      status: 'distributed',
      priority: 'high',
      deadline: '2025-12-10',
      vendorsInvited: 12,
      responsesReceived: 8,
      assignee: 'Sarah Chen',
      hasNewActivity: true,
      createdDate: '2025-11-15'
    },
    {
      id: 'rfp-002',
      title: 'Enterprise CRM Software Implementation',
      category: 'Software',
      status: 'collecting',
      priority: 'high',
      deadline: '2025-12-05',
      vendorsInvited: 8,
      responsesReceived: 6,
      assignee: 'Michael Rodriguez',
      hasNewActivity: true,
      createdDate: '2025-11-18'
    },
    {
      id: 'rfp-003',
      title: 'Digital Marketing Campaign Management',
      category: 'Marketing',
      status: 'evaluating',
      priority: 'medium',
      deadline: '2025-12-15',
      vendorsInvited: 15,
      responsesReceived: 12,
      assignee: 'Emily Watson',
      hasNewActivity: false,
      createdDate: '2025-11-10'
    },
    {
      id: 'rfp-004',
      title: 'Data Center Hardware Procurement',
      category: 'Hardware',
      status: 'draft',
      priority: 'medium',
      deadline: '2025-12-20',
      vendorsInvited: 0,
      responsesReceived: 0,
      assignee: 'David Kim',
      hasNewActivity: false,
      createdDate: '2025-11-28'
    },
    {
      id: 'rfp-005',
      title: 'Cybersecurity Consulting Services',
      category: 'Consulting',
      status: 'decided',
      priority: 'high',
      deadline: '2025-11-30',
      vendorsInvited: 10,
      responsesReceived: 9,
      assignee: 'Sarah Chen',
      hasNewActivity: false,
      createdDate: '2025-11-05'
    },
    {
      id: 'rfp-006',
      title: 'Office Space Renovation Project',
      category: 'Facilities',
      status: 'collecting',
      priority: 'low',
      deadline: '2025-12-25',
      vendorsInvited: 6,
      responsesReceived: 3,
      assignee: 'Michael Rodriguez',
      hasNewActivity: true,
      createdDate: '2025-11-20'
    },
    {
      id: 'rfp-007',
      title: 'Employee Training Platform',
      category: 'Software',
      status: 'distributed',
      priority: 'medium',
      deadline: '2025-12-12',
      vendorsInvited: 7,
      responsesReceived: 4,
      assignee: 'Emily Watson',
      hasNewActivity: false,
      createdDate: '2025-11-22'
    },
    {
      id: 'rfp-008',
      title: 'Network Security Audit',
      category: 'IT Services',
      status: 'closed',
      priority: 'high',
      deadline: '2025-11-25',
      vendorsInvited: 5,
      responsesReceived: 5,
      assignee: 'David Kim',
      hasNewActivity: false,
      createdDate: '2025-11-01'
    }
  ];

  const metrics = {
    activeRfps: 42,
    pendingResponses: 28,
    avgResponseTime: 4.2,
    completionRate: 87
  };

  const statusOrder = ['draft', 'distributed', 'collecting', 'evaluating', 'decided', 'closed'];

  const filterRfps = (rfps) => {
    return rfps?.filter((rfp) => {
      if (filters?.search && !rfp?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
        return false;
      }
      if (filters?.status !== 'all' && rfp?.status !== filters?.status) {
        return false;
      }
      if (filters?.category !== 'all' && rfp?.category?.toLowerCase()?.replace(/\s+/g, '-') !== filters?.category) {
        return false;
      }
      if (filters?.priority !== 'all' && rfp?.priority !== filters?.priority) {
        return false;
      }
      if (filters?.assignee !== 'all' && rfp?.assignee?.toLowerCase()?.replace(/\s+/g, '-') !== filters?.assignee) {
        return false;
      }

      const today = new Date();
      const deadline = new Date(rfp.deadline);
      const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

      if (filters?.overdue && daysRemaining >= 0) {
        return false;
      }
      if (filters?.urgent && (daysRemaining > 3 || daysRemaining < 0)) {
        return false;
      }
      if (filters?.upcoming && (daysRemaining > 7 || daysRemaining < 0)) {
        return false;
      }
      if (filters?.hasNewActivity && !rfp?.hasNewActivity) {
        return false;
      }
      if (filters?.awaitingResponse && rfp?.responsesReceived >= rfp?.vendorsInvited) {
        return false;
      }

      return true;
    });
  };

  const filteredRfps = filterRfps(mockRfps);

  const groupedRfps = statusOrder?.reduce((acc, status) => {
    acc[status] = filteredRfps?.filter((rfp) => rfp?.status === status);
    return acc;
  }, {});

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        search: '',
        status: 'all',
        category: 'all',
        priority: 'all',
        assignee: 'all',
        overdue: false,
        urgent: false,
        upcoming: false,
        hasNewActivity: false,
        awaitingResponse: false
      });
    } else if (key === 'loadPreset') {
      setFilters(value?.filters);
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSavePreset = (name, currentFilters) => {
    const newPreset = {
      name,
      filters: { ...currentFilters }
    };
    setSavedPresets((prev) => [...prev, newPreset]);
  };

  const handleStatusChange = (rfpId) => {
    console.log('Status change requested for RFP:', rfpId);
  };

  const handleAssigneeChange = (rfpId) => {
    console.log('Assignee change requested for RFP:', rfpId);
  };

  const handleBulkAction = (action, value) => {
    console.log('Bulk action:', action, 'Value:', value, 'Selected RFPs:', selectedRfps);
  };

  const handleClearSelection = () => {
    setSelectedRfps([]);
  };

  const handleExport = () => {
    console.log('Exporting status report...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16 h-screen">
        {showFilters && (
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onSavePreset={handleSavePreset}
            savedPresets={savedPresets}
          />
        )}

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="bg-card border-b border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  RFP Status Tracking Hub
                </h1>
                <p className="text-sm text-muted-foreground">
                  Monitor procurement workflows and track RFP progress in real-time
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="default"
                  iconName={showFilters ? 'PanelLeftClose' : 'PanelLeft'}
                  onClick={() => setShowFilters(!showFilters)}
                />

                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('board')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'board' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="LayoutGrid" size={16} />
                    Board
                  </button>
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'timeline' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="Clock" size={16} />
                    Timeline
                  </button>
                </div>

                <QuickActions />

                <Button
                  variant="outline"
                  size="default"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExport}
                >
                  Export Report
                </Button>
              </div>
            </div>

            <MetricsOverview metrics={metrics} />
          </div>

          <div className="flex-1 overflow-hidden p-6">
            {viewMode === 'board' ? (
              <div className="h-full overflow-x-auto">
                <div className="flex gap-4 h-full pb-4">
                  {statusOrder?.map((status) => (
                    <StatusColumn
                      key={status}
                      status={status}
                      rfps={groupedRfps?.[status]}
                      onStatusChange={handleStatusChange}
                      onAssigneeChange={handleAssigneeChange}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 overflow-y-auto h-full">
                <IntegrationStatus />
                <TimelineView rfp={filteredRfps?.[0]} />
              </div>
            )}
          </div>
        </div>
      </div>
      <BulkActionsBar
        selectedCount={selectedRfps?.length}
        onBulkAction={handleBulkAction}
        onClearSelection={handleClearSelection}
      />
    </div>
  );
};

export default RFPStatusTrackingHub;