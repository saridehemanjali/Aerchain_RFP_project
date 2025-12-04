import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const VendorFilters = ({ onFilterChange, activeFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    searchQuery: activeFilters?.searchQuery || '',
    categories: activeFilters?.categories || [],
    performanceMin: activeFilters?.performanceMin || 0,
    performanceMax: activeFilters?.performanceMax || 100,
    regions: activeFilters?.regions || [],
    certifications: activeFilters?.certifications || [],
    status: activeFilters?.status || 'all'
  });

  const categoryOptions = [
    { value: 'it-services', label: 'IT Services' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'logistics', label: 'Logistics' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'facilities', label: 'Facilities Management' }
  ];

  const regionOptions = [
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'latin-america', label: 'Latin America' },
    { value: 'middle-east', label: 'Middle East' }
  ];

  const certificationsList = [
    { id: 'iso-9001', label: 'ISO 9001' },
    { id: 'iso-27001', label: 'ISO 27001' },
    { id: 'soc-2', label: 'SOC 2' },
    { id: 'cmmi', label: 'CMMI Level 3+' },
    { id: 'minority-owned', label: 'Minority Owned' },
    { id: 'woman-owned', label: 'Woman Owned' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Vendors' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setLocalFilters(prev => ({ ...prev, searchQuery: value }));
  };

  const handleCategoryChange = (value) => {
    setLocalFilters(prev => ({ ...prev, categories: value }));
  };

  const handleRegionChange = (value) => {
    setLocalFilters(prev => ({ ...prev, regions: value }));
  };

  const handleCertificationToggle = (certId) => {
    setLocalFilters(prev => ({
      ...prev,
      certifications: prev?.certifications?.includes(certId)
        ? prev?.certifications?.filter(id => id !== certId)
        : [...prev?.certifications, certId]
    }));
  };

  const handlePerformanceChange = (type, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [type]: Math.max(0, Math.min(100, parseInt(value) || 0))
    }));
  };

  const handleStatusChange = (value) => {
    setLocalFilters(prev => ({ ...prev, status: value }));
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      searchQuery: '',
      categories: [],
      performanceMin: 0,
      performanceMax: 100,
      regions: [],
      certifications: [],
      status: 'all'
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFilterCount = 
    (localFilters?.categories?.length > 0 ? 1 : 0) +
    (localFilters?.regions?.length > 0 ? 1 : 0) +
    (localFilters?.certifications?.length > 0 ? 1 : 0) +
    (localFilters?.status !== 'all' ? 1 : 0) +
    (localFilters?.performanceMin > 0 || localFilters?.performanceMax < 100 ? 1 : 0);

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <Input
          type="search"
          placeholder="Search vendors..."
          value={localFilters?.searchQuery}
          onChange={handleSearchChange}
          className="mb-3"
        />
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={applyFilters}
            fullWidth
            iconName="Filter"
            iconPosition="left"
          >
            Apply
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            iconName="X"
            iconPosition="left"
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Vendor Status
          </label>
          <Select
            options={statusOptions}
            value={localFilters?.status}
            onChange={handleStatusChange}
            placeholder="Select status"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Categories
          </label>
          <Select
            options={categoryOptions}
            value={localFilters?.categories}
            onChange={handleCategoryChange}
            placeholder="Select categories"
            multiple
            searchable
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Geographic Regions
          </label>
          <Select
            options={regionOptions}
            value={localFilters?.regions}
            onChange={handleRegionChange}
            placeholder="Select regions"
            multiple
            searchable
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Performance Score Range
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Input
                type="number"
                label="Min"
                value={localFilters?.performanceMin}
                onChange={(e) => handlePerformanceChange('performanceMin', e?.target?.value)}
                min="0"
                max="100"
              />
              <span className="text-muted-foreground mt-6">-</span>
              <Input
                type="number"
                label="Max"
                value={localFilters?.performanceMax}
                onChange={(e) => handlePerformanceChange('performanceMax', e?.target?.value)}
                min="0"
                max="100"
              />
            </div>
            <div className="relative h-2 bg-muted rounded-full">
              <div
                className="absolute h-full bg-primary rounded-full"
                style={{
                  left: `${localFilters?.performanceMin}%`,
                  width: `${localFilters?.performanceMax - localFilters?.performanceMin}%`
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Certifications
          </label>
          <div className="space-y-2">
            {certificationsList?.map((cert) => (
              <Checkbox
                key={cert?.id}
                label={cert?.label}
                checked={localFilters?.certifications?.includes(cert?.id)}
                onChange={() => handleCertificationToggle(cert?.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorFilters;