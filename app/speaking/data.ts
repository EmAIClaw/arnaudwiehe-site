// Speaking event data for arnaudwiehe.com
// Each event maps to a full page on the site

export interface SpeakingEvent {
  slug: string
  name: string
  shortName: string
  date: string
  dateFormatted: string
  year: string
  location: string
  topic: string
  category: string
  tags: string[]
  status: 'upcoming' | 'past'
  youtubeId?: string        // YouTube video ID (for embed)
  youtubeUrl?: string       // Full YouTube watch URL
  heroImage?: string        // path relative to assets/
  thumbnail?: string        // path relative to assets/ (for listing)
  metaDescription: string
  summary: string           // HTML/markdown rich summary
  keyTakeaways: string[]
  relatedTopics: string[]
}

export const speakingEvents: SpeakingEvent[] = [
  // 2026
  {
    slug: 'gitex-europe-berlin-2026',
    name: 'GITEX Europe Berlin 2026',
    shortName: 'GITEX Europe 2026',
    date: '2026-05-01',
    dateFormatted: 'May 2026',
    year: '2026',
    location: 'Berlin, Germany',
    topic: 'AI, Cybersecurity & Emerging Technologies',
    category: 'Global Conference',
    tags: ['AI', 'Cybersecurity', 'Emerging Tech', 'Digital Transformation'],
    status: 'past',
    heroImage: '/images/speaking/gitex-dubai-2025-1.jpg',
    thumbnail: '/images/speaking/gitex-dubai-2025-2.jpg',
    metaDescription: 'Arnaud Wiehe at GITEX Europe Berlin 2026 on AI, cybersecurity, and emerging technologies.',
    summary: '<p>GITEX Europe brings the globally renowned GITEX brand to the heart of Europe. Arnaud spoke on navigating the intersection of AI capabilities and cybersecurity risk.</p>',
    keyTakeaways: ['AI governance frameworks must evolve with technology', 'Cybersecurity in the age of AI requires new approaches'],
    relatedTopics: ['AI Governance', 'Cybersecurity Leadership', 'Emerging Technologies'],
  },
  // 2025
  {
    slug: 'ikea-corporate-2025',
    name: 'IKEA Corporate Event',
    shortName: 'IKEA',
    date: '2025-09-01',
    dateFormatted: 'September 2025',
    year: '2025',
    location: 'Internal / Europe',
    topic: 'Emerging Technologies in 2025',
    category: 'Corporate',
    tags: ['Emerging Tech', 'AI', 'Innovation'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe speaking at IKEA corporate event on emerging technologies in 2025.',
    summary: '<p>Internal corporate engagement with IKEA leadership on emerging technology trends and their implications for retail and supply chain security.</p>',
    keyTakeaways: ['Emerging technologies reshape retail operations', 'Security must be embedded in innovation'],
    relatedTopics: ['Emerging Technologies', 'Corporate Innovation', 'Retail Security'],
  },
  {
    slug: 'heliview-dutch-cloud-ai-2025',
    name: 'Heliview Dutch Cloud & AI Conference',
    shortName: 'Heliview Cloud & AI',
    date: '2025-06-01',
    dateFormatted: 'June 2025',
    year: '2025',
    location: 'Netherlands',
    topic: 'AI Governance & Cloud Security',
    category: 'Conference',
    tags: ['AI Governance', 'Cloud Security', 'Dutch Tech'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe keynote at Heliview Dutch Cloud & AI Conference on AI governance and cloud security.',
    summary: '<p>Keynote address on the intersection of AI governance and cloud security for Dutch technology leaders.</p>',
    keyTakeaways: ['AI governance requires cloud-native security', 'Compliance frameworks must adapt to AI'],
    relatedTopics: ['AI Governance', 'Cloud Security', 'Compliance'],
  },
  {
    slug: 'cloud-computing-conference-athens-2025',
    name: 'Cloud Computing Conference',
    shortName: 'Cloud Computing Conf',
    date: '2025-04-01',
    dateFormatted: 'April 2025',
    year: '2025',
    location: 'Athens, Greece',
    topic: 'AI, Quantum, AR/VR, Robotics, Space Tech',
    category: 'Conference',
    tags: ['AI', 'Quantum', 'AR/VR', 'Robotics', 'Space Tech'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe at Cloud Computing Conference Athens on emerging technologies and cybersecurity.',
    summary: '<p>Comprehensive overview of emerging technology security spanning AI, quantum computing, extended reality, robotics, and the space economy.</p>',
    keyTakeaways: ['Emerging tech creates novel attack surfaces', 'Security must anticipate technology evolution'],
    relatedTopics: ['Emerging Technologies', 'Innovation Security', 'Future Tech'],
  },
  {
    slug: 'reinvent-security-podcast',
    name: 'Re:invent Security Podcast',
    shortName: 'Re:invent Security',
    date: '2025-03-01',
    dateFormatted: 'March 2025',
    year: '2025',
    location: 'Global (Online)',
    topic: 'Next-Gen CISO, AI Threats & Leadership',
    category: 'Media',
    tags: ['CISO', 'AI Threats', 'Security Leadership', 'Podcast'],
    status: 'past',
    youtubeId: 'O2wc5s-I6_o',
    youtubeUrl: 'https://www.youtube.com/watch?v=O2wc5s-I6_o',
    metaDescription: 'Arnaud Wiehe on the Re:invent Security Podcast discussing next-generation CISO leadership and AI threats.',
    summary: '<p>In-depth conversation on the evolution of the CISO role, AI-driven threats, and security leadership in the age of artificial intelligence.</p>',
    keyTakeaways: ['Next-gen CISOs must be AI-literate', 'AI democratizes sophisticated attacks'],
    relatedTopics: ['CISO Leadership', 'AI Threats', 'Security Strategy'],
  },
  {
    slug: 'gitex-global-dubai-2025',
    name: 'GITEX Global Dubai 2025',
    shortName: 'GITEX Global 2025',
    date: '2025-10-14',
    dateFormatted: 'October 14–18, 2025',
    year: '2025',
    location: 'Dubai, UAE',
    topic: 'AI, Cybersecurity & Emerging Technologies',
    category: 'Global Conference',
    tags: ['AI', 'Cybersecurity', 'Emerging Tech', 'Digital Transformation'],
    status: 'past',
    heroImage: '/images/speaking/gitex-dubai-2025-1.jpg',
    thumbnail: '/images/speaking/gitex-dubai-2025-2.jpg',
    metaDescription: 'Arnaud Wiehe at GITEX Global Dubai 2025 — the world\'s largest tech exhibition — on AI and cybersecurity.',
    summary: '<p>At GITEX Global 2025, Arnaud addressed harnessing AI\'s transformative potential while managing security and governance risks. The session explored moving beyond reactive responses to strategic AI risk posture.</p>',
    keyTakeaways: ['AI governance requires embedding risk management', 'AI threats are often mundane misuse, not superintelligence'],
    relatedTopics: ['AI Governance', 'Cybersecurity Leadership', 'Digital Risk'],
  },
  // 2024
  {
    slug: 'next-it-security-benelux-2024',
    name: 'Next IT Security – Benelux',
    shortName: 'Next IT Security',
    date: '2024-06-01',
    dateFormatted: 'June 2024',
    year: '2024',
    location: 'Amsterdam, Netherlands',
    topic: 'AI & Cybersecurity',
    category: 'Conference',
    tags: ['AI', 'Cybersecurity', 'Benelux'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe at Next IT Security Benelux on AI and cybersecurity.',
    summary: '<p>Regional security conference exploring AI\'s impact on cybersecurity operations and defense strategies.</p>',
    keyTakeaways: ['AI transforms both offense and defense', 'Regional collaboration strengthens security'],
    relatedTopics: ['AI Security', 'Regional Cybersecurity', 'Defense Strategies'],
  },
  {
    slug: 'next-it-security-c-suite-stockholm-2024',
    name: 'Next IT Security – C-Suite Edition',
    shortName: 'Next IT C-Suite',
    date: '2024-03-01',
    dateFormatted: 'March 2024',
    year: '2024',
    location: 'Stockholm, Sweden',
    topic: 'Leadership, Talent & Strategy',
    category: 'Executive Forum',
    tags: ['Leadership', 'Talent', 'Strategy', 'Executive'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe keynote at Next IT Security C-Suite Edition Stockholm on leadership and strategy.',
    summary: '<p>Executive-focused keynote on cybersecurity leadership, talent development, and strategic planning in rapidly evolving threat landscape.</p>',
    keyTakeaways: ['Leadership must align security with business', 'Talent is the ultimate security asset'],
    relatedTopics: ['Leadership', 'Talent Development', 'Strategy'],
  },
  {
    slug: 'dutch-cloud-conference-2024',
    name: 'Dutch Cloud & AI Conference',
    shortName: 'Dutch Cloud Conference',
    date: '2024-09-24',
    dateFormatted: 'September 24, 2024',
    year: '2024',
    location: 'Postillion Convention Centre, Netherlands',
    topic: 'Cloud & AI Security',
    category: 'Conference',
    tags: ['Cloud', 'AI', 'Security', 'Netherlands'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe at Dutch Cloud & AI Conference on cloud and AI security.',
    summary: '<p>Speaking engagement at the Dutch Cloud & AI Conference covering the intersection of cloud computing and artificial intelligence security.</p>',
    keyTakeaways: ['Cloud and AI convergence creates new security challenges', 'Governance frameworks must adapt'],
    relatedTopics: ['Cloud Security', 'AI Security', 'Digital Transformation'],
  },
  {
    slug: 'it-software-asset-management-belgium-2024',
    name: 'IT & Software Asset Management Belgium',
    shortName: 'IT & SAM Belgium',
    date: '2024-11-19',
    dateFormatted: 'November 19, 2024',
    year: '2024',
    location: 'Lamot Congrescentrum, Belgium',
    topic: 'IT Asset Management & Security',
    category: 'Conference',
    tags: ['IT Asset Management', 'Software Licensing', 'Security', 'Belgium'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe at IT & Software Asset Management Belgium on IT asset management and security.',
    summary: '<p>Presentation at Heliview IT & Software Asset Management Belgium event covering the security implications of IT asset management and software governance.</p>',
    keyTakeaways: ['Asset management is foundational to security', 'Visibility enables control'],
    relatedTopics: ['IT Governance', 'Asset Management', 'Security Operations'],
  },
  // 2023
  {
    slug: 'isaca-risk-event-2023',
    name: 'ISACA Risk Event 2023 Netherlands',
    shortName: 'ISACA Risk Event',
    date: '2023-11-01',
    dateFormatted: 'November 2023',
    year: '2023',
    location: 'Netherlands',
    topic: 'Cybersecurity Considerations for AI Systems',
    category: 'Conference',
    tags: ['AI', 'Cybersecurity', 'Risk Management', 'ISACA'],
    status: 'past',
    youtubeId: 'HqTlT8vjIyI',
    youtubeUrl: 'https://www.youtube.com/watch?v=HqTlT8vjIyI',
    heroImage: '/images/speaking/ISACA Risk Speaker Photo1.jpg',
    thumbnail: '/images/speaking/ISACA Risk Speaker Photo2.jpg',
    metaDescription: 'Arnaud Wiehe at ISACA Risk Event 2023 on cybersecurity considerations for AI systems.',
    summary: '<p>ISACA session for risk professionals on governing AI systems. Covered model governance, data risk, third-party AI dependencies, and audit challenges for AI decision-making.</p>',
    keyTakeaways: ['AI risk extends existing frameworks', 'Third-party AI risk is significant', 'Audit needs new methods for AI'],
    relatedTopics: ['AI Risk Management', 'IT Governance', 'AI Compliance'],
  },
  {
    slug: 'evanta-gartner-benelux-cio-ciso-2023',
    name: 'Evanta (Gartner) – Benelux CIO & CISO Executive Summit',
    shortName: 'Evanta/Gartner Summit',
    date: '2023-10-01',
    dateFormatted: 'October 2023',
    year: '2023',
    location: 'Amsterdam, Netherlands',
    topic: 'Strategic Pitfalls in Third-Party Risk Management',
    category: 'Executive Summit',
    tags: ['Third-Party Risk', 'CIO', 'CISO', 'Executive'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe at Evanta/Gartner Benelux CIO & CISO Executive Summit on third-party risk management.',
    summary: '<p>Executive session on strategic pitfalls in third-party risk management for CIOs and CISOs in the Benelux region.</p>',
    keyTakeaways: ['Third-party risk is supply chain risk', 'Visibility into vendor security is critical'],
    relatedTopics: ['Third-Party Risk', 'Supply Chain Security', 'Executive Strategy'],
  },
  {
    slug: 'economist-space-economy-summit-2023',
    name: 'Economist Impact – Space Economy Summit',
    shortName: 'Economist Space Summit',
    date: '2023-09-01',
    dateFormatted: 'September 2023',
    year: '2023',
    location: 'Virtual',
    topic: 'The Final Frontier: Cybersecurity in Space',
    category: 'Thought Leadership',
    tags: ['Space Tech', 'Cybersecurity', 'Space Economy'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe at Economist Impact Space Economy Summit on cybersecurity in space.',
    summary: '<p>Thought leadership session on securing space-based infrastructure, satellite systems, and the emerging space economy\'s cybersecurity challenges.</p>',
    keyTakeaways: ['Space infrastructure is critical infrastructure', 'Satellite security is often overlooked'],
    relatedTopics: ['Space Security', 'Critical Infrastructure', 'Emerging Domains'],
  },
  {
    slug: 'world-summit-ai-2023',
    name: 'World Summit AI 2023 Amsterdam',
    shortName: 'World Summit AI',
    date: '2023-10-11',
    dateFormatted: 'October 11–12, 2023',
    year: '2023',
    location: 'Amsterdam, Netherlands',
    topic: 'Cybersecurity Considerations for AI Systems',
    category: 'Global Conference',
    tags: ['AI', 'Cybersecurity', 'AI Governance', 'AI Safety'],
    status: 'past',
    heroImage: '/images/speaking/world-summit-ai-2023.jpg',
    thumbnail: '/images/speaking/world-summit-ai-2023.jpg',
    metaDescription: 'Arnaud Wiehe at World Summit AI 2023 Amsterdam — Europe\'s premier AI conference — on AI system security.',
    summary: '<p>World Summit AI session addressing what happens when AI systems are attacked, how to protect training data, and the security implications of AI-as-a-service dependencies.</p>',
    keyTakeaways: ['AI security is not traditional software security', 'Training data integrity is paramount', 'AI-as-a-service creates new dependencies'],
    relatedTopics: ['AI Security', 'Machine Learning', 'AI Governance'],
  },
  {
    slug: 'techex-cyber-security-cloud-expo-europe-2023',
    name: 'TechEx – Cyber Security & Cloud Expo Europe',
    shortName: 'TechEx Cyber & Cloud',
    date: '2023-09-01',
    dateFormatted: 'September 2023',
    year: '2023',
    location: 'Amsterdam, Netherlands',
    topic: 'Securing the Future: Intersection of Future Technologies and Cybersecurity',
    category: 'Conference',
    tags: ['Cybersecurity', 'Cloud', 'Future Tech'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe at TechEx Cyber Security & Cloud Expo Europe on securing future technologies.',
    summary: '<p>Exploration of how emerging technologies from cloud to edge computing reshape the cybersecurity landscape and what defenses are needed.</p>',
    keyTakeaways: ['Cloud security is evolving rapidly', 'Future tech requires future-ready security'],
    relatedTopics: ['Cloud Security', 'Future Technologies', 'Cyber Defense'],
  },
  {
    slug: 'network-circle-ciso-executive-circle-2023',
    name: 'Network Circle – CISO Executive Circle',
    shortName: 'Network Circle CISO',
    date: '2023-08-01',
    dateFormatted: 'August 2023',
    year: '2023',
    location: 'Europe',
    topic: 'Securing the Future: Intersection of Future Technologies and Cybersecurity',
    category: 'Executive Circle',
    tags: ['CISO', 'Executive', 'Future Tech', 'Peer Learning'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe at Network Circle CISO Executive Circle on future technologies and cybersecurity.',
    summary: '<p>Peer-to-peer CISO executive circle discussion on navigating emerging technology security challenges among European security leaders.</p>',
    keyTakeaways: ['Peer learning accelerates security maturity', 'CISOs must anticipate technology shifts'],
    relatedTopics: ['CISO Leadership', 'Executive Networking', 'Future Tech'],
  },
  {
    slug: 'economist-impact-metaverse-summit-2023',
    name: 'Economist Impact – Enterprise Metaverse Summit',
    shortName: 'Economist Metaverse',
    date: '2023-06-15',
    dateFormatted: 'June 2023',
    year: '2023',
    location: 'Virtual',
    topic: 'Securing the Metaverse',
    category: 'Thought Leadership',
    tags: ['Metaverse', 'Cybersecurity', 'Extended Reality', 'Digital Identity'],
    status: 'past',
    metaDescription: 'Arnaud Wiehe at Economist Impact Enterprise Metaverse Summit on securing virtual environments.',
    summary: '<p>Examined securing enterprise metaverse deployments — persistent digital identities, XR device biometric data, and borderless virtual governance.</p>',
    keyTakeaways: ['Metaverse security requires rethinking identity', 'Biometric data in XR is sensitive', 'Virtual environments cross jurisdictions'],
    relatedTopics: ['Metaverse Security', 'Digital Identity', 'XR Security'],
  },
]

export function getSpeakingEventBySlug(slug: string): SpeakingEvent | undefined {
  return speakingEvents.find(e => e.slug === slug)
}

export function getAllSpeakingEvents(): SpeakingEvent[] {
  return [...speakingEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getUpcomingEvents(): SpeakingEvent[] {
  return speakingEvents.filter(e => e.status === 'upcoming').sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
}

export function getPastEvents(): SpeakingEvent[] {
  return speakingEvents.filter(e => e.status === 'past').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getAdjacentEvents(slug: string): { prev: SpeakingEvent | null; next: SpeakingEvent | null } {
  const sorted = getAllSpeakingEvents()
  const idx = sorted.findIndex(e => e.slug === slug)
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  }
}
