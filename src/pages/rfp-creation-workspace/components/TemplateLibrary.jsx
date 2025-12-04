import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplateLibrary = ({ onSelectTemplate, isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      name: "IT Services & Software Development",
      category: "technology",
      description: "Comprehensive template for software development, cloud services, and IT infrastructure procurement",
      sections: 12,
      lastUsed: "2025-11-28",
      usageCount: 45
    },
    {
      id: 2,
      name: "Marketing & Advertising Services",
      category: "marketing",
      description: "Template for digital marketing, content creation, and advertising campaign procurement",
      sections: 10,
      lastUsed: "2025-11-25",
      usageCount: 32
    },
    {
      id: 3,
      name: "Professional Consulting Services",
      category: "consulting",
      description: "Standard template for management consulting, business advisory, and strategic planning services",
      sections: 9,
      lastUsed: "2025-11-30",
      usageCount: 28
    },
    {
      id: 4,
      name: "Office Supplies & Equipment",
      category: "supplies",
      description: "Template for office furniture, stationery, and general workplace equipment procurement",
      sections: 8,
      lastUsed: "2025-11-20",
      usageCount: 67
    },
    {
      id: 5,
      name: "Facilities Management Services",
      category: "facilities",
      description: "Comprehensive template for building maintenance, cleaning, and facility management contracts",
      sections: 11,
      lastUsed: "2025-11-15",
      usageCount: 19
    },
    {
      id: 6,
      name: "Legal & Compliance Services",
      category: "legal",
      description: "Template for legal advisory, compliance auditing, and regulatory consulting services",
      sections: 10,
      lastUsed: "2025-12-01",
      usageCount: 15
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'Grid' },
    { value: 'technology', label: 'Technology', icon: 'Laptop' },
    { value: 'marketing', label: 'Marketing', icon: 'TrendingUp' },
    { value: 'consulting', label: 'Consulting', icon: 'Users' },
    { value: 'supplies', label: 'Supplies', icon: 'Package' },
    { value: 'facilities', label: 'Facilities', icon: 'Building' },
    { value: 'legal', label: 'Legal', icon: 'Scale' }
  ];

  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template) => {
    onSelectTemplate(template);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1200] flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Template Library</h2>
            <p className="text-sm text-muted-foreground mt-1">Select a template to start your RFP</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
          >
            <Icon name="X" size={20} color="var(--color-muted-foreground)" />
          </button>
        </div>

        <div className="p-6 border-b border-border">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Icon
                  name="Search"
                  size={18}
                  color="var(--color-muted-foreground)"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  placeholder="Search templates..."
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {categories?.map((category) => (
              <button
                key={category?.value}
                onClick={() => setSelectedCategory(category?.value)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors duration-200 ${
                  selectedCategory === category?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Icon name={category?.icon} size={16} />
                <span>{category?.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates?.map((template) => (
              <div
                key={template?.id}
                className="bg-background border border-border rounded-lg p-4 hover:border-primary transition-colors duration-200 cursor-pointer"
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-foreground">{template?.name}</h3>
                  <Icon name="FileText" size={20} color="var(--color-primary)" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">{template?.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Icon name="Layers" size={14} />
                      {template?.sections} sections
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="TrendingUp" size={14} />
                      {template?.usageCount} uses
                    </span>
                  </div>
                  <span>Last used: {template?.lastUsed}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
              <p className="text-muted-foreground">No templates found matching your criteria</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Create Blank RFP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateLibrary;