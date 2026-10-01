import { doc } from "./richtext";

export const settingsSeed = {
  companyName: "SLIIQQUE Real Estate",
  tagline: "Better homes. Bigger futures.",
  email: "sliiqque.space@gmail.com",
  phone: "+234 704 100 0085",
  whatsapp: "2347041000085",
  address: "1247 Wilshire Blvd, Los Angeles, CA 90024",
  hours: [
    { days: "Monday – Friday", hours: "9:00 – 18:00" },
    { days: "Saturday", hours: "10:00 – 16:00" },
    { days: "Sunday", hours: "By appointment" },
  ],
  socials: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "Facebook", url: "https://facebook.com" },
    { label: "X", url: "https://x.com" },
  ],
  faqs: [
    {
      question: "How do I arrange a viewing?",
      answer:
        "Open any listing and use the Request a viewing form, or send us a message from the contact page. An agent will confirm a time within one working day.",
    },
    {
      question: "Do you charge buyers a fee?",
      answer:
        "Our fees are agreed in writing before we start work and depend on the service. Ask any agent for a breakdown before you commit.",
    },
    {
      question: "Can you help me sell my home?",
      answer:
        "Yes. Use the Sell tab on the home page or the contact form and tell us about your property. An agent will prepare a valuation and explain the selling process.",
    },
    {
      question: "Do you list rental properties?",
      answer:
        "Yes. Choose Rent in the property search to see homes available for long-term rent.",
    },
    {
      question: "How are prices shown?",
      answer:
        "Each listing shows its price in the currency set by the agent. Rental prices are monthly and are marked /mo.",
    },
    {
      question: "How quickly will you reply?",
      answer:
        "We aim to reply to every message within 24 hours on working days.",
    },
  ],
};

export const aboutSeed = {
  headline: "Real estate guided by people who know the neighbourhood",
  intro:
    "We help people buy, sell and rent with honest advice and clear information, from the first viewing to the day the keys change hands.",
  // Listing, agent and city counts are computed live on the page; these are extra editable figures.
  stats: [{ value: "24h", label: "Typical reply time" }],
  values: [
    {
      title: "Straight talk",
      text: "We tell you what we think of a price, a property or a plan, even when it is not what you hoped to hear.",
    },
    {
      title: "Local knowledge",
      text: "Our agents live and work in the areas they cover, so advice comes from experience, not a brochure.",
    },
    {
      title: "Clear process",
      text: "You always know the next step, who is responsible for it and what it will cost.",
    },
    {
      title: "Long-term relationships",
      text: "A good move is the start of a relationship. We stay in touch long after completion.",
    },
  ],
  closingTitle: "Ready to make your next move?",
  closingText:
    "Browse current listings or tell us what you are looking for and we will do the searching with you.",
  story: doc([
    { h2: "Our story" },
    {
      p: "SLIIQQUE Real Estate started with a simple idea: property decisions are too important to be rushed or confusing. We built a small team of agents who explain the market in plain language and put the client's goals first.",
    },
    {
      p: "Today we help buyers, sellers, landlords and investors across several cities. Every listing on this site is added and checked by our team, and every enquiry goes to a real person.",
    },
    { h2: "How we work" },
    {
      ul: [
        "We listen first, then recommend.",
        "We publish clear prices and honest descriptions.",
        "We keep you informed at every stage of the transaction.",
      ],
    },
  ]),
};

export const agentSeeds: Record<
  string,
  {
    bio: string;
    yearsExperience: number;
    specialties: string[];
    email: string;
    phone: string;
  }
> = {
  "Sophie Carter": {
    bio: "Sophie specialises in premium family homes and first purchases. She is known for calm, thorough guidance and for finding properties that never reached the portals.",
    yearsExperience: 12,
    specialties: ["Luxury homes", "First-time buyers", "Relocation"],
    email: "sliiqque.space@gmail.com",
    phone: "+234 704 100 0085",
  },
  "James Wilson": {
    bio: "James leads our sales team and has handled hundreds of transactions across the city. Clients value his realistic pricing advice and tight negotiation.",
    yearsExperience: 15,
    specialties: ["Residential sales", "Negotiation", "Market analysis"],
    email: "sliiqque.space@gmail.com",
    phone: "+234 704 100 0085",
  },
  "Olivia Bennett": {
    bio: "Olivia advises landlords and investors on yield, financing and portfolio strategy, with a focus on long-term, low-risk returns.",
    yearsExperience: 10,
    specialties: ["Investment", "Rentals", "Portfolio planning"],
    email: "sliiqque.space@gmail.com",
    phone: "+234 704 100 0085",
  },
  "Daniel Brooks": {
    bio: "Daniel covers commercial space and mixed-use buildings, helping businesses find premises that support growth.",
    yearsExperience: 14,
    specialties: ["Commercial", "Lettings", "Land"],
    email: "sliiqque.space@gmail.com",
    phone: "+234 704 100 0085",
  },
};
