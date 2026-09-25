# AI Governance Starts as Cybersecurity Governance

> "If a machine is expected to be infallible, it cannot also be intelligent."
> -- Alan Turing, pioneer in computer science and artificial intelligence

In March 2016, DeepMind's AlphaGo defeated Lee Sedol, one of the world's top Go players, in a match that captured global attention. The ancient game of Go, known for its strategic depth and astronomical number of possible moves, had been considered beyond the reach of artificial intelligence. AlphaGo's victory demonstrated something profound: AI could handle tasks requiring not just calculation, but creativity and intuition.

That was over a decade ago. Since then, the pace of AI development has only accelerated. The launch of ChatGPT in November 2022 brought generative AI into mainstream consciousness. Within months, organizations were racing to deploy AI systems for everything from customer service to content creation to code generation. Google responded with Gemini. Meta released Llama 2 as an open-source model. Anthropic introduced Claude. The competitive pressure to adopt AI became intense.

But here is what many organizations discovered: the governance structures that protect traditional IT systems are woefully inadequate for AI. AI systems do not behave like traditional software. They learn, adapt, and make decisions in ways that can be opaque even to their creators. The data that powers them, the training data, has become the new crown jewels, requiring protection that goes far beyond traditional data security.

The good news is that effective AI governance does not require inventing entirely new frameworks. Organizations that have built robust cybersecurity governance already have the foundation. The challenge is extending those structures to address AI's unique risks.

## The Governance Foundation Already Exists

In my previous book, The Book on Cybersecurity, I outlined five questions every board should ask about cybersecurity:

1. What is our current cybersecurity posture?
2. What are our biggest cybersecurity risks?
3. How much are we spending and is it sufficient?
4. Do we have a tested incident response plan?
5. Are we compliant with evolving regulations?

These same five questions apply directly to AI governance. The CISO who manages cybersecurity risk can extend that oversight to AI systems. The governance committees that oversee technology and risk can add AI to their mandates. The incident response plans that cover data breaches can be adapted for AI failures.

The key insight is this that AI governance is not a separate discipline requiring separate committees, separate budgets, and separate reporting lines. It is an extension of cybersecurity governance into a new domain.

## Why AI Security Is Different

While the governance structures remain the same, the technical risks differ significantly. Traditional cybersecurity focuses on protecting data at rest and in transit. AI security must protect training data integrity, model behavior, and output safety.

Consider data poisoning. In a traditional system, corrupted data might cause a database error or produce incorrect reports. In an AI system, poisoned training data can cause the model to learn wrong patterns and these patterns can persist and compound over time. The model might systematically discriminate against certain groups, generate harmful content, or make unsafe recommendations.

Microsoft learned this lesson with Tay, its Twitter chatbot released in 2016. Within hours of launch, malicious actors fed Tay a stream of harmful content. The bot learned from these interactions and began generating offensive tweets. Microsoft swiftly withdraw the bot.

The Tay incident illustrates a fundamental difference, that AI systems learn continuously from their environment. Traditional software does not change its behavior based on user inputs unless explicitly programmed to do so. AI systems do, making them both more powerful and more vulnerable.

## The New Crown Jewels, Training Data

In traditional cybersecurity, we identify crown jewels, the data assets most critical to the organization, and apply strongest protection. Customer databases. Financial records. Intellectual property.

For AI governance, training data becomes the crown jewels. The quality, integrity, and security of training data directly determines model behavior. Yet many organizations have been shockingly cavalier about training data protection.

The risks extend beyond confidentiality. Training data integrity matters as much as secrecy. If attackers can manipulate training data, even subtly, they can influence model behavior in ways that may be difficult to detect. A financial institution's lending model trained on poisoned data might systematically discriminate against certain applicants. A medical diagnostic AI trained on corrupted images might misclassify diseases.

Organizations must apply the same rigor to training data protection that they apply to their most sensitive databases:

