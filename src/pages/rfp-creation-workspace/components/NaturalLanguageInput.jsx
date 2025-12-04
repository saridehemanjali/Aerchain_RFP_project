import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NaturalLanguageInput = ({ onContentChange, onAIProcess, isProcessing }) => {
  const [content, setContent] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const textareaRef = useRef(null);

  const suggestions = [
    {
      icon: 'Lightbulb',
      text: "We need a cloud-based CRM system for our sales team of 50 users with mobile access and integration with our existing email system",
      category: "Software"
    },
    {
      icon: 'Package',
      text: "Looking for office furniture including 30 ergonomic chairs, 15 standing desks, and 5 conference tables with delivery by end of Q1",
      category: "Equipment"
    },
    {
      icon: 'Users',
      text: "Require digital marketing services for social media management, content creation, and SEO optimization with monthly reporting",
      category: "Services"
    },
    {
      icon: 'Building',
      text: "Need facility management services for our 50,000 sq ft office including cleaning, maintenance, and security for 12-month contract",
      category: "Facilities"
    }
  ];

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef?.current?.scrollHeight + 'px';
    }
  }, [content]);

  const handleContentChange = (e) => {
    const newContent = e?.target?.value;
    setContent(newContent);
    onContentChange(newContent);
    if (newContent?.length > 0) {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    setContent(suggestionText);
    onContentChange(suggestionText);
    setShowSuggestions(false);
    textareaRef?.current?.focus();
  };

  const handleClear = () => {
    setContent('');
    onContentChange('');
    setShowSuggestions(true);
    textareaRef?.current?.focus();
  };

  const handleAIProcess = () => {
    if (content?.trim()) {
      onAIProcess(content);
    }
  };

  const wordCount = content?.trim()?.split(/\s+/)?.filter(word => word?.length > 0)?.length;

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
          <h3 className="text-base font-semibold text-foreground">Natural Language Input</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{wordCount} words</span>
          {content && (
            <button
              onClick={handleClear}
              className="p-1.5 rounded-md hover:bg-muted transition-colors duration-200"
              title="Clear content"
            >
              <Icon name="X" size={16} color="var(--color-muted-foreground)" />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          placeholder="Describe your procurement needs in plain language...\n\nExample: We need a new project management software for our team of 25 people with features like task tracking, time management, and team collaboration. Budget is around $5000 annually."
          className="w-full min-h-[200px] bg-transparent text-foreground text-sm resize-none focus:outline-none placeholder:text-muted-foreground"
          disabled={isProcessing}
        />

        {showSuggestions && !content && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Sparkles" size={18} color="var(--color-primary)" />
              <h4 className="text-sm font-medium text-foreground">Try these examples:</h4>
            </div>
            <div className="space-y-3">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion?.text)}
                  className="w-full text-left p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors duration-200">
                      <Icon name={suggestion?.icon} size={16} color="var(--color-primary)" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-primary mb-1">{suggestion?.category}</div>
                      <p className="text-sm text-foreground">{suggestion?.text}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            onClick={handleAIProcess}
            disabled={!content?.trim() || isProcessing}
            loading={isProcessing}
            iconName="Sparkles"
            iconPosition="left"
            fullWidth
          >
            {isProcessing ? 'Processing with AI...' : 'Generate Structured RFP'}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
          <Icon name="Info" size={14} />
          AI will analyze your requirements and create a structured RFP document
        </p>
      </div>
    </div>
  );
};

export default NaturalLanguageInput;