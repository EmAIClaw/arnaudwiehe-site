# The OWASP Top 10 for Agentic Applications

> "Companies are already exposed to Agentic AI attacks, often without realizing that agents are running in their environments. Effectively protecting a company against Agentic AI requires not only strong security intuition but also a deep understanding of how AI agents fundamentally operate."  
> — Keren Katz, Co-Lead, OWASP Top 10 for Agentic Applications, Senior Group Manager of AI Security at Tenable

In December 2025, the OWASP GenAI Security Project released its inaugural Top 10 for Agentic Applications 2026. It is a globally peer-reviewed framework identifying the most critical security risks facing autonomous AI systems.

This is not just another checklist. It signals a shift in how we need to think about security in an agent-driven world.

Unlike traditional applications, agentic AI systems can plan, act, make decisions, and interact with tools autonomously. That autonomy changes everything. Traditional systems follow predefined paths initiated by humans. Agents define their own paths based on goals, select tools dynamically, maintain memory, and coordinate with other agents.

The result is simple. The potential impact, both positive and negative, expands significantly. As the stakes rise, so does the urgency. Security leaders cannot afford to wait for the first major incident to act.

## Why Agentic AI Requires a New Security Lens

> "Agentic AI introduces a fundamentally new threshold of security challenges, and we are already seeing real incidents emerge across industry. Our response must match the pace of innovation."  
> — John Sotiropoulos, GenAI Security Project Board Member and Head of AI Security at Kainos

The OWASP framework is built on two core design principles.

First, Least Agency. Agents should only have the minimum capabilities required to deliver value. Nothing more.

Second, Strong Observability. You need full visibility into what agents are doing, why they are doing it, and which tools and identities they are using.

Without these two foundations, everything else becomes fragile.

## The Ten Risks Every Leader Should Understand

The OWASP framework outlines ten key risk categories. These are grounded in real-world attack patterns and observed failure modes.

1. **Agent Goal Hijacking**  
Attackers manipulate an agent’s objectives through prompt injection or malicious inputs, redirecting behavior while the system appears to function normally.

2. **Tool Misuse and Exploitation**  
Agents with access to tools such as email, APIs, or financial systems can be steered into harmful or costly actions.

3. **Identity and Privilege Abuse**  
Agents inherit and extend user privileges, creating new pathways for escalation and misuse if not properly separated.

4. **Agentic Supply Chain Vulnerabilities**  
Dependencies such as plugins, MCP servers, and RAG connectors introduce hidden risks across the agent ecosystem.

5. **Unexpected Code Execution**  
Agents that generate and execute code can turn benign requests into full system compromise without proper controls.

6. **Memory and Context Poisoning**  
Persistent memory can be seeded with malicious data, gradually influencing future decisions.

7. **Insecure Inter-Agent Communication**  
As multi-agent systems grow, weak authentication and validation allow spoofing and message manipulation.

8. **Cascading Failures**  
Errors propagate rapidly across interconnected agents, amplifying impact beyond the original fault.

9. **Human-Agent Trust Exploitation**  
Attackers exploit human trust in AI outputs to bypass controls and gain approval for harmful actions.

10. **Rogue Agents**  
Agents drift from intended behavior, acting in ways that resemble insider threats over time.

Even if you are not building agents, you are still exposed.

Organizations already interact with AI-driven traffic, automated systems, and external agents. The question is no longer whether agents will interact with your environment, but how controlled and observable those interactions are.

This raises practical questions for security teams:

- How do you distinguish legitimate agent activity from malicious automation?
- What limits exist on what external agents can do?
- How do you detect when agent behavior has been manipulated?
- What visibility do you have into autonomous decision-making processes?

These are operational questions that need answers today.

## Where to Start

For security leaders, the first steps are clear:

- Inventory where agents already exist in your environment
- Review and restrict tool access and permissions
- Implement logging and observability for agent decisions
- Assess third-party dependencies in your agent ecosystem
- Establish governance policies for agent deployment and use
- Train teams on emerging agentic risks

OWASP has also released supporting resources, including a State of Agentic Security report, a solutions landscape, a practical security guide, and a hands-on reference application for testing.

## Final Thought

Agentic AI is moving from experimentation into production. The real question is not whether your organization will encounter these risks. It is whether you will address them before they become incidents. If AI can act, it can also be exploited.

Supporting resources are available at genai.owasp.org.

## Sources

- OWASP GenAI Security Project: "OWASP Top 10 for Agentic Applications 2026" (December 10, 2025)
- OWASP Press Release: "OWASP GenAI Security Project Releases Top 10 Risks and Mitigations for Agentic AI Security" (December 9, 2025)
- Human Security: "The OWASP Top 10 for Agentic Applications: What It Means for Defenders in the AI Agent Era"
- Security Boulevard: "OWASP Project Publishes List of Top Ten AI Agent Threats" (December 2025)
- Tenable Cybersecurity Snapshot (December 15, 2025)
