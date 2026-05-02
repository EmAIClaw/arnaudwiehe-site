export interface Book {
  slug: string
  title: string
  subtitle: string
  cover: string
  coverWidth: number
  coverHeight: number
  quote: string
  description: string
  amazonUrl: string
  year: string
  alt: string
  coauthor?: string
  toc: string[]
  excerpts: Array<{ title: string; content: string }>
  takeaways: string[]
  audience: string[]
  testimonials: Array<{ quote: string; author: string; title: string }>
}

export const books: Book[] = [
  {
    slug: 'emerging-tech-emerging-threats',
    title: 'Emerging Tech, Emerging Threats',
    subtitle: 'A Cybersecurity Guide for Innovative Leaders',
    cover: '/images/books/emerging-tech-cover.webp',
    coverWidth: 600,
    coverHeight: 900,
    quote: '"A strategic guide to navigating the intersection of innovation and risk."',
    description: `AI, quantum computing, extended reality, and IoT are reshaping every industry — and every threat landscape. This book equips technology and business leaders with the strategic thinking needed to harness emerging technologies safely. It examines how each technology creates new attack surfaces, what leaders must understand to govern them responsibly, and how to move beyond fear-driven narratives toward a more nuanced view of innovation and risk.`,
    amazonUrl: 'https://www.amazon.com/dp/B0CXXL8W58',
    year: '2024',
    alt: 'Emerging Tech, Emerging Threats cover',
    coauthor: 'Tiago Teles (CISSP, MBA)',
    toc: [
      'Chapter 1: The Imperative of Securing Emerging Technologies',
      'Chapter 2: Future-Proofing Cybersecurity',
      'Chapter 3: Artificial Intelligence and Machine Learning',
      'Chapter 4: Robots Among Us',
      'Chapter 5: Internet of Things (IoT)',
      'Chapter 6: Autonomous Vehicles',
      'Chapter 7: Immersive Worlds, Immersive Threats',
      'Chapter 8: Blockchain, Cryptocurrencies, NFTs, and Smart Contracts',
      'Chapter 9: Biotechnology and Life Sciences',
      'Chapter 10: Exploring Additional Emerging Technologies',
    ],
    excerpts: [
      {
        title: 'The Pace of Change',
        content: `"The pace of change has never been this fast, yet it will never be this slow again." This quote from Chapter 1 captures the urgency facing leaders today. From 15 billion IoT devices in 2015 to an estimated 75 billion by 2025, the exponential growth of connected technology creates unprecedented security challenges. The book shows how to navigate this landscape without succumbing to fear.`,
      },
      {
        title: 'The Futurist Mindset',
        content: `Chapter 1 introduces the Futures Cone methodology—thinking like a futurist to prepare for what comes next. "Thinking like a futurist allows you to examine the current state of cybersecurity challenges to emerging technologies. It encourages you to visualize a secure digital future and to take strategic steps today towards making that future a reality."`,
      },
      {
        title: 'AI and Machine Learning Security',
        content: `Chapter 3 provides a comprehensive deep-dive into securing AI systems. From data poisoning attacks to adversarial machine learning, the chapter covers real-world examples including Microsoft's Tay chatbot that was corrupted by malicious users. The book offers practical frameworks for securing training data and protecting AI systems.`,
      },
    ],
    takeaways: [
      'Emerging technologies transform industries but also introduce new vulnerabilities',
      'The Futures Cone methodology helps leaders anticipate and prepare for technological shifts',
      'AI security requires protecting training data from poisoning and models from adversarial attacks',
      'IoT devices create massive attack surfaces—securing them is a governance challenge',
      'Quantum computing threatens current encryption methods—post-quantum cryptography is essential',
      'Security by design must be embedded from the earliest stages of technology adoption',
    ],
    audience: [
      'Technology and innovation leaders',
      'CISOs and cybersecurity executives',
      'Board members overseeing digital transformation',
      'AI governance professionals',
      'Risk managers in technology-intensive industries',
      'Policymakers and regulators',
    ],
    testimonials: [
      {
        quote: 'Arnaud was a thoroughly engaging speaker for our attendees at the Applied IoT Security stage and delivered a clear presentation, which provided valuable key takeaways for those in the space who are seeking advice when it comes to protecting against IoT threats.',
        author: 'Rosie Fletcher',
        title: 'Conference Producer at TechEx Events',
      },
      {
        quote: "I've just finished reading The Book on Cybersecurity by Arnaud Wiehe. It is an excellent guide to the growing cyber-threat landscape and provides practical solutions to protect against it. Arnaud has achieved the difficult balance of being understandable to the layman and insightful to the expert. Highly recommended!",
        author: 'Brett McDougall',
        title: 'National Chief Information Officer, SPAR South Africa',
      },
      {
        quote: 'We were honored to have Arnaud as a speaker for the virtual day of the Economist Enterprise Metaverse Summit. He shared valuable insights on the topic of “Securing the Metaverse: The Intersection of Metaverse and Cybersecurity,” and we had positive feedback from our attendees.',
        author: 'Helen Ponsford',
        title: 'Senior Programme Editor, The Economist',
      },
    ],
  },
  {
    slug: 'the-book-on-cybersecurity',
    title: 'The Book on Cybersecurity',
    subtitle: 'How Nontechnical Corporate Leaders and Boards Can Manage in a Scary Digital World',
    cover: '/images/books/cybersecurity-cover.webp',
    coverWidth: 600,
    coverHeight: 900,
    quote: '"A must-read for leaders who want to move from cyber confusion to confident decision-making."',
    description: `Cybersecurity doesn't have to be intimidating. This book cuts through the jargon and gives corporate leaders and board members the practical knowledge they need to make confident decisions in a world of mounting digital risk. Written for the non-technical executive, it covers the fundamentals of cyber risk, governance frameworks, and the boardroom conversations that matter.`,
    amazonUrl: 'https://www.amazon.com/dp/B0C2SCKX7J',
    year: '2023',
    alt: 'The Book on Cybersecurity cover',
    toc: [
      'Chapter 1: Securing Yourself Made Easy',
      'Chapter 2: In Technology We Want to Trust',
      'Chapter 3: Essential Cybersecurity Skills for Business Leaders',
      'Chapter 4: Cybersecurity Oversight and Governance',
      'Chapter 5: Building a Strong Cybersecurity Department',
      'Chapter 6: Cybersecurity Risk Management in Action',
      'Chapter 7: When Disaster Strikes',
      'Chapter 8: Compliance or Consequences',
      'Chapter 9: Data Ethics in the Digital Age',
      'Chapter 10: The Intersection of Future Technologies and Cybersecurity',
    ],
    excerpts: [
      {
        title: 'The Two Types of Companies',
        content: `"I am convinced that there are only two types of companies: those that have been hacked and those that will be. And even they are converging into one category: companies that have been hacked and will be hacked again." — Robert Mueller, former FBI Director. This stark reality frames the entire book.`,
      },
      {
        title: 'The 10 Commandments of Cyber Hygiene',
        content: `From using different passwords for each website to enabling two-factor authentication, rejecting all cookie requests, and covering your webcam when not in use—these practical commandments form the backbone of personal cybersecurity. The book provides actionable steps for leaders to protect themselves and model good behavior for their organizations.`,
      },
      {
        title: 'Social Media as a Battleground',
        content: `"Social media websites are no longer performing an envisaged function of creating a positive communication link among friends, family, and professionals. It is a veritable battleground, where insults fly from the human quiver, damaging lives, destroying self-esteem and a person's sense of self-worth." The book exposes how scammers exploit these platforms and provides 7 Safety Secrets for using social media safely.`,
      },
    ],
    takeaways: [
      'Cybersecurity is not a technology problem—it is a business and leadership challenge',
      'There are only two types of companies: those that have been hacked and those that will be',
      'The 10 Commandments of Cyber Hygiene protect leaders personally and professionally',
      'Social engineering, not technical exploits, is the primary attack vector',
      'Board-level cybersecurity literacy is no longer optional—it is a fiduciary responsibility',
      'Crisis management preparedness can make the difference between survival and failure',
    ],
    audience: [
      'Board members and corporate directors',
      'C-suite executives and senior leadership',
      'Non-technical business leaders',
      'Risk management professionals',
      'Compliance officers',
      'Anyone seeking to understand cybersecurity without the jargon',
    ],
    testimonials: [
      {
        quote: 'I found The Book on Cybersecurity to be engaging, with language that is clear, concise, and easy to follow. I particularly appreciate the practical tips and insights provided throughout the book. After reading the first few chapters, I was inspired to immediately fix a few things on my phone.',
        author: 'Dmitry Badiarov',
        title: 'Business Owner, Author, Speaker',
      },
      {
        quote: "In today's world, cybersecurity is no longer a niche topic. It is a crucial aspect of doing business, and the implications of not having a solid security strategy are far-reaching. The Book on Cybersecurity is an excellent resource for demystifying this important topic.",
        author: 'Phil Cracknell',
        title: 'Former Cabinet Office Cyber Security SME',
      },
      {
        quote: 'I worked with Arnaud when he was CISO at TNT. Arnaud is a thought leader in the world of cybersecurity. He brings a wealth of knowledge and experience and has a proven track record of success as a CISO.',
        author: 'Martin Treder',
        title: 'Head of MDM Business Partner, Boehringer Ingelheim, Author of Becoming a Data-driven Organisation',
      },
    ],
  },
]

export function getBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug)
}
