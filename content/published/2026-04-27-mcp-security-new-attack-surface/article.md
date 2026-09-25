# MCP Security: A New Attack Surface Emerges

Most organizations are not ready for it

In April 2026, researchers at OX Security published findings that should get every security leader’s attention. They did not break into any systems, they used one. By exploiting the way some MCP-connected tools use the protocol’s STDIO interface to pass commands to underlying subprocesses, they were able to run arbitrary OS commands on production systems belonging to real companies with real paying customers.

The research led to multiple high and critical severity findings and triggered dozens of responsible disclosure processes. When asked about the root cause, the response suggested this was a consequence of how these implementations were designed to work, rather than a traditional software bug.

That last part should give you pause.

⸻

Model Context Protocol (MCP) was supposed to be the USB of AI. A universal standard for connecting agents to tools, databases, and services. In many ways, it delivers on that promise. It gives AI systems a consistent way to retrieve data, trigger workflows, and act across systems. Which is exactly where the problem lies.

The OX research did not reveal any entirely new categories of vulnerabilities, like poor secret management, weak authentication, or command injection. Instead, what MCP integrations do is amplify their impact. Because agents chain actions and operate with delegated permissions, a single vulnerability can propagate across multiple tools and workflows in ways that traditional software simply cannot.

One of the more troubling patterns in the research was how seemingly legitimate tools or inputs could carry hidden instructions. The agent does not see this as malicious. It sees it as context. Agents are designed to follow context, they comply. There is no jailbreak involved. This is just the right input, through the right channel.

⸻

What makes this genuinely difficult to defend against is that these attacks do not look like attacks.

The agent is making valid API calls, accessing approved systems, and following what appear to be legitimate instructions. Most detection mechanisms, built around anomalies, signatures, and known attack patterns, simply do not trigger. You cannot easily firewall context.

Authentication and authorization are also proving to be weak points, particularly in early deployments. Many implementations rely on implicit trust between components, especially in internal environments. That assumption breaks down quickly when agents are dynamically discovering and interacting with tools across systems.

Context leakage is similarly underestimated. When context is shared across sessions or insufficiently scoped, sensitive information can persist longer than intended or bleed between tasks.

⸻

We have seen a version of this before.

Supply chain attacks shifted the focus from securing your own code to securing the dependencies you trust. MCP is becoming a similar dependency layer for AI systems.

Anything that connects everything becomes critical infrastructure, and currently most organizations are not treating it that way.

⸻

The practical starting point is visibility. Most organizations do not have a clear inventory of where and how their agents are interacting with tools. Without that, any risk assessment is guesswork.

From there, the fundamentals apply. Remove implicit trust. Enforce least privilege. Require strong authentication between components. Automatic tool execution with broad permissions may feel like it enables speed. In practice, it creates systemic risk that compounds as agent deployments scale.

The harder shift is organizational. MCP and similar integration layers are not helper components. They are central to how AI systems operate, and therefore central to how they fail. That conversation needs to move beyond the engineering team. Governance frameworks and risk discussions need to include how AI systems interact with tools and data, not just how models behave in isolation.

⸻

The question is no longer what the model can do. It is what it can reach.

In most organizations right now, the honest answer is still: far too much.
