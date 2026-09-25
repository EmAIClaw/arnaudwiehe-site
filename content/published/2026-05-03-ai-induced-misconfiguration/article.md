
Most executives still picture AI risk in two buckets.

Either the model says something wrong, or an attacker uses AI to do something malicious.

Both matter. Neither is the category leaders are underestimating most right now.

The more immediate operational risk is AI-induced misconfiguration: what happens when organizations give AI agents, copilots, orchestration layers, or AI deployment toolkits real permissions, broad connectivity, and weak guardrails, then assume the defaults are safe enough.

No dramatic breach is required. No novel malware is required. Sometimes the system is simply mis-scoped, over-privileged, or wired together in a way that turns ordinary mistakes into material exposure.

This risk is not theoretical anymore. In the span of nine days, between March 31 and April 8, 2026, Palo Alto Networks Unit 42 published three separate research reports that collectively paint a clear picture of where AI risk is heading — and it's not where most board decks are looking.

## Agent God Mode

On April 8, Unit 42 published research on Amazon Bedrock AgentCore under the title "Cracks in the Bedrock: Agent God Mode." The finding was not that Bedrock had been magically broken. It was something more mundane and more revealing: the AgentCore starter toolkit's default deployment logic created IAM roles with permissions broad enough to span the entire AWS account, rather than being tightly scoped to individual resources.

A compromised agent could exploit that excessive access through a concrete kill chain: pull any ECR image in the account, extract another agent's MemoryID from static container configuration, then dump or poison that agent's conversation history. The researchers called it "Agent God Mode" because the overly broad IAM permissions effectively granted an individual agent the omniscient ability to escalate privileges and compromise every other AgentCore agent in the same AWS account.

The failure was not "AI is risky." The failure was a deployment model that favored convenience over least privilege.

AWS subsequently updated its documentation to include a security warning that the default roles are "designed for development and testing purposes" and not recommended for production. That's the right response from a responsible vendor. It also confirms the pattern: the platform will not enforce least privilege by default. The governance burden falls on the deployer.

## Double Agents

A week earlier, on March 31, Unit 42 published separate research on Google Cloud Vertex AI Agent Engine under the title "Double Agents: Exposing Security Blind Spots in GCP Vertex AI." The researchers warned that a misconfigured or compromised agent could become a "double agent" — one that appears to perform its intended role while secretly exfiltrating sensitive data, compromising infrastructure, and creating backdoors into an organization's most critical systems.

The specific attack path was striking. Researchers deployed a malicious agent that extracted the Per-Project, Per-Product Service Account (P4SA) credentials from Google's metadata service, then used those credentials to gain unrestricted read access to all GCS buckets within the consumer project. More significantly, the P4SA credentials also granted access to restricted Google Artifact Registry repositories including `cloud-aiplatform-private/reasoning-engine` and `cloud-aiplatform-private/llm-extension/reasoning-engine-py310:prod` — repositories that are part of Google's own infrastructure.

Within tenant project GCS buckets, researchers found `Dockerfile.zip`, `code.pkl`, and `requirements.txt`. The Dockerfile contained hardcoded references to Google's internal `reasoning-engine-restricted` bucket. The `code.pkl` file, a Python pickle serialization artifact, represents a supply-chain risk in itself: pickle is well-documented as unsafe for deserialization from untrusted sources.

Google's response mirrored AWS's: revised documentation that explicitly explains how Vertex AI uses resources, accounts, and agents, with a recommendation to use Bring Your Own Service Account (BYOSA) as the mitigation. Again, the platform-level fix was not a code change. It was documentation. The governance responsibility remains with the deployer.

## Multi-Agent Attack Chains

A third report, published April 3 by Unit 42 researchers Jay Chen and Royce Lu, examined multi-agent applications in Amazon Bedrock. The team demonstrated a four-stage attack methodology: determining the application's agent collaboration framework, discovering collaborator agents, enumerating their exposed instructions and tool schemas, and invoking tools with attacker-supplied inputs.

The critical detail was this: Bedrock's built-in prompt attack guardrail stopped these attacks when enabled. The difference between a resilient AI deployment and a fragile one was as mundane as whether a guardrail switch was turned on.

That is the definition of AI-induced misconfiguration. The risk comes not only from the model. It comes from the surrounding configuration decisions: how permissions are scoped, how tools are exposed, how agents are allowed to call one another, how secrets are stored, how guardrails are enabled, and how much autonomy is granted before auditability exists.

## What's Old, What's New

In traditional security language, this sounds familiar. Least privilege, segmentation, secure defaults, change control, logging, and kill switches are not new concepts.

What is new is the speed and opacity with which AI systems can turn bad configuration into real impact. A misconfigured SaaS integration might leak data slowly. A misconfigured AI agent can act on that access at machine speed, across multiple systems, while appearing to perform legitimate work.

What is also new is the degree to which major platform defaults accelerate the problem. When AWS AgentCore's starter toolkit creates account-wide IAM roles by default, and when Google Vertex AI grants P4SA credentials with broad access by default, the platforms themselves are shaping deployment behavior in ways that work against secure practices.

## Five Questions for Leaders

This is a governance problem, not just a technical one. It means many organizations are measuring the wrong things. They ask whether the model is accurate, whether users like the assistant, and whether a red team can jailbreak a prompt. Those are reasonable questions. But they miss the infrastructure question: what can this system do if it is wrong, manipulated, or simply over-trusted?

A few practical questions help reframe the conversation.

**First, does this AI system have permissions that a human employee would never receive by default?** If the answer is yes, you may already have an AI-induced misconfiguration problem. No employee gets account-wide IAM access on day one. Why would an agent?

**Second, does your deployment tooling create broad permissions for speed and ease of setup?** Unit 42's Bedrock AgentCore research shows that convenience-first defaults create exactly that failure mode. Any tool that auto-generates IAM roles should be reviewed before production use.

**Third, are prompt-attack protections, tool restrictions, and approval checkpoints enabled by default, enforced centrally, and tested regularly?** Unit 42's April 3 Bedrock research is a useful reminder that a guardrail that exists but is not enabled is not a control. It is a checkbox that didn't fire.

**Fourth, can your logs clearly reconstruct what an agent saw, decided, and executed?** If not, you may not be able to distinguish error from abuse after the fact. This is particularly important for multi-agent systems, where the attack surface includes inter-agent communication.

**Fifth, does AI governance in your organization still live mostly in policy documents and ethics language, while deployment decisions are made in product teams and cloud consoles?** If so, the control gap is already open.

## Governance Is Becoming Operational

The executive takeaway is straightforward. The near-term AI risk is not only that models will produce bad content or help bad actors. The near-term risk is that organizations will deploy AI-enabled systems with unsafe permissions, weak defaults, and incomplete controls — then discover too late that the real exposure came from configuration, not cognition.

Leaders who understand this now can get ahead of it. Review agent permissions. Enforce least privilege. Turn on guardrails. Require approval boundaries for sensitive actions. Log every tool call. Test multi-agent flows as attack surfaces, not just productivity features. Treat AI deployment templates the way you treat any other security-sensitive infrastructure-as-code artifact.

Because the next serious AI incident in your environment may not look like a model failure at all. It may look like a perfectly authorized system doing exactly what its configuration allowed.

---

