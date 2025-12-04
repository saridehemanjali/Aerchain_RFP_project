import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ParsedDataPanel = ({ parsedData, onDataUpdate, onApprove }) => {
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  if (!parsedData) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-card p-8 text-center">
        <Icon name="FileSearch" size={64} color="var(--color-muted-foreground)" className="mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Email Selected</h3>
        <p className="text-sm text-muted-foreground">
          Select an email from the thread panel to view parsed data
        </p>
      </div>
    );
  }

  const handleEdit = (fieldKey, currentValue) => {
    setEditingField(fieldKey);
    setEditValue(currentValue);
  };

  const handleSave = (fieldKey) => {
    onDataUpdate(fieldKey, editValue);
    setEditingField(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue('');
  };

  const getConfidenceColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 70) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const renderField = (label, value, fieldKey, confidence, isEditable = true) => {
    const isEditing = editingField === fieldKey;

    return (
      <div className="p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{label}</span>
            {confidence && (
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getConfidenceColor(confidence)}`}>
                {confidence}% confidence
              </span>
            )}
          </div>
          {isEditable && !isEditing && (
            <button
              onClick={() => handleEdit(fieldKey, value)}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="Edit2" size={16} />
            </button>
          )}
        </div>
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e?.target?.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleSave(fieldKey)}>
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-foreground whitespace-pre-wrap">{value}</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon name="FileText" size={20} color="var(--color-primary)" />
            <h2 className="text-lg font-semibold text-foreground">Parsed Proposal Data</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              parsedData?.overallConfidence >= 90 
                ? 'text-success bg-success/10' 
                : parsedData?.overallConfidence >= 70 
                ? 'text-warning bg-warning/10' :'text-error bg-error/10'
            }`}>
              Overall: {parsedData?.overallConfidence}%
            </span>
            <Button 
              size="sm" 
              variant="outline"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            <Button 
              size="sm"
              iconName="CheckCircle2"
              iconPosition="left"
              onClick={onApprove}
            >
              Approve Data
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span>Parsed on {new Date(parsedData.parsedAt)?.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
          <span className="mx-2">•</span>
          <Icon name="User" size={14} />
          <span>AI Parser v2.1</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="DollarSign" size={18} color="var(--color-primary)" />
              Pricing Information
            </h3>
            <div className="space-y-3">
              {renderField(
                'Total Cost',
                parsedData?.pricing?.totalCost,
                'pricing.totalCost',
                parsedData?.pricing?.totalCostConfidence
              )}
              {renderField(
                'Cost Breakdown',
                parsedData?.pricing?.breakdown,
                'pricing.breakdown',
                parsedData?.pricing?.breakdownConfidence
              )}
              {renderField(
                'Payment Terms',
                parsedData?.pricing?.paymentTerms,
                'pricing.paymentTerms',
                parsedData?.pricing?.paymentTermsConfidence
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Settings" size={18} color="var(--color-primary)" />
              Technical Specifications
            </h3>
            <div className="space-y-3">
              {renderField(
                'Technical Approach',
                parsedData?.technical?.approach,
                'technical.approach',
                parsedData?.technical?.approachConfidence
              )}
              {renderField(
                'Key Features',
                parsedData?.technical?.features,
                'technical.features',
                parsedData?.technical?.featuresConfidence
              )}
              {renderField(
                'Compliance Standards',
                parsedData?.technical?.compliance,
                'technical.compliance',
                parsedData?.technical?.complianceConfidence
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Clock" size={18} color="var(--color-primary)" />
              Timeline & Delivery
            </h3>
            <div className="space-y-3">
              {renderField(
                'Delivery Timeline',
                parsedData?.timeline?.delivery,
                'timeline.delivery',
                parsedData?.timeline?.deliveryConfidence
              )}
              {renderField(
                'Implementation Phases',
                parsedData?.timeline?.phases,
                'timeline.phases',
                parsedData?.timeline?.phasesConfidence
              )}
              {renderField(
                'Milestones',
                parsedData?.timeline?.milestones,
                'timeline.milestones',
                parsedData?.timeline?.milestonesConfidence
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Shield" size={18} color="var(--color-primary)" />
              Terms & Conditions
            </h3>
            <div className="space-y-3">
              {renderField(
                'Warranty Terms',
                parsedData?.terms?.warranty,
                'terms.warranty',
                parsedData?.terms?.warrantyConfidence
              )}
              {renderField(
                'Service Level Agreement',
                parsedData?.terms?.sla,
                'terms.sla',
                parsedData?.terms?.slaConfidence
              )}
              {renderField(
                'Cancellation Policy',
                parsedData?.terms?.cancellation,
                'terms.cancellation',
                parsedData?.terms?.cancellationConfidence
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParsedDataPanel;