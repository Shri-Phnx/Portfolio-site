// All site text lives here. Edit this file to update the portfolio; the
// components only handle layout and animation.

export const profile = {
  name: 'Shrinivas Ramaprasad',
  shortName: 'SHRINIVAS.',
  signature: 'Shrinivas',
  roles: ['IT Program Manager', 'Service Delivery Leader', 'Digital Transformation Leader'],
  location: 'Dubai, UAE',
  email: 'shrinivas.ramaprasad@gmail.com',
  whatsapp: '919940462265',
  whatsappDisplay: '+91 99404 62265',
  linkedin: 'https://www.linkedin.com/in/shrinivas-ramaprasad/',
  linkedinProjects: 'https://www.linkedin.com/in/shrinivas-ramaprasad/details/projects/',
  cvUrl: '/Shrinivas_Ramaprasad_CV.pdf',
};

export const heroStatement = [
  'Large-scale IT transformations, delivered on time and on budget.',
  'Governance that holds up to audit. Delivery that lands.',
];

export const heroStats = [
  { value: '15+', label: 'Years in IT transformation' },
  { value: '$3M+', label: 'Cost savings delivered' },
  { value: '98%', label: 'SLA / OLA compliance' },
  { value: '$471K', label: 'Concurrent programme budgets' },
];

// Professional summary, taken from the Master CV.
export const summary = [
  'ITAM/ITSM Senior Program Manager and Service Delivery Leader with 15+ years of experience delivering large-scale IT transformations for global enterprises, with strong cloud transformation capability across the Azure ecosystem and operational excellence. Expertise in establishing governance frameworks, driving cross-functional team delivery, and implementing PMO structures that ensure compliance and audit readiness.',
  'Demonstrated history of managing programme budgets totalling $471K, achieving high SLA/OLA compliance, and delivering cost savings through strategic risk management, stakeholder engagement, and process optimisation. Expert in Agile/Hybrid delivery methodologies (PRINCE2, Scrum, Certified Project Manager - IIM), ServiceNow, and Azure ecosystems. Skilled at executive reporting, KPI tracking, and escalation management to ensure program success and strategic alignment. Exploring AI-driven automation and predictive analytics to enhance IT governance and service management outcomes.',
];

export const aboutFacts = [
  'Based in Dubai, UAE',
  'Open to India & GCC',
  'Available in 1–2 months',
  'Tamil · Telugu · English · Hindi',
];

export const keyAchievements = [
  {
    value: '$3M+',
    label: 'Cost savings',
    text: 'Delivered $3M+ in cost savings through strategic ITAM optimisation, predictive analytics, and governance across multi-region enterprise programs.',
  },
  {
    value: '3 / 3',
    label: 'Programs within budget',
    text: 'Delivered multi-stream programs within budget (Mail Migration ~$157K, CMS/PKI ~$204K, PC Lifecycle ~$110K) with tight scope control, risk management, and executive reporting, under high audit pressure.',
  },
  {
    value: '98%',
    label: 'SLA / OLA compliance',
    text: 'Achieved 98% SLA/OLA compliance and 20% faster service delivery by implementing ITIL, COBIT, and ISO 27001-aligned governance frameworks.',
  },
  {
    value: '$471K',
    label: 'Budgets managed',
    text: 'Managed program budgets totalling $471K across multiple concurrent projects, maintaining scope control and budget adherence, and strengthened audit readiness by embedding ISO 27001 / ITIL-aligned controls, risk registers, and evidence-ready documentation into ITAM/ITSM processes.',
  },
];

export interface Programme {
  number: string;
  title: string;
  category: string;
  employer: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
}