- Data validation and cleaning: Rigorous quality control, outlier detection, and anomaly identification before data enters the training pipeline
- Source verification: Risk analysis on every data input, with particular scrutiny on external data sources
- Access controls: Limiting who can modify training data and maintaining audit trails of all changes
- Version control: Tracking which data versions trained which model versions, enabling rollback if problems emerge

## Extending the CISO's Role

The Chief Information Security Officer is already responsible for identifying and managing cybersecurity risks across the organization. AI risk should fall naturally within this mandate.

The CISO understands the organization's risk appetite. They have established relationships with the board and executive leadership. They have built incident response capabilities. They have navigated compliance requirements. These same capabilities apply to AI risk.

However, the CISO will need additional expertise. Understanding model behavior, recognizing training data poisoning, and evaluating AI-specific threats requires skills that traditional cybersecurity training may not cover. Organizations should invest in upskilling their security teams or bringing in AI security specialists who can work within existing governance structures.

The alternative, creating a separate "Chief AI Officer" with independent reporting lines and separate governance, but risks fragmentation. The CISO manages digital risk. AI is digital risk. The governance should reflect this continuity.

## Practical AI Governance Steps

For organizations beginning their AI governance journey, here are practical steps that leverage existing cybersecurity infrastructure:

1. Inventory AI Systems: Just as you inventory IT assets, you should also inventory AI systems. What models are in production? What data do they use? Who is responsible for their operation? This inventory should live within existing asset management processes, not in a separate silo.

2. Extend Risk Assessment Frameworks: The risk assessment frameworks that evaluate traditional IT systems can evaluate AI systems, but the threat model must expand. Consider adversarial attacks designed to fool models. Consider data leakage through model outputs. Consider supply chain risks in pre-trained models obtained from third parties.

3. Apply Secure Development Practices: The secure software development lifecycle applies to AI systems. Code review. Testing. Staging environments. Rollback capabilities. These practices should govern how AI systems move from development to production.

4. Monitor Model Behavior: Traditional systems are monitored for availability and performance. AI systems need additional monitoring, for output quality, for drift in behavior, for signs of adversarial manipulation. Build these capabilities into existing monitoring infrastructure.

5. Prepare for AI-Specific Incidents: Incident response plans should include AI-specific scenarios. What happens when a model starts generating harmful content? When training data is discovered to be poisoned? When a model's outputs violate regulations? Run tabletop exercises that include these scenarios.

## The Regulatory Context

AI governance is not just about managing risk, it is also becoming a regulatory requirement. The European Union's AI Act, which entered into force in August 2024, establishes risk-based obligations for AI systems. High-risk AI systems, including those used in critical infrastructure, employment, and law enforcement, face stringent requirements for risk management, data governance, and human oversight.

Organizations subject to NIS2, DORA, and sectoral regulations are finding that AI systems fall within scope. The governance structures built for cybersecurity compliance must expand to cover AI compliance.

The key is integration, not duplication. The compliance officer tracking cybersecurity requirements should track AI requirements in the same system. The audit committee reviewing cybersecurity controls should review AI controls using similar frameworks.

## Building a Culture of Responsible AI

Ultimately, governance structures succeed or fail based on organizational culture. The same cultural elements that support strong cybersecurity like commitment from leadership, obsession with prevention, collaboration across departments, willingness to learn from mistakes, also apply to AI.

When boards treat AI governance as a technical matter to be delegated, they create blind spots. When they engage actively, ask probing questions, and hold management accountable, they signal that responsible AI is everyone's responsibility.

The organizations that will thrive in the AI era are not those that deploy the most AI fastest. They are those that deploy AI responsibly, with governance structures that ensure systems behave safely, securely, and ethically.

Those governance structures already exist in well-run organizations. They are called cybersecurity governance. Extend them to cover AI, and you have the foundation for responsible AI deployment.

---

*Published March 25, 2026 | Draws from "The Book on Cybersecurity" (2023) and "Emerging Tech, Emerging Threats" (2024)*