import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import Header from '../../components/ui/Header';
import QuickActions from '../../components/ui/QuickActions';
import VendorFilters from './components/VendorFilters';
import VendorTableRow from './components/VendorTableRow';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import VendorStatsCards from './components/VendorStatsCards';
import VendorDetailsModal from './components/VendorDetailsModal';
import Select from '../../components/ui/Select';


const VendorManagementConsole = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    searchQuery: '',
    categories: [],
    performanceMin: 0,
    performanceMax: 100,
    regions: [],
    certifications: [],
    status: 'all'
  });
  const [sortConfig, setSortConfig] = useState({ key: 'companyName', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockVendors = [
  {
    id: 1,
    companyName: "TechSolutions Inc",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_13d11071a-1764667546676.png",
    logoAlt: "Modern tech company logo with blue and white geometric design on professional background",
    category: "IT Services",
    contactName: "Sarah Johnson",
    email: "sarah.johnson@techsolutions.com",
    phone: "+1 (555) 123-4567",
    performanceScore: 92,
    activeRFPs: 5,
    lastInteraction: "2025-11-28T10:30:00",
    status: "active",
    certifications: ["ISO 9001", "ISO 27001", "SOC 2"],
    region: "North America",
    founded: "2015",
    employees: "500-1000",
    onTimeDelivery: 95,
    qualityScore: 91,
    avgResponseTime: "2.3 hours",
    totalRFPs: 47,
    wonRFPs: 32,
    lastContract: "2025-10-15T00:00:00"
  },
  {
    id: 2,
    companyName: "Global Consulting Partners",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_10c87a385-1764683019455.png",
    logoAlt: "Professional consulting firm logo featuring modern office building with glass facade",
    category: "Consulting",
    contactName: "Michael Chen",
    email: "m.chen@globalconsulting.com",
    phone: "+1 (555) 234-5678",
    performanceScore: 88,
    activeRFPs: 3,
    lastInteraction: "2025-11-30T14:20:00",
    status: "active",
    certifications: ["CMMI", "ISO 9001"],
    region: "Asia Pacific",
    founded: "2010",
    employees: "1000-5000",
    onTimeDelivery: 89,
    qualityScore: 87,
    avgResponseTime: "3.1 hours",
    totalRFPs: 63,
    wonRFPs: 41,
    lastContract: "2025-11-10T00:00:00"
  },
  {
    id: 3,
    companyName: "Innovative Manufacturing Co",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_19f42d635-1764644184719.png",
    logoAlt: "Industrial manufacturing company logo with metallic gears and machinery elements",
    category: "Manufacturing",
    contactName: "Emily Rodriguez",
    email: "e.rodriguez@innovativemfg.com",
    phone: "+1 (555) 345-6789",
    performanceScore: 85,
    activeRFPs: 7,
    lastInteraction: "2025-11-25T09:15:00",
    status: "active",
    certifications: ["ISO 9001", "Minority Owned"],
    region: "North America",
    founded: "2008",
    employees: "200-500",
    onTimeDelivery: 87,
    qualityScore: 84,
    avgResponseTime: "4.2 hours",
    totalRFPs: 38,
    wonRFPs: 24,
    lastContract: "2025-09-20T00:00:00"
  },
  {
    id: 4,
    companyName: "Swift Logistics Group",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_122f81d03-1764691404571.png",
    logoAlt: "Logistics company logo with delivery truck and global shipping routes on blue background",
    category: "Logistics",
    contactName: "David Thompson",
    email: "d.thompson@swiftlogistics.com",
    phone: "+1 (555) 456-7890",
    performanceScore: 79,
    activeRFPs: 2,
    lastInteraction: "2025-11-20T16:45:00",
    status: "active",
    certifications: ["ISO 9001"],
    region: "Europe",
    founded: "2012",
    employees: "100-200",
    onTimeDelivery: 82,
    qualityScore: 78,
    avgResponseTime: "5.8 hours",
    totalRFPs: 29,
    wonRFPs: 15,
    lastContract: "2025-08-05T00:00:00"
  },
  {
    id: 5,
    companyName: "Creative Marketing Agency",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c61c1e46-1764674836638.png",
    logoAlt: "Creative marketing agency logo with colorful paint splashes and modern typography",
    category: "Marketing",
    contactName: "Jessica Williams",
    email: "j.williams@creativemarketing.com",
    phone: "+1 (555) 567-8901",
    performanceScore: 94,
    activeRFPs: 4,
    lastInteraction: "2025-12-01T11:30:00",
    status: "active",
    certifications: ["Woman Owned", "Minority Owned"],
    region: "North America",
    founded: "2018",
    employees: "50-100",
    onTimeDelivery: 96,
    qualityScore: 93,
    avgResponseTime: "1.8 hours",
    totalRFPs: 52,
    wonRFPs: 38,
    lastContract: "2025-11-25T00:00:00"
  },
  {
    id: 6,
    companyName: "Facilities Management Pro",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1cb0990d9-1764746939082.png",
    logoAlt: "Facilities management company logo with building maintenance tools and service icons",
    category: "Facilities Management",
    contactName: "Robert Martinez",
    email: "r.martinez@facilitiespro.com",
    phone: "+1 (555) 678-9012",
    performanceScore: 76,
    activeRFPs: 6,
    lastInteraction: "2025-11-18T08:00:00",
    status: "active",
    certifications: ["ISO 9001"],
    region: "Latin America",
    founded: "2014",
    employees: "200-500",
    onTimeDelivery: 78,
    qualityScore: 75,
    avgResponseTime: "6.5 hours",
    totalRFPs: 41,
    wonRFPs: 22,
    lastContract: "2025-07-12T00:00:00"
  },
  {
    id: 7,
    companyName: "SecureIT Solutions",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1589579c9-1764672944544.png",
    logoAlt: "Cybersecurity company logo with shield and lock symbols on dark digital background",
    category: "IT Services",
    contactName: "Amanda Lee",
    email: "a.lee@secureit.com",
    phone: "+1 (555) 789-0123",
    performanceScore: 91,
    activeRFPs: 8,
    lastInteraction: "2025-11-29T13:20:00",
    status: "active",
    certifications: ["ISO 27001", "SOC 2", "CMMI"],
    region: "North America",
    founded: "2016",
    employees: "100-200",
    onTimeDelivery: 93,
    qualityScore: 90,
    avgResponseTime: "2.7 hours",
    totalRFPs: 56,
    wonRFPs: 42,
    lastContract: "2025-11-18T00:00:00"
  },
  {
    id: 8,
    companyName: "Enterprise Consulting Group",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_16fe1130a-1764746936125.png",
    logoAlt: "Enterprise consulting firm logo with business strategy charts and professional team imagery",
    category: "Consulting",
    contactName: "James Anderson",
    email: "j.anderson@enterprisecg.com",
    phone: "+1 (555) 890-1234",
    performanceScore: 73,
    activeRFPs: 1,
    lastInteraction: "2025-11-15T15:30:00",
    status: "inactive",
    certifications: ["ISO 9001"],
    region: "Europe",
    founded: "2009",
    employees: "500-1000",
    onTimeDelivery: 75,
    qualityScore: 72,
    avgResponseTime: "7.2 hours",
    totalRFPs: 34,
    wonRFPs: 18,
    lastContract: "2025-06-08T00:00:00"
  },
  {
    id: 9,
    companyName: "Precision Manufacturing Ltd",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1240a4976-1764746935078.png",
    logoAlt: "Precision manufacturing company logo with technical blueprints and measurement tools",
    category: "Manufacturing",
    contactName: "Maria Garcia",
    email: "m.garcia@precisionmfg.com",
    phone: "+1 (555) 901-2345",
    performanceScore: 87,
    activeRFPs: 5,
    lastInteraction: "2025-11-27T10:45:00",
    status: "active",
    certifications: ["ISO 9001", "ISO 27001"],
    region: "Asia Pacific",
    founded: "2011",
    employees: "1000-5000",
    onTimeDelivery: 88,
    qualityScore: 86,
    avgResponseTime: "3.5 hours",
    totalRFPs: 45,
    wonRFPs: 29,
    lastContract: "2025-10-22T00:00:00"
  },
  {
    id: 10,
    companyName: "Express Delivery Services",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1016769c1-1764700983225.png",
    logoAlt: "Express delivery service logo with fast-moving package and speed lines on orange background",
    category: "Logistics",
    contactName: "Christopher Brown",
    email: "c.brown@expressdelivery.com",
    phone: "+1 (555) 012-3456",
    performanceScore: 82,
    activeRFPs: 3,
    lastInteraction: "2025-11-22T12:00:00",
    status: "active",
    certifications: ["ISO 9001"],
    region: "North America",
    founded: "2013",
    employees: "200-500",
    onTimeDelivery: 84,
    qualityScore: 81,
    avgResponseTime: "4.8 hours",
    totalRFPs: 37,
    wonRFPs: 23,
    lastContract: "2025-09-14T00:00:00"
  },
  {
    id: 11,
    companyName: "Digital Marketing Experts",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15210c46e-1764663118407.png",
    logoAlt: "Digital marketing agency logo with social media icons and analytics graphs on gradient background",
    category: "Marketing",
    contactName: "Nicole Taylor",
    email: "n.taylor@digitalexperts.com",
    phone: "+1 (555) 123-4568",
    performanceScore: 89,
    activeRFPs: 6,
    lastInteraction: "2025-11-26T09:30:00",
    status: "active",
    certifications: ["Woman Owned"],
    region: "Europe",
    founded: "2017",
    employees: "50-100",
    onTimeDelivery: 91,
    qualityScore: 88,
    avgResponseTime: "2.9 hours",
    totalRFPs: 48,
    wonRFPs: 35,
    lastContract: "2025-11-05T00:00:00"
  },
  {
    id: 12,
    companyName: "BuildRight Facilities",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea6e0ddd-1764746934787.png",
    logoAlt: "Facilities construction company logo with building crane and architectural elements",
    category: "Facilities Management",
    contactName: "Daniel Wilson",
    email: "d.wilson@buildright.com",
    phone: "+1 (555) 234-5679",
    performanceScore: 0,
    activeRFPs: 0,
    lastInteraction: "2025-11-10T14:15:00",
    status: "pending",
    certifications: [],
    region: "North America",
    founded: "2020",
    employees: "10-50",
    onTimeDelivery: 0,
    qualityScore: 0,
    avgResponseTime: "N/A",
    totalRFPs: 0,
    wonRFPs: 0,
    lastContract: "N/A"
  },
  {
    id: 13,
    companyName: "CloudTech Innovations",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce55ac87-1764678314180.png",
    logoAlt: "Cloud technology company logo with cloud computing symbols and network connections",
    category: "IT Services",
    contactName: "Sophia Martinez",
    email: "s.martinez@cloudtech.com",
    phone: "+1 (555) 345-6780",
    performanceScore: 95,
    activeRFPs: 9,
    lastInteraction: "2025-12-02T16:00:00",
    status: "active",
    certifications: ["ISO 27001", "SOC 2", "CMMI"],
    region: "Asia Pacific",
    founded: "2019",
    employees: "100-200",
    onTimeDelivery: 97,
    qualityScore: 94,
    avgResponseTime: "1.5 hours",
    totalRFPs: 61,
    wonRFPs: 48,
    lastContract: "2025-11-28T00:00:00"
  },
  {
    id: 14,
    companyName: "Strategic Business Advisors",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_10c87a385-1764683019455.png",
    logoAlt: "Business consulting firm logo with strategic planning charts and corporate imagery",
    category: "Consulting",
    contactName: "William Davis",
    email: "w.davis@strategicadvisors.com",
    phone: "+1 (555) 456-7891",
    performanceScore: 84,
    activeRFPs: 4,
    lastInteraction: "2025-11-24T11:20:00",
    status: "active",
    certifications: ["ISO 9001", "CMMI"],
    region: "North America",
    founded: "2007",
    employees: "200-500",
    onTimeDelivery: 86,
    qualityScore: 83,
    avgResponseTime: "3.8 hours",
    totalRFPs: 54,
    wonRFPs: 36,
    lastContract: "2025-10-30T00:00:00"
  },
  {
    id: 15,
    companyName: "Advanced Manufacturing Systems",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f4fe474c-1764746934838.png",
    logoAlt: "Advanced manufacturing company logo with robotic automation and industrial machinery",
    category: "Manufacturing",
    contactName: "Isabella Johnson",
    email: "i.johnson@advancedmfg.com",
    phone: "+1 (555) 567-8902",
    performanceScore: 90,
    activeRFPs: 7,
    lastInteraction: "2025-11-28T08:45:00",
    status: "active",
    certifications: ["ISO 9001", "ISO 27001", "Minority Owned"],
    region: "Europe",
    founded: "2014",
    employees: "500-1000",
    onTimeDelivery: 92,
    qualityScore: 89,
    avgResponseTime: "2.6 hours",
    totalRFPs: 49,
    wonRFPs: 33,
    lastContract: "2025-11-12T00:00:00"
  },
  {
    id: 16,
    companyName: "Global Freight Solutions",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_115f2f8e2-1764746934812.png",
    logoAlt: "Global freight company logo with cargo ship and international shipping routes",
    category: "Logistics",
    contactName: "Ethan Anderson",
    email: "e.anderson@globalfreight.com",
    phone: "+1 (555) 678-9013",
    performanceScore: 78,
    activeRFPs: 2,
    lastInteraction: "2025-11-19T13:30:00",
    status: "active",
    certifications: ["ISO 9001"],
    region: "Middle East",
    founded: "2010",
    employees: "1000-5000",
    onTimeDelivery: 80,
    qualityScore: 77,
    avgResponseTime: "5.2 hours",
    totalRFPs: 42,
    wonRFPs: 25,
    lastContract: "2025-08-28T00:00:00"
  },
  {
    id: 17,
    companyName: "Brand Builders Agency",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_11be6d464-1764746934783.png",
    logoAlt: "Brand building agency logo with creative design elements and marketing symbols",
    category: "Marketing",
    contactName: "Olivia Thomas",
    email: "o.thomas@brandbuilders.com",
    phone: "+1 (555) 789-0124",
    performanceScore: 93,
    activeRFPs: 5,
    lastInteraction: "2025-11-30T10:15:00",
    status: "active",
    certifications: ["Woman Owned", "Minority Owned"],
    region: "North America",
    founded: "2016",
    employees: "50-100",
    onTimeDelivery: 94,
    qualityScore: 92,
    avgResponseTime: "2.1 hours",
    totalRFPs: 57,
    wonRFPs: 44,
    lastContract: "2025-11-20T00:00:00"
  },
  {
    id: 18,
    companyName: "Total Facility Care",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c63ad12d-1764746934723.png",
    logoAlt: "Facility care company logo with cleaning and maintenance service icons",
    category: "Facilities Management",
    contactName: "Alexander White",
    email: "a.white@totalfacility.com",
    phone: "+1 (555) 890-1235",
    performanceScore: 81,
    activeRFPs: 4,
    lastInteraction: "2025-11-23T15:00:00",
    status: "active",
    certifications: ["ISO 9001"],
    region: "Latin America",
    founded: "2015",
    employees: "100-200",
    onTimeDelivery: 83,
    qualityScore: 80,
    avgResponseTime: "4.5 hours",
    totalRFPs: 39,
    wonRFPs: 24,
    lastContract: "2025-09-30T00:00:00"
  },
  {
    id: 19,
    companyName: "CyberGuard Technologies",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f8da8be6-1764637414724.png",
    logoAlt: "Cybersecurity technology company logo with digital security shield and encryption symbols",
    category: "IT Services",
    contactName: "Mia Harris",
    email: "m.harris@cyberguard.com",
    phone: "+1 (555) 901-2346",
    performanceScore: 0,
    activeRFPs: 0,
    lastInteraction: "2025-11-05T09:00:00",
    status: "suspended",
    certifications: ["ISO 27001"],
    region: "North America",
    founded: "2018",
    employees: "50-100",
    onTimeDelivery: 68,
    qualityScore: 65,
    avgResponseTime: "9.5 hours",
    totalRFPs: 22,
    wonRFPs: 8,
    lastContract: "2025-05-15T00:00:00"
  },
  {
    id: 20,
    companyName: "Executive Consulting Partners",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_10c87a385-1764683019455.png",
    logoAlt: "Executive consulting firm logo with leadership and business strategy imagery",
    category: "Consulting",
    contactName: "Benjamin Clark",
    email: "b.clark@executivepartners.com",
    phone: "+1 (555) 012-3457",
    performanceScore: 86,
    activeRFPs: 3,
    lastInteraction: "2025-11-21T14:30:00",
    status: "active",
    certifications: ["ISO 9001", "CMMI"],
    region: "Europe",
    founded: "2006",
    employees: "500-1000",
    onTimeDelivery: 87,
    qualityScore: 85,
    avgResponseTime: "3.3 hours",
    totalRFPs: 58,
    wonRFPs: 39,
    lastContract: "2025-10-18T00:00:00"
  },
  {
    id: 21,
    companyName: "Smart Manufacturing Co",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_11d69097a-1764746934828.png",
    logoAlt: "Smart manufacturing company logo with IoT sensors and automated production line",
    category: "Manufacturing",
    contactName: "Charlotte Lewis",
    email: "c.lewis@smartmfg.com",
    phone: "+1 (555) 123-4569",
    performanceScore: 88,
    activeRFPs: 6,
    lastInteraction: "2025-11-29T11:00:00",
    status: "active",
    certifications: ["ISO 9001", "ISO 27001"],
    region: "Asia Pacific",
    founded: "2012",
    employees: "200-500",
    onTimeDelivery: 90,
    qualityScore: 87,
    avgResponseTime: "3.0 hours",
    totalRFPs: 46,
    wonRFPs: 31,
    lastContract: "2025-11-08T00:00:00"
  },
  {
    id: 22,
    companyName: "Rapid Transport Network",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1516f15b0-1764746934735.png",
    logoAlt: "Transport network company logo with highway routes and delivery vehicle fleet",
    category: "Logistics",
    contactName: "Henry Walker",
    email: "h.walker@rapidtransport.com",
    phone: "+1 (555) 234-5680",
    performanceScore: 80,
    activeRFPs: 4,
    lastInteraction: "2025-11-25T16:20:00",
    status: "active",
    certifications: ["ISO 9001"],
    region: "North America",
    founded: "2011",
    employees: "500-1000",
    onTimeDelivery: 82,
    qualityScore: 79,
    avgResponseTime: "4.9 hours",
    totalRFPs: 40,
    wonRFPs: 26,
    lastContract: "2025-09-22T00:00:00"
  },
  {
    id: 23,
    companyName: "Social Media Masters",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_14c406c85-1764746937480.png",
    logoAlt: "Social media marketing agency logo with engagement icons and viral content symbols",
    category: "Marketing",
    contactName: "Ava Robinson",
    email: "a.robinson@socialmasters.com",
    phone: "+1 (555) 345-6781",
    performanceScore: 91,
    activeRFPs: 7,
    lastInteraction: "2025-12-01T09:45:00",
    status: "active",
    certifications: ["Woman Owned"],
    region: "Europe",
    founded: "2019",
    employees: "10-50",
    onTimeDelivery: 93,
    qualityScore: 90,
    avgResponseTime: "2.4 hours",
    totalRFPs: 51,
    wonRFPs: 37,
    lastContract: "2025-11-22T00:00:00"
  },
  {
    id: 24,
    companyName: "Premier Property Services",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f403057f-1764746933122.png",
    logoAlt: "Property services company logo with building management and real estate elements",
    category: "Facilities Management",
    contactName: "Lucas Young",
    email: "l.young@premierproperties.com",
    phone: "+1 (555) 456-7892",
    performanceScore: 77,
    activeRFPs: 3,
    lastInteraction: "2025-11-17T12:30:00",
    status: "active",
    certifications: ["ISO 9001"],
    region: "Middle East",
    founded: "2013",
    employees: "200-500",
    onTimeDelivery: 79,
    qualityScore: 76,
    avgResponseTime: "5.7 hours",
    totalRFPs: 35,
    wonRFPs: 20,
    lastContract: "2025-07-25T00:00:00"
  },
  {
    id: 25,
    companyName: "NextGen IT Services",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1244301ef-1764746948321.png",
    logoAlt: "Next generation IT services logo with futuristic technology and innovation symbols",
    category: "IT Services",
    contactName: "Emma King",
    email: "e.king@nextgenit.com",
    phone: "+1 (555) 567-8903",
    performanceScore: 89,
    activeRFPs: 5,
    lastInteraction: "2025-11-27T14:00:00",
    status: "active",
    certifications: ["ISO 27001", "SOC 2"],
    region: "North America",
    founded: "2017",
    employees: "100-200",
    onTimeDelivery: 91,
    qualityScore: 88,
    avgResponseTime: "2.8 hours",
    totalRFPs: 53,
    wonRFPs: 40,
    lastContract: "2025-11-15T00:00:00"
  },
  {
    id: 26,
    companyName: "Business Growth Consultants",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_196751363-1764659452606.png",
    logoAlt: "Business growth consulting firm logo with upward trending graphs and success metrics",
    category: "Consulting",
    contactName: "Noah Scott",
    email: "n.scott@businessgrowth.com",
    phone: "+1 (555) 678-9014",
    performanceScore: 83,
    activeRFPs: 2,
    lastInteraction: "2025-11-16T10:00:00",
    status: "active",
    certifications: ["ISO 9001"],
    region: "Latin America",
    founded: "2009",
    employees: "100-200",
    onTimeDelivery: 85,
    qualityScore: 82,
    avgResponseTime: "4.1 hours",
    totalRFPs: 44,
    wonRFPs: 28,
    lastContract: "2025-08-19T00:00:00"
  }];


  useEffect(() => {
    setVendors(mockVendors);
    setFilteredVendors(mockVendors);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [vendors, activeFilters, sortConfig]);

  const applyFiltersAndSort = () => {
    let filtered = [...vendors];

    if (activeFilters?.searchQuery) {
      const query = activeFilters?.searchQuery?.toLowerCase();
      filtered = filtered?.filter((vendor) =>
      vendor?.companyName?.toLowerCase()?.includes(query) ||
      vendor?.contactName?.toLowerCase()?.includes(query) ||
      vendor?.email?.toLowerCase()?.includes(query) ||
      vendor?.category?.toLowerCase()?.includes(query)
      );
    }

    if (activeFilters?.status !== 'all') {
      filtered = filtered?.filter((vendor) => vendor?.status === activeFilters?.status);
    }

    if (activeFilters?.categories?.length > 0) {
      filtered = filtered?.filter((vendor) =>
      activeFilters?.categories?.some((cat) =>
      vendor?.category?.toLowerCase()?.replace(/\s+/g, '-') === cat
      )
      );
    }

    if (activeFilters?.regions?.length > 0) {
      filtered = filtered?.filter((vendor) =>
      activeFilters?.regions?.some((region) =>
      vendor?.region?.toLowerCase()?.replace(/\s+/g, '-') === region
      )
      );
    }

    if (activeFilters?.certifications?.length > 0) {
      filtered = filtered?.filter((vendor) =>
      activeFilters?.certifications?.some((cert) =>
      vendor?.certifications?.some((vendorCert) =>
      vendorCert?.toLowerCase()?.replace(/\s+/g, '-') === cert
      )
      )
      );
    }

    filtered = filtered?.filter((vendor) =>
    vendor?.performanceScore >= activeFilters?.performanceMin &&
    vendor?.performanceScore <= activeFilters?.performanceMax
    );

    filtered?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (typeof aValue === 'string') {
        return sortConfig?.direction === 'asc' ?
        aValue?.localeCompare(bValue) :
        bValue?.localeCompare(aValue);
      }

      return sortConfig?.direction === 'asc' ?
      aValue - bValue :
      bValue - aValue;
    });

    setFilteredVendors(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectVendor = (vendorId, isSelected) => {
    setSelectedVendors((prev) =>
    isSelected ?
    [...prev, vendorId] :
    prev?.filter((id) => id !== vendorId)
    );
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const currentPageVendorIds = paginatedVendors?.map((v) => v?.id);
      setSelectedVendors(currentPageVendorIds);
    } else {
      setSelectedVendors([]);
    }
  };

  const handleBulkAction = async (action) => {
    console.log('Executing bulk action:', action, 'on vendors:', selectedVendors);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSelectedVendors([]);
  };

  const handleViewDetails = (vendorId) => {
    const vendor = vendors?.find((v) => v?.id === vendorId);
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  const handleSaveVendor = (updatedVendor) => {
    setVendors((prev) =>
    prev?.map((v) => v?.id === updatedVendor?.id ? updatedVendor : v)
    );
    setIsModalOpen(false);
  };

  const stats = {
    totalVendors: vendors?.length,
    activeVendors: vendors?.filter((v) => v?.status === 'active')?.length,
    pendingVendors: vendors?.filter((v) => v?.status === 'pending')?.length,
    avgPerformance: Math.round(
      vendors?.reduce((sum, v) => sum + v?.performanceScore, 0) / vendors?.length
    )
  };

  const totalPages = Math.ceil(filteredVendors?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVendors = filteredVendors?.slice(startIndex, startIndex + itemsPerPage);

  const allSelected = paginatedVendors?.length > 0 && paginatedVendors?.every((v) => selectedVendors?.includes(v?.id));

  return (
    <>
      <Helmet>
        <title>Vendor Management Console - RFP Manager Pro</title>
        <meta name="description" content="Centralized supplier data and performance analytics for data-driven vendor selection and relationship management" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="pt-16 flex h-screen">
          <div className="w-80 flex-shrink-0">
            <VendorFilters
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters} />

          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">Vendor Management Console</h1>
                  <p className="text-sm text-muted-foreground">
                    Manage supplier relationships and track vendor performance
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <QuickActions />
                  <Button
                    variant="default"
                    iconName="UserPlus"
                    iconPosition="left"
                    onClick={() => console.log('Add new vendor')}>

                    Add Vendor
                  </Button>
                </div>
              </div>

              <VendorStatsCards stats={stats} />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredVendors?.length)} of {filteredVendors?.length} vendors
                  </span>
                  <Select
                    options={[
                    { value: 10, label: '10 per page' },
                    { value: 25, label: '25 per page' },
                    { value: 50, label: '50 per page' },
                    { value: 100, label: '100 per page' }]
                    }
                    value={itemsPerPage}
                    onChange={setItemsPerPage} />

                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => console.log('Export vendors')}>

                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Filter"
                    iconPosition="left">

                    More Filters
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full">
                <thead className="bg-muted/50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={(e) => handleSelectAll(e?.target?.checked)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20" />

                    </th>
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => handleSort('companyName')}
                        className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">

                        Company
                        <Icon name={sortConfig?.key === 'companyName' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={16} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <span className="text-sm font-semibold text-foreground">Contact Info</span>
                    </th>
                    <th className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleSort('performanceScore')}
                        className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors mx-auto">

                        Performance
                        <Icon name={sortConfig?.key === 'performanceScore' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={16} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleSort('activeRFPs')}
                        className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors mx-auto">

                        Active RFPs
                        <Icon name={sortConfig?.key === 'activeRFPs' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={16} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => handleSort('lastInteraction')}
                        className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">

                        Last Interaction
                        <Icon name={sortConfig?.key === 'lastInteraction' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} size={16} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <span className="text-sm font-semibold text-foreground">Status</span>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <span className="text-sm font-semibold text-foreground">Certifications</span>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <span className="text-sm font-semibold text-foreground">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedVendors?.map((vendor) =>
                  <VendorTableRow
                    key={vendor?.id}
                    vendor={vendor}
                    isSelected={selectedVendors?.includes(vendor?.id)}
                    onSelect={handleSelectVendor}
                    onEdit={handleViewDetails}
                    onEmail={(id) => console.log('Email vendor:', id)}
                    onViewDetails={handleViewDetails} />

                  )}
                </tbody>
              </table>

              {filteredVendors?.length === 0 &&
              <div className="flex flex-col items-center justify-center py-16">
                  <Icon name="Users" size={64} color="var(--color-muted-foreground)" className="mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No vendors found</h3>
                  <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                  <Button
                  variant="outline"
                  onClick={() => handleFilterChange({
                    searchQuery: '',
                    categories: [],
                    performanceMin: 0,
                    performanceMax: 100,
                    regions: [],
                    certifications: [],
                    status: 'all'
                  })}>

                    Clear All Filters
                  </Button>
                </div>
              }
            </div>

            {totalPages > 1 &&
            <div className="p-4 border-t border-border bg-card flex items-center justify-between">
                <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconPosition="left">

                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                      currentPage === pageNum ?
                      'bg-primary text-primary-foreground' :
                      'text-foreground hover:bg-muted'}`
                      }>

                        {pageNum}
                      </button>);

                })}
                </div>

                <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right">

                  Next
                </Button>
              </div>
            }
          </div>
        </div>

        <BulkActionsToolbar
          selectedCount={selectedVendors?.length}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedVendors([])} />


        <VendorDetailsModal
          vendor={selectedVendor}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveVendor} />

      </div>
    </>);

};

export default VendorManagementConsole;