export const programmes: Programme[] = [
  {
    number: '01',
    title: 'Cyber Security: CMS/PKI Modernisation',
    category: 'CYBER SECURITY / CERTIFICATE MANAGEMENT',
    employer: 'Tata Consultancy Services',
    description:
      'Led the upgrade and Azure move of a global Certificate Management System handling internal PKI and external SSL/TLS certificates. Automated expiry alerts and introduced self-service auto-renewal, so users no longer had to raise ServiceNow tickets for routine renewals. Integrated certificate data into a third-party vendor dashboard.',
    tags: ['PKI', 'SSL / TLS', 'Azure', 'ServiceNow', 'Automation', 'Vendor Integration'],
    metrics: [
      { label: 'BUDGET', value: '$204K' },
      { label: 'SCOPE', value: 'Internal + External Certs' },
      { label: 'OUTCOME', value: 'On time, on budget' },
    ],
  },
  {
    number: '02',
    title: 'Post-Acquisition Mail Migration',
    category: 'M&A INTEGRATION / MESSAGING',
    employer: 'Tata Consultancy Services',
    description:
      "The client had acquired several companies that had to be brought onto its own tenant and policies. Ran the migration from third-party tenants to the client's tenant while keeping every step compliant with the client's Binding Corporate Rules (BCR) for intra-group data transfer.",
    tags: ['Mail Migration', 'Binding Corporate Rules', 'Data Privacy', 'Estimation', 'Stakeholder Management'],
    metrics: [
      { label: 'BUDGET', value: '$157K' },
      { label: 'COMPLIANCE', value: 'BCR' },
      { label: 'OUTCOME', value: 'On time, on budget' },
    ],
  },
  {
    number: '03',
    title: 'PC Lifecycle & ITAM Remediation',
    category: 'IT ASSET MANAGEMENT / SOLUTION ARCHITECTURE',
    employer: 'Tata Consultancy Services',
    description:
      "Program manager and ITAM solution architect for GE HealthCare. Closed out audit findings, fixed operational risks in the PC lifecycle, and put proactive controls in place. Earned a written endorsement from GE HealthCare's IT leader as a \"strategic execution leader\".",
    tags: ['ITAM', 'PC Lifecycle', 'Audit Remediation', 'Risk Management', 'Solution Architecture'],
    metrics: [
      { label: 'BUDGET', value: '$110K' },
      { label: 'TIMEFRAME', value: '6 months' },
      { label: 'OUTCOME', value: 'Client IT leader endorsement' },
    ],
  },
  {
    number: '04',
    title: 'Enterprise ITAM Cost Optimisation',
    category: 'SOFTWARE ASSET MANAGEMENT / PROCESS EXCELLENCE',
    employer: 'BNY Mellon Technologies',
    description:
      "Built Software Asset Management operations from scratch and defined the organisation's ITAM policy framework, aligned with ISO 20000/27001. Ran licence true-ups across regions and re-engineered global ITSM processes through automation.",
    tags: ['Software Asset Management', 'Licence Compliance', 'ServiceNow', 'Process Re-engineering', 'ISO 27001'],
    metrics: [
      { label: 'SAVINGS', value: '$3M+' },
      { label: 'PROCESSING TIME', value: '−30%' },
      { label: 'STALE ITSM DATA', value: '−39%' },
      { label: 'CHANGE REJECTIONS', value: '−28%' },
    ],
  },
];

