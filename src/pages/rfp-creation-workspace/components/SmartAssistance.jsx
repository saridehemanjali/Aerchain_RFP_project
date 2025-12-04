import React from 'react';
import Icon from '../../../components/AppIcon';

const SmartAssistance = ({ rfpData }) => {
  const completenessChecks = [
    {
      id: 'budget',
      label: 'Budget Range Specified',
      status: rfpData?.hasBudget ? 'complete' : 'incomplete',
      suggestion: 'Add budget range to help vendors provide accurate proposals'
    },
    {
      id: 'timeline',
      label: 'Project Timeline Defined',
      status: rfpData?.hasTimeline ? 'complete' : 'incomplete',
      suggestion: 'Specify project start date and key milestones'
    },
    {
      id: 'requirements',
      label: 'Technical Requirements',
      status: rfpData?.hasRequirements ? 'complete' : 'warning',
      suggestion: 'Consider adding more detailed technical specifications'
    },
    {
      id: 'evaluation',
      label: 'Evaluation Criteria',
      status: rfpData?.hasEvaluation ? 'complete' : 'incomplete',
      suggestion: 'Define how vendor proposals will be evaluated'
    },
    {
      id: 'deliverables',
      label: 'Expected Deliverables',
      status: rfpData?.hasDeliverables ? 'complete' : 'incomplete',
      suggestion: 'List specific deliverables and acceptance criteria'
    }
  ];

  const recommendations = [
    {
      icon: 'Target',
      title: 'Add Evaluation Weights',
      description: 'Assign percentage weights to evaluation criteria for objective vendor comparison',
      priority: 'high'
    },
    {
      icon: 'Shield',
      title: 'Include Compliance Requirements',
      description: 'Specify industry certifications, security standards, or regulatory compliance needs',
      priority: 'medium'
    },
    {
      icon: 'Clock',
      title: 'Set Response Deadline',
      description: 'Define clear deadline for vendor proposal submissions',
      priority: 'high'
    },
    {
      icon: 'DollarSign',
      title: 'Clarify Payment Terms',
      description: 'Specify payment schedule, milestones, and preferred payment methods',
      priority: 'medium'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete':
        return { name: 'CheckCircle2', color: 'var(--color-success)' };
      case 'warning':
        return { name: 'AlertCircle', color: 'var(--color-warning)' };
      case 'incomplete':
        return { name: 'Circle', color: 'var(--color-muted-foreground)' };
      default:
        return { name: 'Circle', color: 'var(--color-muted-foreground)' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const completionRate = completenessChecks?.filter(check => check?.status === 'complete')?.length;
  const totalChecks = completenessChecks?.length;
  const completionPercentage = Math.round((completionRate / totalChecks) * 100);

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" size={20} color="var(--color-primary)" />
            <h3 className="text-base font-semibold text-foreground">Smart Assistance</h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
            <span className="text-sm font-semibold text-primary">{completionPercentage}%</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Completeness Score</span>
            <span>{completionRate} of {totalChecks}</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          {completenessChecks?.map((check) => {
            const statusIcon = getStatusIcon(check?.status);
            return (
              <div key={check?.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors duration-200">
                <Icon name={statusIcon?.name} size={18} color={statusIcon?.color} className="mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{check?.label}</p>
                  {check?.status !== 'complete' && (
                    <p className="text-xs text-muted-foreground mt-1">{check?.suggestion}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Lightbulb" size={20} color="var(--color-warning)" />
          <h3 className="text-base font-semibold text-foreground">Recommendations</h3>
        </div>

        <div className="space-y-3">
          {recommendations?.map((rec, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-background rounded-md">
                <Icon name={rec?.icon} size={16} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">{rec?.title}</p>
                  <span className={`text-xs font-medium uppercase ${getPriorityColor(rec?.priority)}`}>
                    {rec?.priority}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{rec?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">AI Processing Tip</p>
            <p className="text-xs text-muted-foreground">
              The more detailed your natural language input, the better the AI can structure your RFP. Include budget ranges, timelines, and specific requirements for optimal results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAssistance;