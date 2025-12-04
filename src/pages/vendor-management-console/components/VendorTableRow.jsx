import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VendorTableRow = ({ vendor, isSelected, onSelect, onEdit, onEmail, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'suspended':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <tr className={`border-b border-border hover:bg-muted/50 transition-colors ${isSelected ? 'bg-primary/5' : ''}`}>
        <td className="px-4 py-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(vendor?.id, e?.target?.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
          />
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Image
              src={vendor?.logo}
              alt={vendor?.logoAlt}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <button
                onClick={() => onViewDetails(vendor?.id)}
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                {vendor?.companyName}
              </button>
              <p className="text-xs text-muted-foreground">{vendor?.category}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <div>
            <p className="text-sm text-foreground">{vendor?.contactName}</p>
            <p className="text-xs text-muted-foreground">{vendor?.email}</p>
            <p className="text-xs text-muted-foreground">{vendor?.phone}</p>
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <div className="flex flex-col items-center gap-1">
            <span className={`text-lg font-semibold ${getPerformanceColor(vendor?.performanceScore)}`}>
              {vendor?.performanceScore}
            </span>
            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${vendor?.performanceScore >= 75 ? 'bg-success' : vendor?.performanceScore >= 60 ? 'bg-warning' : 'bg-error'}`}
                style={{ width: `${vendor?.performanceScore}%` }}
              />
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <span className="text-sm font-medium text-foreground">{vendor?.activeRFPs}</span>
        </td>
        <td className="px-4 py-3">
          <span className="text-sm text-muted-foreground">{formatDate(vendor?.lastInteraction)}</span>
        </td>
        <td className="px-4 py-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vendor?.status)}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {vendor?.status?.charAt(0)?.toUpperCase() + vendor?.status?.slice(1)}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            {vendor?.certifications?.slice(0, 3)?.map((cert, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded"
                title={cert}
              >
                {cert}
              </span>
            ))}
            {vendor?.certifications?.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded">
                +{vendor?.certifications?.length - 3}
              </span>
            )}
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              title="Expand details"
            >
              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEmail(vendor?.id)}
              title="Send email"
            >
              <Icon name="Mail" size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(vendor?.id)}
              title="Edit vendor"
            >
              <Icon name="Edit" size={18} />
            </Button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="border-b border-border bg-muted/30">
          <td colSpan="9" className="px-4 py-4">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Company Details</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">Region: <span className="text-foreground">{vendor?.region}</span></p>
                  <p className="text-muted-foreground">Founded: <span className="text-foreground">{vendor?.founded}</span></p>
                  <p className="text-muted-foreground">Employees: <span className="text-foreground">{vendor?.employees}</span></p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Performance Metrics</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">On-time Delivery: <span className="text-foreground">{vendor?.onTimeDelivery}%</span></p>
                  <p className="text-muted-foreground">Quality Score: <span className="text-foreground">{vendor?.qualityScore}%</span></p>
                  <p className="text-muted-foreground">Response Time: <span className="text-foreground">{vendor?.avgResponseTime}</span></p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Recent Activity</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">Total RFPs: <span className="text-foreground">{vendor?.totalRFPs}</span></p>
                  <p className="text-muted-foreground">Won RFPs: <span className="text-foreground">{vendor?.wonRFPs}</span></p>
                  <p className="text-muted-foreground">Last Contract: <span className="text-foreground">{formatDate(vendor?.lastContract)}</span></p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default VendorTableRow;