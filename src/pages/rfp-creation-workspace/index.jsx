import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickActions from '../../components/ui/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import TemplateLibrary from './components/TemplateLibrary';
import NaturalLanguageInput from './components/NaturalLanguageInput';
import StructuredPreview from './components/StructuredPreview';
import SmartAssistance from './components/SmartAssistance';
import VendorSelectionPreview from './components/VendorSelectionPreview';
import StatusIndicator from './components/StatusIndicator';

const RFPCreationWorkspace = () => {
  const navigate = useNavigate();
  const [isTemplateLibraryOpen, setIsTemplateLibraryOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [naturalLanguageContent, setNaturalLanguageContent] = useState('');
  const [rfpData, setRfpData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  const templateOptions = [
    { value: 'blank', label: 'Blank RFP' },
    { value: 'it-services', label: 'IT Services & Software' },
    { value: 'marketing', label: 'Marketing & Advertising' },
    { value: 'consulting', label: 'Professional Consulting' },
    { value: 'supplies', label: 'Office Supplies & Equipment' },
    { value: 'facilities', label: 'Facilities Management' }
  ];

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (rfpData && !isProcessing) {
        handleAutoSave();
      }
    }, 60000);

    return () => clearInterval(autoSaveInterval);
  }, [rfpData, isProcessing]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e?.ctrlKey || e?.metaKey) && e?.key === 's') {
        e?.preventDefault();
        handleSave();
      }
      if ((e?.ctrlKey || e?.metaKey) && e?.shiftKey && e?.key === 'a') {
        e?.preventDefault();
        if (naturalLanguageContent?.trim()) {
          handleAIProcess(naturalLanguageContent);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [naturalLanguageContent, rfpData]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setProcessingStatus('success');
    setStatusMessage(`Template "${template?.name}" loaded successfully`);
    setTimeout(() => {
      setProcessingStatus('idle');
      setStatusMessage('');
    }, 3000);
  };

  const handleContentChange = (content) => {
    setNaturalLanguageContent(content);
  };

  const handleAIProcess = async (content) => {
    setIsProcessing(true);
    setProcessingStatus('processing');
    setStatusMessage('AI is analyzing your requirements...');

    await new Promise(resolve => setTimeout(resolve, 3000));

    const generatedRfpData = {
      overview: `Project Overview:\nThis procurement request is for ${content?.substring(0, 100)}...\n\nObjective: To acquire high-quality solutions that meet our organizational needs while ensuring competitive pricing and reliable vendor partnerships.\n\nScope: The selected vendor will be responsible for delivering comprehensive services as outlined in the requirements section.`,
      requirements: `Functional Requirements:\n• Core functionality as described in the natural language input\n• Integration with existing enterprise systems\n• User training and documentation\n• Ongoing support and maintenance\n\nNon-Functional Requirements:\n• System availability: 99.9% uptime\n• Response time: < 2 seconds for standard operations\n• Security: Industry-standard encryption and authentication\n• Scalability: Support for 500+ concurrent users`,
      specifications: `Technical Specifications:\n• Cloud-based architecture preferred\n• RESTful API for integrations\n• Mobile-responsive design\n• Browser compatibility: Chrome, Firefox, Safari, Edge (latest versions)\n• Data backup and recovery procedures\n• Compliance with GDPR and SOX requirements\n\nPerformance Metrics:\n• Page load time: < 3 seconds\n• API response time: < 500ms\n• Database query optimization\n• CDN implementation for static assets`,
      timeline: `Project Timeline:\n\nPhase 1 - Vendor Selection (Weeks 1-3)\n• RFP distribution: Week 1\n• Vendor Q&A period: Week 2\n• Proposal submission deadline: End of Week 3\n\nPhase 2 - Evaluation & Award (Weeks 4-5)\n• Proposal review and scoring: Week 4\n• Vendor presentations: Week 5\n• Contract negotiation and award: End of Week 5\n\nPhase 3 - Implementation (Weeks 6-18)\n• Project kickoff: Week 6\n• Development and testing: Weeks 7-15\n• User acceptance testing: Weeks 16-17\n• Go-live: Week 18`,
      evaluation: `Evaluation Criteria:\n\n1. Technical Capability (30%)\n   • Solution architecture and design\n   • Technology stack and tools\n   • Integration capabilities\n   • Security measures\n\n2. Cost (25%)\n   • Total cost of ownership\n   • Pricing transparency\n   • Payment terms flexibility\n   • Value for money\n\n3. Experience & References (20%)\n   • Relevant project experience\n   • Client references and testimonials\n   • Industry expertise\n   • Team qualifications\n\n4. Implementation Plan (15%)\n   • Project methodology\n   • Timeline feasibility\n   • Resource allocation\n   • Risk management\n\n5. Support & Maintenance (10%)\n   • Support availability\n   • SLA commitments\n   • Training programs\n   • Documentation quality`,
      terms: `Terms & Conditions:\n\n1. Proposal Submission:\n   • Deadline: ${new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}\n   • Format: PDF document via email\n   • Contact: procurement@company.com\n\n2. Contract Terms:\n   • Contract duration: 12 months with option to extend\n   • Payment terms: Net 30 days\n   • Warranty period: 90 days post-implementation\n\n3. Confidentiality:\n   • All proposal information is confidential\n   • Non-disclosure agreement required\n   • Proprietary information protection\n\n4. Compliance:\n   • Vendor must comply with all applicable laws\n   • Insurance requirements: General liability $1M\n   • Background checks for personnel\n\n5. Intellectual Property:\n   • All deliverables become company property\n   • License agreements for third-party software\n   • Source code escrow arrangements`,
      hasBudget: content?.toLowerCase()?.includes('budget') || content?.toLowerCase()?.includes('$'),
      hasTimeline: content?.toLowerCase()?.includes('timeline') || content?.toLowerCase()?.includes('deadline'),
      hasRequirements: content?.length > 100,
      hasEvaluation: true,
      hasDeliverables: content?.toLowerCase()?.includes('deliver')
    };

    setRfpData(generatedRfpData);
    setIsProcessing(false);
    setProcessingStatus('success');
    setStatusMessage('RFP generated successfully!');

    setTimeout(() => {
      setProcessingStatus('idle');
      setStatusMessage('');
    }, 3000);
  };

  const handleSave = () => {
    if (!rfpData) return;

    setProcessingStatus('processing');
    setStatusMessage('Saving RFP...');

    setTimeout(() => {
      const now = new Date();
      setLastSaved(now);
      setProcessingStatus('success');
      setStatusMessage('RFP saved successfully');

      setTimeout(() => {
        setProcessingStatus('idle');
        setStatusMessage('');
      }, 2000);
    }, 1000);
  };

  const handleAutoSave = () => {
    const now = new Date();
    setLastSaved(now);
    console.log('Auto-saved at:', now?.toLocaleTimeString());
  };

  const handleExport = () => {
    setProcessingStatus('processing');
    setStatusMessage('Generating PDF...');

    setTimeout(() => {
      setProcessingStatus('success');
      setStatusMessage('PDF exported successfully');

      setTimeout(() => {
        setProcessingStatus('idle');
        setStatusMessage('');
      }, 2000);
    }, 1500);
  };

  const handleManageVendors = () => {
    navigate('/vendor-management-console');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-[1920px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">RFP Creation Workspace</h1>
              <p className="text-sm text-muted-foreground">
                Transform natural language requirements into structured RFPs with AI assistance
              </p>
            </div>
            <div className="flex items-center gap-3">
              {lastSaved && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>Last saved: {lastSaved?.toLocaleTimeString()}</span>
                </div>
              )}
              <QuickActions />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-64">
                  <Select
                    options={templateOptions}
                    value={selectedTemplate?.category || 'blank'}
                    onChange={(value) => {
                      const template = templateOptions?.find(t => t?.value === value);
                      if (template) {
                        setSelectedTemplate({ name: template?.label, category: value });
                      }
                    }}
                    placeholder="Select template"
                  />
                </div>
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setIsTemplateLibraryOpen(true)}
                  iconName="Library"
                  iconPosition="left"
                >
                  Browse Templates
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <StatusIndicator status={processingStatus} message={statusMessage} />
                <div className="h-6 w-px bg-border" />
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleSave}
                  disabled={!rfpData || isProcessing}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Draft
                </Button>
                <Button
                  variant="default"
                  size="default"
                  onClick={() => navigate('/vendor-management-console')}
                  iconName="Send"
                  iconPosition="left"
                >
                  Send to Vendors
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-5">
              <div className="h-[calc(100vh-280px)]">
                <NaturalLanguageInput
                  onContentChange={handleContentChange}
                  onAIProcess={handleAIProcess}
                  isProcessing={isProcessing}
                />
              </div>
            </div>

            <div className="col-span-7">
              <div className="h-[calc(100vh-280px)]">
                <StructuredPreview
                  rfpData={rfpData}
                  onSave={handleSave}
                  onExport={handleExport}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-8">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Zap" size={20} color="var(--color-primary)" />
                  <h3 className="text-base font-semibold text-foreground">Keyboard Shortcuts</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <span className="text-sm text-foreground">Save Draft</span>
                    <kbd className="px-2 py-1 text-xs font-mono bg-background border border-border rounded">
                      Ctrl + S
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <span className="text-sm text-foreground">AI Process</span>
                    <kbd className="px-2 py-1 text-xs font-mono bg-background border border-border rounded">
                      Ctrl + Shift + A
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <span className="text-sm text-foreground">Search Templates</span>
                    <kbd className="px-2 py-1 text-xs font-mono bg-background border border-border rounded">
                      Ctrl + K
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <span className="text-sm text-foreground">Navigate Sections</span>
                    <kbd className="px-2 py-1 text-xs font-mono bg-background border border-border rounded">
                      Tab
                    </kbd>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-4">
              <VendorSelectionPreview
                selectedVendors={[]}
                onManageVendors={handleManageVendors}
              />
            </div>
          </div>

          <div className="mt-6">
            <SmartAssistance rfpData={rfpData} />
          </div>
        </div>
      </main>
      <TemplateLibrary
        isOpen={isTemplateLibraryOpen}
        onClose={() => setIsTemplateLibraryOpen(false)}
        onSelectTemplate={handleTemplateSelect}
      />
    </div>
  );
};

export default RFPCreationWorkspace;