export const skillGroups = [
  {
    title: 'PROGRAMME & DELIVERY LEADERSHIP',
    badge: 'CORE PILLAR',
    stat: 'PRINCE2 · AGILE',
    description: 'End-to-end ownership of multi-workstream programmes: integrated plans, dependencies, budgets and executive reporting.',
    items: ['Program & Project Management', 'PMO Setup & Operations', 'Agile / PRINCE2 / Hybrid', 'Budget Planning & Cost Control', 'Risk, Issue & Dependency Management', 'KPI Tracking & Executive Reporting'],
    colSpan: 'lg:col-span-7',
  },
  {
    title: 'SERVICE DELIVERY & ITSM / ITAM',
    badge: 'OPERATIONS',
    stat: 'ITIL V4 MP',
    description: 'Stable operations and measurable service outcomes across ITAM, SACM and CMDB.',
    items: ['Service Delivery Management', 'Quality Assurance & SLA Management', 'SACM & CMDB', 'IT Asset Management', 'Vendor & Contract Management'],
    colSpan: 'lg:col-span-5',
  },
  {
    title: 'GOVERNANCE, RISK & COMPLIANCE',
    badge: 'ASSURANCE',
    stat: 'ISO 27001 LA',
    description: 'Governance frameworks, approval gates and evidence-ready documentation that stand up to internal and external audit.',
    items: ['ITIL / COBIT / ISO 27001', 'Governance & Compliance Frameworks', 'Audit Readiness', 'Risk Management & Escalation', 'Process Optimisation / Excellence'],
    colSpan: 'lg:col-span-5',
  },
  {
    title: 'PLATFORMS & AI',
    badge: 'ENABLERS',
    stat: 'GEN AI CERTIFIED',
    description: 'The platforms I run programmes on, and the AI tools I use to automate and predict.',
    items: ['ServiceNow', 'Azure', 'Flexera', 'Generative AI & AI Agents', 'Prompt Engineering', 'Digital Transformation & Automation'],
    colSpan: 'lg:col-span-7',
  },
];

// Innovation & Emerging Technology Projects, from the Master CV.
export const innovation = [
  {
    title: 'AI PRODUCT DEVELOPMENT',
    text: 'Built AI-powered applications using GenAI, prompt engineering, and AI Agents frameworks as personal innovation projects.',
  },
  {
    title: 'TECHNICAL DEMONSTRATIONS',
    text: 'Presented AI product demos to 200+ audience members at technology meetups and conferences.',
  },
  {
    title: 'ACTIVE LEARNING',
    text: 'Maintaining a pipeline of 2 AI innovation projects exploring intelligent automation and workflow optimisation.',
  },
  {
    title: 'CERTIFICATIONS',
    text: 'Generative AI Certification, with hands-on prompt engineering and AI Agents development.',
  },
];

export const experience = [
  {
    id: '01',
    year: '2023 – 2025',
    title: 'PROGRAM MANAGER / SOLUTION ARCHITECT / SERVICE DELIVERY MANAGER',
    organization: 'TATA CONSULTANCY SERVICES · DUBAI & BENGALURU',
    points: [
      'Owned end-to-end delivery for multiple workstreams across Infra, Security, ITAM and vendors, with integrated roadmaps and tight dependency management.',
      'Orchestrated an ITSM and ITAM transformation spanning Mail Migration ($157K), Cyber Security CMS/PKI ($204K) and PC Lifecycle Management ($110K), all on time and within budget.',
      'Established ITIL, COBIT and ISO 27001-aligned governance with approval gates and escalation procedures, achieving 98% SLA/OLA compliance.',
      'Led cross-functional teams of 10–20 stakeholders; mitigated audit findings to reach an audit-ready state for Offshore Development Centre operations.',
      'Built an operating model integrating CMDB-as-a-Service with SLA frameworks, stabilising critical operations.',
    ],
  },
  {
    id: '02',
    year: '2020 – 2023',
    title: 'IT ASSET MANAGER / SERVICE DELIVERY LEAD',
    organization: 'COGNIZANT TECHNOLOGY SOLUTIONS · CHENNAI',
    points: [
      'Led ITAM & SACM service delivery, coordinating IT, Procurement, Security, Finance and platform owners (ServiceNow / Flexera).',
      'Awarded Cognizant "Certificate of Appreciation" for exemplary FY2022 performance.',
      'Embedded GRC monitoring controls into ITSM workflows and built SLA dashboards for stakeholders.',
      'Represented Cognizant in all internal and external ITAM audits; owned budget forecasting and RFP estimation.',
      'Kept IT asset logistics and vendor management running across India through COVID-19.',
    ],
  },
  {
    id: '03',
    year: '2013 – 2020',
    title: 'IT ASSET MANAGER / PROCESS IMPROVEMENT LEAD',
    organization: 'BNY MELLON TECHNOLOGIES · CHENNAI',
    points: [
      'Achieved $3M+ in ITAM-related cost savings through licence compliance optimisation, audit management and governance.',
      'Led organisation-wide licence true-up and reconciliation programmes.',
      'Cut procurement and asset processing time by 30% through automation and process re-engineering.',
      "Defined the organisation's ITAM policy framework aligned with ISO 20000/27001.",
      'Reduced process inefficiencies by 27%, removed 39% of stale ITSM data and cut change ticket rejections by 28%.',
    ],
  },
  {
    id: '04',
    year: '2010 – 2013',
    title: 'SOFTWARE TESTER',
    organization: 'FUNIZEN SOLUTIONS · BENGALURU',
    points: [],
  },
];

