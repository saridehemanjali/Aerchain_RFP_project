import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VendorDetailsModal = ({ vendor, isOpen, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVendor, setEditedVendor] = useState(vendor);
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !vendor) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'performance', label: 'Performance', icon: 'BarChart3' },
    { id: 'contacts', label: 'Contacts', icon: 'Users' },
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'documents', label: 'Documents', icon: 'FileText' }
  ];

  const handleSave = () => {
    onSave(editedVendor);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedVendor(prev => ({ ...prev, [field]: value }));
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <Image
          src={vendor?.logo}
          alt={vendor?.logoAlt}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          {isEditing ? (
            <Input
              label="Company Name"
              value={editedVendor?.companyName}
              onChange={(e) => handleInputChange('companyName', e?.target?.value)}
              className="mb-3"
            />
          ) : (
            <h3 className="text-2xl font-bold text-foreground mb-2">{vendor?.companyName}</h3>
          )}
          <p className="text-muted-foreground mb-3">{vendor?.category}</p>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${vendor?.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
              <span className="w-2 h-2 rounded-full bg-current" />
              {vendor?.status?.charAt(0)?.toUpperCase() + vendor?.status?.slice(1)}
            </span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">Performance Score: <span className="font-semibold text-foreground">{vendor?.performanceScore}</span></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Company Information</h4>
          <div className="space-y-2">
            {isEditing ? (
              <>
                <Input
                  label="Region"
                  value={editedVendor?.region}
                  onChange={(e) => handleInputChange('region', e?.target?.value)}
                />
                <Input
                  label="Founded"
                  value={editedVendor?.founded}
                  onChange={(e) => handleInputChange('founded', e?.target?.value)}
                />
                <Input
                  label="Employees"
                  value={editedVendor?.employees}
                  onChange={(e) => handleInputChange('employees', e?.target?.value)}
                />
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">Region: <span className="text-foreground">{vendor?.region}</span></p>
                <p className="text-sm text-muted-foreground">Founded: <span className="text-foreground">{vendor?.founded}</span></p>
                <p className="text-sm text-muted-foreground">Employees: <span className="text-foreground">{vendor?.employees}</span></p>
              </>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Primary Contact</h4>
          <div className="space-y-2">
            {isEditing ? (
              <>
                <Input
                  label="Contact Name"
                  value={editedVendor?.contactName}
                  onChange={(e) => handleInputChange('contactName', e?.target?.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  value={editedVendor?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={editedVendor?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                />
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">Name: <span className="text-foreground">{vendor?.contactName}</span></p>
                <p className="text-sm text-muted-foreground">Email: <span className="text-foreground">{vendor?.email}</span></p>
                <p className="text-sm text-muted-foreground">Phone: <span className="text-foreground">{vendor?.phone}</span></p>
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Certifications</h4>
        <div className="flex flex-wrap gap-2">
          {vendor?.certifications?.map((cert, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
          <p className="text-3xl font-bold text-foreground">{vendor?.performanceScore}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">On-time Delivery</p>
          <p className="text-3xl font-bold text-foreground">{vendor?.onTimeDelivery}%</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Quality Score</p>
          <p className="text-3xl font-bold text-foreground">{vendor?.qualityScore}%</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Performance Metrics</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Response Time</span>
              <span className="text-foreground font-medium">{vendor?.avgResponseTime}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '85%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Contract Compliance</span>
              <span className="text-foreground font-medium">92%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success" style={{ width: '92%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Customer Satisfaction</span>
              <span className="text-foreground font-medium">88%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '88%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Vendor Details</h2>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedVendor(vendor);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="border-b border-border">
          <div className="flex gap-1 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                {tab?.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'performance' && renderPerformanceTab()}
          {activeTab === 'contacts' && (
            <div className="text-center py-12">
              <Icon name="Users" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
              <p className="text-muted-foreground">Contact management coming soon</p>
            </div>
          )}
          {activeTab === 'history' && (
            <div className="text-center py-12">
              <Icon name="Clock" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
              <p className="text-muted-foreground">Interaction history coming soon</p>
            </div>
          )}
          {activeTab === 'documents' && (
            <div className="text-center py-12">
              <Icon name="FileText" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
              <p className="text-muted-foreground">Document management coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsModal;