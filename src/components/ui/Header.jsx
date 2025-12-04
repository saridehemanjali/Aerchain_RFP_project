import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const searchRef = useRef(null);
  const statusRef = useRef(null);

  const navigationItems = [
    {
      path: '/rfp-creation-workspace',
      label: 'Create RFP',
      icon: 'FileText',
      tooltip: 'Create new RFPs and convert requirements'
    },
    {
      path: '/vendor-management-console',
      label: 'Manage Vendors',
      icon: 'Users',
      tooltip: 'Maintain supplier relationships and vendor data'
    },
    {
      path: '/email-processing-center',
      label: 'Process Responses',
      icon: 'Mail',
      tooltip: 'Handle automated email parsing and responses'
    },
    {
      path: '/rfp-status-tracking-hub',
      label: 'Track Status',
      icon: 'BarChart3',
      tooltip: 'Monitor procurement progress and RFP status'
    }
  ];

  const systemStatus = {
    emailSync: { status: 'active', label: 'Email Sync' },
    aiProcessing: { status: 'active', label: 'AI Processing' },
    erpIntegration: { status: 'warning', label: 'ERP Integration' }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsSearchOpen(false);
      }
      if (statusRef?.current && !statusRef?.current?.contains(event?.target)) {
        setIsStatusOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if ((event?.ctrlKey || event?.metaKey) && event?.key === 'k') {
        event?.preventDefault();
        setIsSearchOpen(true);
      }
      if (event?.key === 'Escape') {
        setIsSearchOpen(false);
        setIsStatusOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'error':
        return 'bg-error';
      default:
        return 'bg-muted';
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    console.log('Search query:', searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border shadow-sm">
      <div className="flex items-center h-16 px-6">
        <Link 
          to="/" 
          className="flex items-center gap-3 mr-8 transition-opacity duration-200 hover:opacity-80"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name="FileText" size={24} color="var(--color-primary)" />
          </div>
          <span className="text-lg font-semibold text-foreground">RFP Manager Pro</span>
        </Link>

        <nav className="flex items-center gap-1 flex-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                transition-all duration-200 ease-in-out
                ${isActiveRoute(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
              {isActiveRoute(item?.path) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 ml-4">
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-muted rounded-md hover:bg-muted/80 transition-colors duration-200"
            >
              <Icon name="Search" size={16} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-background border border-border rounded">
                <span>⌘</span>K
              </kbd>
            </button>

            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-popover border border-border rounded-lg shadow-lg animate-fade-in z-[1100]">
                <form onSubmit={handleSearchSubmit} className="p-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-background border border-input rounded-md">
                    <Icon name="Search" size={18} color="var(--color-muted-foreground)" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      placeholder="Search vendors, RFPs, emails..."
                      className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                      autoFocus
                    />
                  </div>
                </form>
                {searchQuery && (
                  <div className="border-t border-border p-2">
                    <p className="px-3 py-2 text-sm text-muted-foreground">
                      No results found for "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative" ref={statusRef}>
            <button
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors duration-200"
              title="System Status"
            >
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${getStatusColor('active')}`} />
                <span className={`w-2 h-2 rounded-full ${getStatusColor('active')}`} />
                <span className={`w-2 h-2 rounded-full ${getStatusColor('warning')}`} />
              </div>
              <Icon name="ChevronDown" size={16} color="var(--color-muted-foreground)" />
            </button>

            {isStatusOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg animate-fade-in z-[1200]">
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-foreground mb-3">System Status</h3>
                  <div className="space-y-2">
                    {Object.entries(systemStatus)?.map(([key, { status, label }]) => (
                      <div key={key} className="flex items-center justify-between py-2">
                        <span className="text-sm text-foreground">{label}</span>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
                          <span className="text-xs text-muted-foreground capitalize">{status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;