export const education = [
  { title: 'Certified Chief Technology Officer', org: 'IIT Delhi', year: '2026 (Ongoing)' },
  { title: 'Diploma in Certified Project Management', org: 'IIM Indore, India', year: '2022' },
  { title: 'Bachelor of Engineering, Computer Science', org: 'SRM Institute of Science and Technology, Chennai', year: '2009' },
];

export const awards = [
  { title: 'Leadership Endorsement', detail: 'GE HealthCare IT Leader (TCS client)', year: '2025' },
  { title: 'Certificate of Appreciation', detail: 'Reed Exhibitions (Cognizant client)', year: '2022' },
  { title: 'Recognised SME for ITSM & ITAM Practices', detail: 'Infrastructure, BNY', year: '' },
  { title: '"Top Emerging Global Leaders Shaping the Future in 2026"', detail: 'Featured in The Arabian Articles', year: '2026' },
  { title: 'Nominated, Outstanding Leadership Awards', detail: 'Fluxx Conference', year: '2026' },
];

export const certifications = [
  'PRINCE2 Foundation & Practitioner (6th Edition)',
  'ITIL v4 Managing Professional (MP)',
  'Agile Scrum Master (ASM)',
  'Six Sigma Green Belt',
  'ISO 27001 Lead Auditor',
  'Certified Software Asset Manager (CSAM)',
  'CHAMP',
  'Flexera ITAM',
  'ServiceNow Fundamentals',
  'Google Cloud Digital Leader',
  'Generative AI Certification',
  'NLP Personal & Business Practitioner',
];

// Certification logo strip under the hero. `logo` is a file name inside
// src/assets/certs/; tiles without a logo file show the short name instead.
export const certificationBadges = [
  { name: 'PRINCE2 Foundation & Practitioner', short: 'PRINCE2', logo: 'prince2' },
  { name: 'ITIL v4 Managing Professional', short: 'ITIL 4 MP', logo: 'itil' },
  { name: 'ISO 27001 Lead Auditor', short: 'ISO 27001', logo: 'iso-27001' },
  { name: 'Certified Software Asset Manager', short: 'CSAM', logo: 'csam' },
  { name: 'Certified Hardware Asset Management Professional', short: 'CHAMP', logo: 'champ' },
  { name: 'Google Cloud Digital Leader', short: 'Google Cloud', logo: 'google-cloud' },
  { name: 'ServiceNow Fundamentals', short: 'ServiceNow', logo: 'servicenow' },
  { name: 'EXIN Agile Scrum Master', short: 'ASM', logo: 'scrum-master' },
  { name: 'Lean Six Sigma Green Belt', short: 'Six Sigma GB', logo: 'six-sigma' },
  { name: 'Generative AI Certification', short: 'Gen AI', logo: 'gen-ai' },
  { name: 'Flexera ITAM', short: 'Flexera', logo: 'flexera' },
  { name: 'Certified Project Management, IIM Indore', short: 'IIM Indore', logo: 'iim-indore' },
  { name: 'NLP Personal & Business Practitioner (Onefluencer)', short: 'NLP', logo: 'nlp' },
];
