import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import QuickActions from '../../components/ui/QuickActions';
import EmailThreadPanel from './components/EmailThreadPanel';
import ParsedDataPanel from './components/ParsedDataPanel';
import ReviewQueueSidebar from './components/ReviewQueueSidebar';
import EmailDetailModal from './components/EmailDetailModal';
import SystemStatusBar from './components/SystemStatusBar';

const EmailProcessingCenter = () => {
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [showEmailDetail, setShowEmailDetail] = useState(false);

  const mockEmails = [
  {
    id: 'email-001',
    sender: 'Sarah Johnson',
    senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
    senderAvatarAlt: 'Professional headshot of woman with shoulder-length brown hair wearing navy blazer',
    subject: 'Re: RFP-2024-IT-001 - Cloud Infrastructure Proposal',
    preview: 'Thank you for the opportunity to submit our proposal. We are pleased to provide our comprehensive solution for your cloud infrastructure requirements...',
    body: `Thank you for the opportunity to submit our proposal. We are pleased to provide our comprehensive solution for your cloud infrastructure requirements.\n\nOur proposed solution includes:\n- Multi-cloud architecture with AWS and Azure integration\n- 99.99% uptime SLA guarantee\n- 24/7 enterprise support\n- Automated backup and disaster recovery\n\nTotal Cost: $245,000 annually\nImplementation Timeline: 12 weeks\nPayment Terms: Net 30 days\n\nPlease find attached our detailed technical specifications and pricing breakdown.\n\nBest regards,\nSarah Johnson\nTechCloud Solutions`,
    receivedAt: new Date('2025-12-02T14:30:00'),
    processingStatus: 'processed',
    attachmentCount: 2,
    requiresReview: false,
    rfpReference: 'RFP-2024-IT-001',
    confidenceScore: 94,
    attachments: [
    { name: 'TechCloud_Technical_Specs.pdf', size: '2.4 MB', type: 'PDF', parsed: true },
    { name: 'Pricing_Breakdown.xlsx', size: '156 KB', type: 'Excel', parsed: true }],

    processingHistory: [
    { action: 'Email Received', description: 'Email received from vendor', timestamp: new Date('2025-12-02T14:30:00'), status: 'success' },
    { action: 'AI Parsing Started', description: 'Automated parsing initiated', timestamp: new Date('2025-12-02T14:31:00'), status: 'success' },
    { action: 'Attachments Processed', description: '2 attachments successfully parsed', timestamp: new Date('2025-12-02T14:33:00'), status: 'success' },
    { action: 'Data Validation Complete', description: 'All fields validated successfully', timestamp: new Date('2025-12-02T14:35:00'), status: 'success' }]

  },
  {
    id: 'email-002',
    sender: 'Michael Chen',
    senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13a48293d-1763296098326.png",
    senderAvatarAlt: 'Professional headshot of Asian man with short black hair wearing gray suit',
    subject: 'RFP-2024-IT-001 Response - Enterprise Cloud Services',
    preview: 'We appreciate the opportunity to respond to your RFP. Our team has carefully reviewed your requirements and prepared a tailored solution...',
    body: `We appreciate the opportunity to respond to your RFP. Our team has carefully reviewed your requirements and prepared a tailored solution.\n\nKey highlights:\n- Hybrid cloud deployment model\n- Advanced security features\n- Scalable infrastructure\n\nWe look forward to discussing our proposal in detail.`,
    receivedAt: new Date('2025-12-02T11:15:00'),
    processingStatus: 'processing',
    attachmentCount: 1,
    requiresReview: true,
    rfpReference: 'RFP-2024-IT-001',
    confidenceScore: 78,
    attachments: [
    { name: 'CloudPro_Proposal.pdf', size: '3.1 MB', type: 'PDF', parsed: false }],

    processingHistory: [
    { action: 'Email Received', description: 'Email received from vendor', timestamp: new Date('2025-12-02T11:15:00'), status: 'success' },
    { action: 'AI Parsing Started', description: 'Automated parsing initiated', timestamp: new Date('2025-12-02T11:16:00'), status: 'success' },
    { action: 'Parsing In Progress', description: 'Processing attachment content', timestamp: new Date('2025-12-02T11:18:00'), status: 'warning' }]

  },
  {
    id: 'email-003',
    sender: 'Emily Rodriguez',
    senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_162a57531-1763296100992.png",
    senderAvatarAlt: 'Professional headshot of Hispanic woman with long dark hair wearing white blouse',
    subject: 'Question regarding RFP-2024-IT-001 Requirements',
    preview: 'We have a few clarification questions before submitting our proposal. Could you please provide additional details on the security compliance requirements...',
    body: `We have a few clarification questions before submitting our proposal.\n\nQuestions:\n1. What specific security compliance certifications are required?\n2. Is multi-region deployment mandatory?\n3. What is the expected data volume?\n\nWe aim to submit our proposal by end of week.`,
    receivedAt: new Date('2025-12-01T16:45:00'),
    processingStatus: 'pending',
    attachmentCount: 0,
    requiresReview: true,
    rfpReference: 'RFP-2024-IT-001',
    confidenceScore: 0,
    attachments: [],
    processingHistory: [
    { action: 'Email Received', description: 'Email received from vendor', timestamp: new Date('2025-12-01T16:45:00'), status: 'success' }]

  },
  {
    id: 'email-004',
    sender: 'David Park',
    senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f32d7107-1763295912115.png",
    senderAvatarAlt: 'Professional headshot of Asian man with glasses wearing dark blue suit',
    subject: 'Re: RFP-2024-IT-001 - Revised Pricing',
    preview: 'Following our initial submission, we would like to provide revised pricing that better aligns with your budget constraints...',
    body: `Following our initial submission, we would like to provide revised pricing that better aligns with your budget constraints.\n\nRevised Total: $198,000 annually (down from $245,000)\n\nThis includes all previously mentioned features with optimized resource allocation.`,
    receivedAt: new Date('2025-12-03T09:20:00'),
    processingStatus: 'error',
    attachmentCount: 1,
    requiresReview: true,
    rfpReference: 'RFP-2024-IT-001',
    confidenceScore: 0,
    attachments: [
    { name: 'Revised_Pricing.pdf', size: '890 KB', type: 'PDF', parsed: false }],

    processingHistory: [
    { action: 'Email Received', description: 'Email received from vendor', timestamp: new Date('2025-12-03T09:20:00'), status: 'success' },
    { action: 'AI Parsing Started', description: 'Automated parsing initiated', timestamp: new Date('2025-12-03T09:21:00'), status: 'success' },
    { action: 'Parsing Failed', description: 'Unable to extract pricing data from attachment', timestamp: new Date('2025-12-03T09:23:00'), status: 'error' }]

  }];


  const mockParsedData = {
    'email-001': {
      parsedAt: new Date('2025-12-02T14:35:00'),
      overallConfidence: 94,
      pricing: {
        totalCost: '$245,000 annually',
        totalCostConfidence: 98,
        breakdown: 'Infrastructure: $180,000\nSupport: $45,000\nLicensing: $20,000',
        breakdownConfidence: 92,
        paymentTerms: 'Net 30 days with quarterly billing cycle',
        paymentTermsConfidence: 95
      },
      technical: {
        approach: 'Multi-cloud architecture leveraging AWS and Azure with automated failover capabilities and load balancing across regions',
        approachConfidence: 90,
        features: '- 99.99% uptime SLA\n- 24/7 enterprise support\n- Automated backup and disaster recovery\n- Real-time monitoring and alerting\n- Advanced security features',
        featuresConfidence: 96,
        compliance: 'SOC 2 Type II, ISO 27001, HIPAA compliant infrastructure with regular third-party audits',
        complianceConfidence: 88
      },
      timeline: {
        delivery: '12 weeks from contract signing to full production deployment',
        deliveryConfidence: 94,
        phases: 'Phase 1: Infrastructure setup (4 weeks)\nPhase 2: Migration and testing (6 weeks)\nPhase 3: Go-live and optimization (2 weeks)',
        phasesConfidence: 89,
        milestones: 'Week 4: Infrastructure ready\nWeek 10: Testing complete\nWeek 12: Production launch',
        milestonesConfidence: 91
      },
      terms: {
        warranty: '12-month warranty covering all hardware and software components with free replacement',
        warrantyConfidence: 93,
        sla: '99.99% uptime guarantee with financial penalties for non-compliance and monthly performance reports',
        slaConfidence: 97,
        cancellation: '90-day notice required with prorated refund for unused services',
        cancellationConfidence: 85
      }
    }
  };

  const mockReviewItems = [
  {
    id: 'review-001',
    type: 'validation',
    status: 'pending',
    priority: 'high',
    title: 'Pricing Data Confidence Below Threshold',
    description: 'AI parser confidence for pricing breakdown is 78%, below the 85% threshold. Manual review recommended.',
    emailSubject: 'RFP-2024-IT-001 Response - Enterprise Cloud Services',
    fieldName: 'Pricing Breakdown',
    createdAt: new Date('2025-12-02T11:18:00')
  },
  {
    id: 'review-002',
    type: 'error',
    status: 'error',
    priority: 'high',
    title: 'Attachment Parsing Failed',
    description: 'Unable to extract pricing data from PDF attachment. File may be password-protected or corrupted.',
    emailSubject: 'Re: RFP-2024-IT-001 - Revised Pricing',
    fieldName: 'Revised_Pricing.pdf',
    createdAt: new Date('2025-12-03T09:23:00')
  },
  {
    id: 'review-003',
    type: 'validation',
    status: 'pending',
    priority: 'medium',
    title: 'Missing Technical Specifications',
    description: 'No technical specifications found in email body. Attachment may contain required information.',
    emailSubject: 'RFP-2024-IT-001 Response - Enterprise Cloud Services',
    fieldName: 'Technical Approach',
    createdAt: new Date('2025-12-02T11:20:00')
  },
  {
    id: 'review-004',
    type: 'attachment',
    status: 'pending',
    priority: 'low',
    title: 'Large Attachment Pending Analysis',
    description: 'CloudPro_Proposal.pdf (3.1 MB) is queued for detailed analysis. Expected completion in 5 minutes.',
    emailSubject: 'RFP-2024-IT-001 Response - Enterprise Cloud Services',
    fieldName: 'CloudPro_Proposal.pdf',
    createdAt: new Date('2025-12-02T11:16:00')
  },
  {
    id: 'review-005',
    type: 'validation',
    status: 'pending',
    priority: 'medium',
    title: 'Clarification Email Detected',
    description: 'Email contains questions rather than proposal submission. May require manual response.',
    emailSubject: 'Question regarding RFP-2024-IT-001 Requirements',
    fieldName: null,
    createdAt: new Date('2025-12-01T16:45:00')
  }];


  const mockSystemStatus = {
    emailSync: {
      status: 'active',
      label: 'Email Server',
      lastSync: new Date('2025-12-03T07:15:00')
    },
    aiProcessing: {
      status: 'active',
      label: 'AI Parser',
      lastSync: new Date('2025-12-03T07:20:00')
    },
    database: {
      status: 'active',
      label: 'Database',
      lastSync: new Date('2025-12-03T07:21:00')
    },
    emailsProcessed: 47,
    aiCreditsRemaining: 8543
  };

  const selectedEmail = mockEmails.find((email) => email.id === selectedEmailId);
  const selectedParsedData = selectedEmailId ? mockParsedData[selectedEmailId] : null;

  const handleEmailSelect = (emailId) => {
    setSelectedEmailId(emailId);
  };

  const handleDataUpdate = (fieldKey, newValue) => {
    console.log('Updating field:', fieldKey, 'with value:', newValue);
  };

  const handleApprove = () => {
    console.log('Approving parsed data for email:', selectedEmailId);
  };

  const handleReviewItemClick = (itemId) => {
    console.log('Review item clicked:', itemId);
  };

  const handleBulkAction = (action, itemIds) => {
    console.log('Bulk action:', action, 'for items:', itemIds);
  };

  const handleReprocess = (emailId) => {
    console.log('Reprocessing email:', emailId);
    setShowEmailDetail(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <SystemStatusBar systemStatus={mockSystemStatus} />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Email Processing Center</h1>
              <p className="text-sm text-muted-foreground">
                Automated vendor response capture and intelligent proposal parsing
              </p>
            </div>
            <QuickActions />
          </div>

          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)]">
            <div className="col-span-4 h-full overflow-hidden rounded-lg border border-border">
              <EmailThreadPanel
                emails={mockEmails}
                selectedEmailId={selectedEmailId}
                onEmailSelect={handleEmailSelect} />

            </div>

            <div className="col-span-5 h-full overflow-hidden rounded-lg border border-border">
              <ParsedDataPanel
                parsedData={selectedParsedData}
                onDataUpdate={handleDataUpdate}
                onApprove={handleApprove} />

            </div>

            <div className="col-span-3 h-full overflow-hidden rounded-lg border border-border">
              <ReviewQueueSidebar
                reviewItems={mockReviewItems}
                onItemClick={handleReviewItemClick}
                onBulkAction={handleBulkAction} />

            </div>
          </div>
        </div>
      </div>

      {showEmailDetail && selectedEmail &&
      <EmailDetailModal
        email={selectedEmail}
        onClose={() => setShowEmailDetail(false)}
        onReprocess={handleReprocess} />

      }
    </div>);

};

export default EmailProcessingCenter;