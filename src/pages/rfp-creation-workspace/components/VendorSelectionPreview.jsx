import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VendorSelectionPreview = ({ selectedVendors, onManageVendors }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const vendors = [
  {
    id: 1,
    name: "TechSolutions Inc",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_154f20177-1764661576649.png",
    logoAlt: "Modern blue and white technology company logo with geometric shapes representing innovation and digital solutions",
    category: "IT Services",
    rating: 4.8,
    responseRate: 95,
    lastEngagement: "2025-11-15"
  },
  {
    id: 2,
    name: "Global Consulting Partners",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_107557647-1764746933583.png",
    logoAlt: "Professional consulting firm logo featuring interconnected circles in navy blue representing partnership and collaboration",
    category: "Consulting",
    rating: 4.6,
    responseRate: 88,
    lastEngagement: "2025-10-28"
  },
  {
    id: 3,
    name: "Enterprise Software Systems",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdf7ba00-1764663121053.png",
    logoAlt: "Enterprise software company logo with abstract circuit board pattern in green and black representing technology infrastructure",
    category: "Software Development",
    rating: 4.9,
    responseRate: 92,
    lastEngagement: "2025-11-20"
  },
  {
    id: 4,
    name: "CloudFirst Technologies",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1b3ed53a7-1764672941380.png",
    logoAlt: "Cloud technology company logo with stylized cloud icon in gradient blue representing modern cloud computing services",
    category: "Cloud Services",
    rating: 4.7,
    responseRate: 90,
    lastEngagement: "2025-11-10"
  },
  {
    id: 5,
    name: "Digital Marketing Experts",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15210c46e-1764663118407.png",
    logoAlt: "Digital marketing agency logo with vibrant orange and purple gradient representing creative digital solutions",
    category: "Marketing",
    rating: 4.5,
    responseRate: 85,
    lastEngagement: "2025-10-05"
  }];


  const displayedVendors = isExpanded ? vendors : vendors?.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="Users" size={20} color="var(--color-primary)" />
          <h3 className="text-base font-semibold text-foreground">Selected Vendors</h3>
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {vendors?.length}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onManageVendors}
          iconName="Settings"
          iconPosition="left">

          Manage
        </Button>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {displayedVendors?.map((vendor) =>
          <div
            key={vendor?.id}
            className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg hover:border-primary transition-colors duration-200">

              <Image
              src={vendor?.logo}
              alt={vendor?.logoAlt}
              className="w-12 h-12 rounded-md object-cover" />

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground truncate">{vendor?.name}</h4>
                <p className="text-xs text-muted-foreground">{vendor?.category}</p>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Star" size={14} color="var(--color-warning)" />
                <span className="text-xs font-medium text-foreground">{vendor?.rating}</span>
              </div>
            </div>
          )}
        </div>

        {vendors?.length > 3 &&
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-3 py-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200 flex items-center justify-center gap-1">

            {isExpanded ?
          <>
                <span>Show Less</span>
                <Icon name="ChevronUp" size={16} />
              </> :

          <>
                <span>Show {vendors?.length - 3} More</span>
                <Icon name="ChevronDown" size={16} />
              </>
          }
          </button>
        }

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-2">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <p className="text-xs text-muted-foreground">
              These vendors will receive the RFP once it's finalized. You can add or remove vendors before sending.
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default VendorSelectionPreview;