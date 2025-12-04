import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StructuredPreview = ({ rfpData, onSave, onExport }) => {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    requirements: true,
    specifications: false,
    timeline: false,
    evaluation: false,
    terms: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const sections = [
    {
      id: 'overview',
      title: 'Project Overview',
      icon: 'FileText',
      content: rfpData?.overview || 'No overview generated yet'
    },
    {
      id: 'requirements',
      title: 'Requirements & Scope',
      icon: 'CheckSquare',
      content: rfpData?.requirements || 'No requirements specified'
    },
    {
      id: 'specifications',
      title: 'Technical Specifications',
      icon: 'Settings',
      content: rfpData?.specifications || 'No technical specifications defined'
    },
    {
      id: 'timeline',
      title: 'Timeline & Milestones',
      icon: 'Calendar',
      content: rfpData?.timeline || 'No timeline established'
    },
    {
      id: 'evaluation',
      title: 'Evaluation Criteria',
      icon: 'Award',
      content: rfpData?.evaluation || 'No evaluation criteria set'
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      icon: 'FileCheck',
      content: rfpData?.terms || 'No terms and conditions specified'
    }
  ];

  const completionPercentage = rfpData ? 85 : 0;

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="Eye" size={20} color="var(--color-primary)" />
          <h3 className="text-base font-semibold text-foreground">Structured RFP Preview</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-foreground">{completionPercentage}%</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {!rfpData ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="p-4 bg-muted/50 rounded-full mb-4">
              <Icon name="FileText" size={48} color="var(--color-muted-foreground)" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">No RFP Generated Yet</h4>
            <p className="text-sm text-muted-foreground max-w-md">
              Enter your procurement requirements in natural language and click "Generate Structured RFP" to see the AI-powered preview here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sections?.map((section) => (
              <div
                key={section?.id}
                className="bg-background border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section?.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Icon name={section?.icon} size={18} color="var(--color-primary)" />
                    <span className="text-sm font-semibold text-foreground">{section?.title}</span>
                  </div>
                  <Icon
                    name={expandedSections?.[section?.id] ? 'ChevronUp' : 'ChevronDown'}
                    size={18}
                    color="var(--color-muted-foreground)"
                  />
                </button>

                {expandedSections?.[section?.id] && (
                  <div className="p-4 border-t border-border">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-sm text-foreground whitespace-pre-wrap">{section?.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {rfpData && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onExport}
              iconName="Download"
              iconPosition="left"
            >
              Export PDF
            </Button>
            <Button
              variant="default"
              onClick={onSave}
              iconName="Save"
              iconPosition="left"
              fullWidth
            >
              Save as Draft
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StructuredPreview;