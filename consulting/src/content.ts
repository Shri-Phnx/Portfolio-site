// All text for the consulting site lives here. The components only handle
// layout and animation.

export const profile = {
  name: 'Shrinivas Ramaprasad',
  tagline: 'Digital Transformation Consultant for IT Industry and Technology Businesses',
  email: 'shrinivas.ramaprasad@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shrinivas-ramaprasad/',
  linkedinLabel: 'linkedin.com/in/shrinivas-ramaprasad',
  booking: 'https://calendly.com/shri-ai-consulting',
  portfolio: 'https://shrinivasramaprasad.site',
};

export const hero = {
  headlineLead: 'Turn Technology Complexity Into',
  headlineAccent: 'Scalable Business Value',
  subtext:
    'Shrinivas Ramaprasad helps CEOs, business owners, and decision-makers in IT and technology businesses design scalable digital transformation strategies that solve critical business challenges, improve enterprise value, and create long-term growth.',
  cta: 'Book Your Free Discovery Session',
  secondary: 'Explore the Method',
};

export const about = {
  headline: 'Digital Transformation Built for Business Outcomes',
  body:
    "I'm Shrinivas Ramaprasad, a Digital Transformation Consultant focused on helping CEOs, business owners, and senior decision-makers in IT industry and technology businesses turn complex technology decisions into scalable business strategies. My work is centred on solving business challenges, improving operational clarity, unlocking enterprise value, and building transformation roadmaps that support sustainable growth across large and mid-sized enterprises.",
  cards: [
    { value: 'Enterprise-Grade', label: 'Strategies designed for large and mid-sized organisations' },
    { value: 'Business-First', label: 'Digital transformation focused on measurable commercial value' },
    { value: 'Scalable', label: 'Roadmaps built to support growth, resilience, and execution' },
  ],
  // Real track record, from the CV.
  proof: [
    { value: '15+', label: 'Years in IT transformation' },
    { value: '$3M+', label: 'Documented cost savings' },
    { value: '98%', label: 'SLA / OLA compliance' },
  ],
};

export const services = {
  headline: 'How I Can Help',
  note: 'Every engagement is scoped to your situation. Scope and fees are agreed on the discovery call.',
  items: [
    {
      title: 'Digital Transformation Strategy',
      text: 'Design a clear transformation roadmap that aligns technology investment with business goals, market realities, and executive priorities.',
    },
    {
      title: 'Enterprise Growth & Scalability Planning',
      text: 'Build scalable strategies for large and mid-sized enterprises so systems, teams, platforms, and processes can support long-term growth.',
    },
    {
      title: 'Business Challenge Diagnosis',
      text: 'Identify the operational, technology, process, and decision-making bottlenecks preventing the business from creating more value.',
    },
    {
      title: 'Technology Value Realisation',
      text: 'Translate IT capability into measurable business value through improved efficiency, smarter prioritisation, better governance, and stronger execution.',
    },
  ],
};

// Real engagements from the CV, anonymised: no client or employer names.
export const work = {
  headline: 'Selected Work',
  items: [
    {
      client: 'Global Healthcare Technology Company',
      result: 'PC lifecycle impact delivered within 6 months',
      text: "The client needed its PC lifecycle and IT asset management brought under control, with audit findings to close and operational risks to address. Acting as programme manager and IT asset solution architect, I mitigated the audit findings, put proactive controls in place and delivered cost-effective solutions on a ~$110K budget. The client's IT leader recommended me as a \"strategic execution leader\".",
    },
    {
      client: 'Global Enterprise, Cyber Security',
      result: 'Certificate renewals automated, on time and on budget',
      text: 'Renewing internal and external security certificates depended on users raising service tickets and tracking expiry dates themselves. I led the upgrade and cloud move of the certificate management platform, automated expiry alerts and introduced self-service auto-renewal, and fed certificate data into a vendor dashboard. Delivered on time within a $204K budget.',
    },
    {
      client: 'Global Financial Services Firm',
      result: '$3M+ in cost savings',
      text: 'The firm needed tighter control of software licence compliance and asset data across regions. I built software asset management operations from scratch, ran licence true-ups and re-engineered service processes, cutting processing time by 30% and removing 39% of stale data from the service management platform.',
    },
  ],
};

export const method = {
  headlineParts: ['How I ', 'Work', ' With ', 'Clients'],
  steps: [
    {
      title: 'Expand',
      text: 'Help CEOs, business owners, and decision-makers identify new digital growth opportunities, expand market reach, and align technology capabilities with larger business ambitions in IT and tech-led organisations.',
    },
    {
      title: 'Optimise',
      text: 'Improve economics, operating efficiency, delivery performance, decision speed, and technology prioritisation so transformation initiatives create measurable business value.',
    },
    {
      title: 'Defend',
      text: 'Build a stronger moat through scalable systems, better customer experience, stronger delivery models, smarter data usage, and technology-enabled differentiation.',
    },
  ],
  outcome: 'Sustained long-term growth and profitability',
};

export const insights = {
  headline: 'Insights for Technology Leaders',
  items: [
    {
      category: 'Digital Transformation',
      title: 'Why Transformation Fails When It Starts With Technology Instead of Business Value',
      text: 'A practical executive lens on aligning IT initiatives with measurable outcomes, leadership priorities, and enterprise value creation.',
    },
    {
      category: 'Scalability',
      title: 'The Scalable Enterprise Roadmap for Mid-Sized Technology Businesses',
      text: 'How growing IT and tech businesses can structure systems, processes, and governance before complexity slows growth.',
    },
    {
      category: 'Executive Decision-Making',
      title: 'How CEOs Can Prioritise Digital Investments With Confidence',
      text: 'A framework for separating high-value transformation initiatives from expensive distractions.',
    },
  ],
};

// Real LinkedIn recommendations (excerpts, wording unchanged), shown without
// the recommender's name or company. Leave empty to hide the section.
export const testimonials: { quote: string; role: string }[] = [
  {
    quote:
      "Shrinivas brings a relentless focus on operational excellence, ensuring services are not just delivered—but optimized, aligned with business goals, and continuously improved. … Whether it's leading complex transformations, mentoring teams, or architecting enterprise-grade systems, Shrinivas brings a visionary yet pragmatic approach.",
    role: 'Senior Cyber Security & Service Delivery Leader · Former manager',
  },
  {
    quote:
      "Shrinivas brought a strong command of the domain, quickly grasping complex requirements and translating them into clear, actionable plans that moved teams forward. … We significantly reduced asset collection gaps by streamlining leaver PC recovery and identifying previously unknown PCs. … He's a thoughtful leader with a sharp eye for both strategy and execution.",
    role: 'Senior Information Technology Leader · Client',
  },
  {
    quote:
      'Shrini is very methodical in his approach to work. He has applied his Six Sigma skill set to good use and both automated and improved a number of processes within the team.',
    role: 'Head of IT Planning & Procurement, SVP · Former manager',
  },
];

export const discovery = {
  headline: "Let's Work Together",
  text: 'Book a free discovery session to clarify your biggest business challenge, assess where digital transformation can create the most value, and identify the next strategic move for your organisation.',
  cta: 'Book Your Free Discovery Session',
};
