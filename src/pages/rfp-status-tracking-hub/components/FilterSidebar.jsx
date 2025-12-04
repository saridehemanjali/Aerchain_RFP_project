import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, onSavePreset, savedPresets }) => {
  const [presetName, setPresetName] = useState('');
  const [showSavePreset, setShowSavePreset] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'distributed', label: 'Distributed' },
    { value: 'collecting', label: 'Collecting Responses' },
    { value: 'evaluating', label: 'Evaluating' },
    { value: 'decided', label: 'Decision Made' },
    { value: 'closed', label: 'Closed' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'it-services', label: 'IT Services' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'software', label: 'Software' },
    { value: 'hardware', label: 'Hardware' },
    { value: 'facilities', label: 'Facilities' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const assigneeOptions = [
    { value: 'all', label: 'All Assignees' },
    { value: 'sarah-chen', label: 'Sarah Chen' },
    { value: 'michael-rodriguez', label: 'Michael Rodriguez' },
    { value: 'emily-watson', label: 'Emily Watson' },
    { value: 'david-kim', label: 'David Kim' }
  ];

  const handleSavePreset = () => {
    if (presetName?.trim()) {
      onSavePreset(presetName, filters);
      setPresetName('');
      setShowSavePreset(false);
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={() => onFilterChange('reset')}
          />
        </div>

        <Input
          type="search"
          placeholder="Search RFPs..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="mb-4"
        />
      </div>
      <div className="p-6 space-y-6">
        <div>
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />
        </div>

        <div>
          <Select
            label="Category"
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => onFilterChange('category', value)}
          />
        </div>

        <div>
          <Select
            label="Priority"
            options={priorityOptions}
            value={filters?.priority}
            onChange={(value) => onFilterChange('priority', value)}
          />
        </div>

        <div>
          <Select
            label="Assignee"
            options={assigneeOptions}
            value={filters?.assignee}
            onChange={(value) => onFilterChange('assignee', value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Deadline Proximity
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Overdue"
              checked={filters?.overdue}
              onChange={(e) => onFilterChange('overdue', e?.target?.checked)}
            />
            <Checkbox
              label="Due within 3 days"
              checked={filters?.urgent}
              onChange={(e) => onFilterChange('urgent', e?.target?.checked)}
            />
            <Checkbox
              label="Due within 7 days"
              checked={filters?.upcoming}
              onChange={(e) => onFilterChange('upcoming', e?.target?.checked)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Activity
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Has new activity"
              checked={filters?.hasNewActivity}
              onChange={(e) => onFilterChange('hasNewActivity', e?.target?.checked)}
            />
            <Checkbox
              label="Awaiting response"
              checked={filters?.awaitingResponse}
              onChange={(e) => onFilterChange('awaitingResponse', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-border">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Saved Presets</h3>
          {savedPresets?.length === 0 ? (
            <p className="text-xs text-muted-foreground">No saved presets</p>
          ) : (
            <div className="space-y-2">
              {savedPresets?.map((preset, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground bg-muted rounded-md hover:bg-muted/80 transition-colors"
                  onClick={() => onFilterChange('loadPreset', preset)}
                >
                  <span>{preset?.name}</span>
                  <Icon name="ChevronRight" size={16} />
                </button>
              ))}
            </div>
          )}
        </div>

        {showSavePreset ? (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Preset name"
              value={presetName}
              onChange={(e) => setPresetName(e?.target?.value)}
            />
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                fullWidth
                onClick={handleSavePreset}
              >
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => {
                  setShowSavePreset(false);
                  setPresetName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Save"
            iconPosition="left"
            onClick={() => setShowSavePreset(true)}
          >
            Save Current Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;