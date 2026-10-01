import type { Article } from "../../payload-types";
import { doc } from "./richtext";

const U = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

export interface ArticleSeed {
  slug: string;
  title: string;
  category: Article["category"];
  author: string;
  excerpt: string;
  readingMinutes: number;
  publishedAt: string;
  cover: string;
  body: ReturnType<typeof doc>;
}

export const articleSeeds: ArticleSeed[] = [
  {
    slug: "home-prices-climbing-key-cities",
    title: "Home Prices Are Climbing in Key Cities",
    category: "Market Trends",
    author: "James Wilson",
    excerpt:
      "What is pushing prices up in popular cities, and how buyers can still find value.",
    readingMinutes: 5,
    publishedAt: "2026-04-12",
    cover: U("photo-1560518883-ce09059eeffa"),
    body: doc([
      {
        p: "Prices in many of the most sought-after cities keep moving up. The reasons are rarely mysterious: limited supply, steady demand and the cost of building new homes all push in the same direction. Understanding which of these forces affects your target area helps you decide when to move and what to offer.",
      },
      { h2: "Supply is the story" },
      {
        p: "Where few homes come to market, buyers compete for the same listings. Areas close to transport, schools and employment tend to see the tightest supply, because owners there have little reason to sell and little new land is available.",
      },
      { h2: "What buyers can do" },
      {
        ul: [
          "Get a mortgage agreement in principle before you view, so you can move quickly.",
          "Widen your search by one or two neighbourhoods; small distances can mean large price differences.",
          "Look at homes that have been listed for several weeks, where sellers are often more flexible.",
          "Decide your walk-away price before negotiating and stick to it.",
        ],
      },
      { h2: "A note for sellers" },
      {
        p: "Rising prices do not mean every home sells quickly. Buyers still compare carefully, so accurate pricing and clear photographs matter more than the headline trend.",
      },
      { h2: "How to read the numbers" },
      {
        p: "Average prices can be distorted by a few very expensive sales. Ask your agent for median prices and the number of homes sold in the last three months for the street or postcode you care about. That gives a far better picture than a city-wide headline.",
      },
    ]),
  },
  {
    slug: "five-things-before-buying-a-home",
    title: "5 Things to Know Before Buying a Home",
    category: "Buying Guide",
    author: "Sophie Carter",
    excerpt:
      "A practical checklist for first-time buyers, from budgeting to inspections.",
    readingMinutes: 4,
    publishedAt: "2026-04-08",
    cover: U("photo-1600585154340-be6161a56a0c"),
    body: doc([
      {
        p: "Buying a home is likely the largest purchase you will make. A little preparation turns a stressful process into a manageable one. These five points come up in almost every purchase we handle.",
      },
      { h2: "1. Know the full cost, not just the price" },
      {
        p: "Budget for the deposit, legal fees, taxes, moving costs and an allowance for repairs. Many buyers focus on the monthly payment and forget the one-off costs that arrive in the first month.",
      },
      { h2: "2. Get your finances in order early" },
      {
        p: "Lenders look at your income, existing debts and savings history. Pay down small debts, avoid new credit applications and keep statements for the last few months.",
      },
      { h2: "3. Separate needs from wants" },
      {
        p: "List what you cannot live without, such as bedrooms, commute time or a safe neighbourhood, and what would simply be nice. It keeps viewings focused and negotiations calm.",
      },
      { h2: "4. Always inspect" },
      {
        p: "A professional inspection can reveal damp, structural movement or outdated wiring that is invisible on a viewing. It either gives you peace of mind or a reason to renegotiate.",
      },
      { h2: "5. Choose an agent you trust" },
      {
        p: "A good agent explains the process, tells you when a home is overpriced and keeps the transaction moving. Ask how many similar homes they have sold nearby.",
      },
    ]),
  },
  {
    slug: "why-real-estate-remains-strong-investment",
    title: "Why Real Estate Remains a Strong Investment",
    category: "Investment",
    author: "Olivia Bennett",
    excerpt:
      "Income, appreciation and diversification: the case for property, and its risks.",
    readingMinutes: 6,
    publishedAt: "2026-04-03",
    cover: U("photo-1600607687939-ce8a6c25118c"),
    body: doc([
      {
        p: "Property has attracted investors for generations because it can pay you twice: through rental income and through growth in value over time. It also carries risks that deserve equal attention.",
      },
      { h2: "The case for property" },
      {
        ul: [
          "Rental income can cover costs and provide a steady cash flow.",
          "Values tend to follow long-term growth in population and incomes.",
          "Tangible assets are easier for many people to understand than financial products.",
          "Borrowing allows you to control an asset larger than your savings.",
        ],
      },
      { h2: "The risks" },
      {
        p: "Property is hard to sell quickly, costs money to hold, and can sit empty between tenants. Interest rate changes affect borrowers directly, and a single large asset concentrates your risk in one place.",
      },
      { h2: "Questions to ask before you buy" },
      {
        ol: [
          "What is the realistic rent after management, repairs and vacancy?",
          "Can I cover the mortgage if the property is empty for three months?",
          "Is demand in this area driven by something lasting, such as employers or universities?",
          "What is my exit plan, and who is the likely buyer?",
        ],
      },
      {
        p: "If the numbers only work in the best case, keep looking. The best investments are the ones that still make sense when things go slightly wrong.",
      },
    ]),
  },
  {
    slug: "first-time-renters-checklist",
    title: "A First-Time Renter's Checklist",
    category: "Renting",
    author: "Daniel Brooks",
    excerpt:
      "What to check before you sign a lease, from the deposit to the fine print.",
    readingMinutes: 4,
    publishedAt: "2026-03-27",
    cover: U("photo-1545324418-cc1a3fa10c00"),
    body: doc([
      {
        p: "Renting should be straightforward, but the paperwork can hide costly surprises. Use this checklist before you commit.",
      },
      { h2: "Before you view" },
      {
        ul: [
          "Set a maximum rent, including utilities and service charges.",
          "Check the commute at the time you will actually travel.",
          "Ask what is included: furniture, parking, internet, security.",
        ],
      },
      { h2: "At the viewing" },
      {
        ul: [
          "Open taps, flush toilets and test the water pressure.",
          "Look for damp, mould and signs of leaks around windows.",
          "Test every socket and check the phone signal.",
        ],
      },
      { h2: "Reading the lease" },
      {
        p: "Confirm the length of the term, the notice period, how and when rent can increase, and who pays for repairs. Ask how the deposit is held and under what conditions it is returned.",
      },
      { h2: "Move-in day" },
      {
        p: "Photograph every room and note existing damage in writing, signed by the landlord or agent. It protects your deposit when you leave.",
      },
    ]),
  },
  {
    slug: "prepare-your-home-for-sale",
    title: "How to Prepare Your Home for Sale",
    category: "Selling Tips",
    author: "Sophie Carter",
    excerpt:
      "Simple, low-cost steps that help a home sell faster and for a better price.",
    readingMinutes: 5,
    publishedAt: "2026-03-18",
    cover: U("photo-1600596542815-ffad4c1539a9"),
    body: doc([
      {
        p: "Buyers decide quickly, often within the first minutes of a viewing. Preparation is about helping them picture themselves living in the space.",
      },
      { h2: "Declutter first" },
      {
        p: "Remove personal items and anything you will not use before the move. Clear worktops and shelves make rooms look larger and easier to maintain.",
      },
      { h2: "Fix the small things" },
      {
        ul: [
          "Repair dripping taps, loose handles and cracked tiles.",
          "Touch up paint in neutral colours.",
          "Replace blown bulbs and clean light fittings.",
          "Deal with any damp or smell before photographs are taken.",
        ],
      },
      { h2: "Price it honestly" },
      {
        p: "An overpriced home sits on the market and starts to look stale. Ask your agent for recent sales of similar homes nearby and set a price that attracts viewings in the first two weeks.",
      },
      { h2: "Photographs matter" },
      {
        p: "Most buyers meet your home online first. Shoot in daylight, keep rooms tidy and show every room, including the exterior and any outdoor space.",
      },
    ]),
  },
  {
    slug: "reading-a-mortgage-offer",
    title: "Reading a Mortgage Offer Without the Jargon",
    category: "Buying Guide",
    author: "Olivia Bennett",
    excerpt: "The terms that matter most when you compare mortgage offers.",
    readingMinutes: 5,
    publishedAt: "2026-03-09",
    cover: U("photo-1449824913935-59a10b8d2000"),
    body: doc([
      {
        p: "Two mortgage offers can look similar and cost very different amounts. These are the terms worth understanding before you sign.",
      },
      { h2: "Interest rate versus total cost" },
      {
        p: "A low headline rate can come with fees that cancel the saving. Compare the total amount repayable over the period you expect to keep the loan.",
      },
      { h2: "Fixed or variable" },
      {
        p: "A fixed rate gives certainty on your payment. A variable rate can fall or rise. Choose based on how much change your budget can absorb, not on a guess about the future.",
      },
      { h2: "Fees to look for" },
      {
        ul: [
          "Arrangement or valuation fees.",
          "Early repayment charges.",
          "Insurance the lender requires.",
          "Legal costs charged by the lender.",
        ],
      },
      { h2: "Ask before you sign" },
      {
        ol: [
          "What is the total amount I will repay?",
          "What happens if I want to repay early or move?",
          "Is the rate fixed, and for how long?",
          "What happens when the introductory period ends?",
        ],
      },
    ]),
  },
];
