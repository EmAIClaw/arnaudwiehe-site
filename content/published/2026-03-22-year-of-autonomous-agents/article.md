AI in 2026: This time feels different

I've been experimenting with autonomous AI agents, specifically OpenClaw (an open-source local agent framework), for the past few weeks. Not reading about it, but actually running it, breaking it, and watching it do unexpected things.

It has changed how I think about AI risk.

For a while, the conversation has focussed on Large Language Models as assistants: copilots, chatbots, tools that respond to prompts. You ask, it answers. Humans stay in the loop. The risk surface is manageable.

Autonomous agents are different.
When I started using OpenClaw locally, connecting it to tools and personal workflows, the productivity upside was immediately obvious. It doesn't just generate responses. It executes tasks, maintains memory, interacts with applications, and keeps working without constant prompting. Full transparency though, it requires significant tinkering to keep running smoothly.

What made the risk concrete for me, was watching it design and build a Mission Control GUI I hadn't fully scoped. It wasn't perfect, but it created what it thought I wanted. In that moment I felt nervous about the power I'd handed it, like credentials, file access, internet access, live APIs...and it was making decisions. I had deliberately constrained its permissions before starting like read-only access to sensitive directories, no outbound calls without explicit approval. That containment gave me some comfort. But it made me ask how many organisations deploying agents have thought this through with the same rigour.

Most are probably still using the copilot playbook.
They're evaluating autonomous agents the way they evaluated AI assistants, as productivity tools with a data privacy angle. GDPR compliance, API security, the usual checklist. 

But none of that addresses the harder problem.

The harder problem is that we are giving AI not just intelligence, but genuine agency like the ability to act, execute, and interact with systems, often with privileges that previously required human sign-off. That changes the security model fundamentally.

Of the risks this introduces, prompt injection is the most underappreciated. Malicious input that manipulates an agent into unintended actions isn't theoretical, it's an active attack surface that most governance frameworks weren't designed to cover. Beyond that, accountability becomes genuinely complex. If an agent makes a bad call mid-workflow, who owns it? How do you intervene quickly enough? How do you govern agent-to-agent interactions when chains of delegation obscure the original intent?

These aren't future-roadmap questions. Enterprises are hitting them right now.
The organisations getting this right are treating autonomous agents less like software and more like a new category of employee with scoped permissions, audit trails, intervention mechanisms, clear lines of accountability. That framing sounds obvious stated plainly. In practice, almost nobody has operationalised it yet and the gap between obvious and implemented is where the real risk lives.

We're genuinely early. 

The tooling is immature, governance frameworks don't fit, and most teams are still in the "let's see what this can do" phase. That's how new paradigms start, but the window to build good habits is now, before agents are embedded in critical workflows and retrofitting governance becomes far more costly.

I'm curious what others are seeing. Are you treating autonomous agents differently from other AI deployments from a security and governance perspective, or are you still running the same playbook?
