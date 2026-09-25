# Your AI Vendor Questionnaire Doesn't Ask the Questions That Matter Anymore

**Arnaud Wiehe | May 1, 2026 | 12 min read**

---

If your organization procures AI-powered tools — and in 2026, that means nearly every organization — there's a document somewhere in your procurement workflow. A vendor assessment questionnaire. It asks about model training data sources. It asks about bias testing methodologies. It probably asks whether the vendor has an AI ethics committee and follows "responsible AI principles."

These are not bad questions. They are simply asking about the wrong risks.

Over the past six weeks, three incidents have demonstrated that the real AI security threat landscape has shifted decisively away from model-level concerns toward ecosystem-level attack surfaces. Extension marketplaces, package registries, CI/CD pipelines, MCP connectors, credential management, and agent memory — none of which appear on standard vendor questionnaires — are where the action is.

If your procurement team is still asking about training data bias while your developers' AI tools are silently pulling compromised packages from unverified registries, you have a process problem that no amount of ethics committee documentation will fix.

## Part 1: The Evidence — Three Incidents, One Pattern

### GlassWorm: Industrialized Extension Marketplace Attacks

In April 2026, the security research team at Socket.dev identified a cluster of 73 "sleeper" extensions on the Open VSX marketplace — the open registry used by Visual Studio Code, Cursor, Windsurf, and other AI-augmented development environments. [Source: Socket.dev, April 25, 2026]

These extensions did not contain malware when first published. They were clones of legitimate tools — a Turkish Language Pack, popular color themes, productivity helpers — published under newly created GitHub accounts. Each account had one or two repositories, one of which was always empty and named with an eight-character string. A clear signature, but not one that automated review processes were catching. [Source: Cyber Security News, April 26, 2026]

The "sleeper" strategy works like this: publish benign code, gather downloads and apparent legitimacy, wait. Then, through the normal extension update mechanism that every IDE automatically checks, push a weaponized update. Developers don't opt in to the malicious version — they get it because their tooling is designed to trust the update channel.

At least six of the 73 extensions had already been activated as of April 25. On April 29, Socket observed a second activation wave: 23 new versions across 22 copycat extensions, pushed in two clusters within a 19-minute window (18:15–19:34 UTC). Seventeen of these versions declared an `extensionPack` dependency on `blockstoks.easily-gitignore-manage` — a malicious puller extension that Socket had disclosed on March 13 and that the Eclipse Foundation had removed from Open VSX on April 27.

The fact that the threat actor pushed activations referencing an extension that had been dead for 52 hours is itself revealing: it means the activation pipeline is automated and doesn't validate puller liveness before publishing. This is industrialized supply chain attack at AI-native speed. [Source: Socket.dev, April 29, 2026 update]

The activation mechanisms used two methods:
- **Native binaries:** `.node` files bundled inside extension code, containing embedded URLs that download malicious `.vsix` files for VS Code and Cursor.
- **Obfuscated JavaScript:** Self-decoding runtime code that retrieves `.vsix` payloads from GitHub releases and installs them through command-line paths.

This attack did not require a zero-day. It exploited trust assumptions built into how developer tooling ecosystems work: that publishers are honest, that updates are safe, and that marketplaces catch bad actors before they reach users.

### elementary-data: CI/CD Pipeline as Attack Surface

On April 24, 2026, at 22:10 UTC, a two-day-old GitHub account named `realtungtungtungsahur` posted a crafted comment on pull request #2147 in the elementary-data repository. The comment contained code designed to exploit a script injection vulnerability in the project's GitHub Actions workflow — specifically, a workflow that interpolated PR comment bodies directly into shell contexts without sanitization. [Source: Snyk, April 27, 2026]

The injected code executed on the project's own CI/CD runner, with access to its `GITHUB_TOKEN` and all workflow secrets. In less than 10 minutes, the attacker had:
- Created three branches and three pull requests as preparation
- Forged a signed release commit
- Triggered the project's `release.yml` workflow via `workflow_dispatch`
- Published elementary-data version 0.23.3 to PyPI at 22:20:47 UTC
- Pushed a compromised Docker image to `ghcr.io/elementary-data/elementary`, tagged as both `0.23.3` and `latest` [Source: StepSecurity, April 25, 2026]

The payload was sophisticated in its simplicity. A single file — `elementary.pth` — containing approximately 245KB of base64-encoded malicious code. Python's `.pth` mechanism automatically executes any line beginning with `import` at interpreter startup, meaning the payload fired on **every Python invocation** in any environment where the package was installed, regardless of whether anyone imported the `elementary` module. [Source: Ars Technica, April 27, 2026]

elementary-data is a dbt-native data observability tool with approximately 280,000 weekly downloads and over 1.1 million monthly downloads on PyPI. It integrates natively with Snowflake, BigQuery, Redshift, Databricks, AWS, GCP, and Azure — making it a high-value target for credential theft. The malware specifically harvested: dbt profiles, warehouse credentials, cloud provider keys, API tokens, SSH keys, and the contents of any `.env` files accessible to the runtime environment. [Source: Elementary Data Official Incident Report, April 27, 2026]

The malicious version was live for approximately 12 hours before being discovered by community member `crisperik`, who reported it in GitHub issue #2205. The Elementary team removed the compromised artifacts and released a clean version 0.23.4 by 11:51 UTC on April 25. [Source: Elementary Data Incident Report timeline]

The severity assigned by Snyk was CVSS 9.3 (Critical). The Snyk advisory explicitly noted the connection to TeamPCP, a threat actor group that has been running this exact GitHub Actions script injection playbook against AI and developer tooling across multiple ecosystems — including Checkmarx, Trivy, and others — since at least February 2026. [Source: Snyk advisory SNYK-PYTHON-ELEMENTARYDATA-16316110; SANS ISC, March 2026]

### Cloudflare, GitGuardian, and OX: The Quantified Crisis

On April 14, 2026, three data points converged that turned anecdotal concern into measured crisis.

**Cloudflare** published a blog post explicitly reframing AI agents as a non-human identity problem. "To secure the Internet in an era of autonomous agents," the post stated, "we have to rethink how we handle identity. Whether a request comes from a human developer or an AI agent, every interaction with an API relies on three core pillars: the Principal (the identity), the Credential (the proof), and the Policy (the permissions)." Cloudflare announced new features for scannable tokens, OAuth visibility, resource-scoped RBAC, and automated token revocation through GitHub's Secret Scanning partnership — treating AI agent credentials with the same rigor as service accounts. [Source: Cloudflare Blog, April 14, 2026]

**GitGuardian's State of Secrets Sprawl Report**, published the same day, provided the quantitative evidence for why this reframing is urgent:

- **28,649,024** new secrets exposed in public GitHub commits in 2025 — a **34% year-over-year increase** and the largest annual jump in the report's history
- Commits co-authored by **Claude Code** leaked secrets at roughly **twice the baseline rate** across public GitHub
- **1.2 million+ AI-service secrets** exposed, growing **81% year-over-year**
- **12 of the top 15** fastest-growing leaked secret types were AI services
- OpenRouter (multi-model API gateway): credential leaks grew more than **48x** year-over-year
- Vector database platforms designed for AI workloads: leak rates jumped nearly **1,000%**
- Voice infrastructure platforms for AI agents: grew nearly **800%**

The root cause, as GitGuardian's Dwayne McDaniel explained, is structural: "When code production speeds up, credential creation speeds up with it. AI-generated code often looks production-ready before it is production-ready, and the gap gets filled with hardcoded API keys. Integration velocity can increase by 10x, but credential governance doesn't scale at the same rate." [Source: Help Net Security, April 14, 2026]

**OX Security** published its MCP vulnerability research on April 15, revealing an architectural design flaw in Anthropic's Model Context Protocol SDK — the industry standard for AI agent-to-tool communication, implemented across Python, TypeScript, Java, and Rust. The findings:

- **150 million+ downloads** and up to **200,000 servers** exposed
- **10 CVEs issued** (and counting)
- Four confirmed exploitation vectors: unauthenticated UI injection, hardening bypasses, zero-click prompt injection to local RCE (in Cursor and Windsurf), and malicious marketplace distribution
- **9 out of 11 MCP registries** successfully poisoned in OX's controlled trial balloon
- Affected platforms included LiteLLM, LangChain, IBM LangFlow, Flowise, GPT Researcher, and others

OX's conclusion was blunt: "This is not a traditional coding error. It is an architectural design decision baked into Anthropic's official MCP SDKs across every supported programming language. Any developer building on the Anthropic MCP foundation unknowingly inherits this exposure." [Source: OX Security, April 15, 2026]

## Part 2: What's Wrong with Current Questionnaires — A Structural Analysis

The problem with most AI vendor assessments isn't that they ask bad questions. It's that they're built on an assumption that the threat model for AI systems is the same as the threat model for traditional software, with "model ethics" bolted on.

Here's what that produces:

### The Standard AI Vendor Assessment (Circa 2024)

| Domain | Typical Questions |
|--------|------------------|
| Training Data | What data was the model trained on? Is it free of PII? How do you address bias? |
| Model Behavior | How do you test for hallucinations? What guardrails prevent harmful outputs? |
| Transparency | Can we inspect model weights? Do you publish model cards? |
| Governance | Do you have an AI ethics board? Do you follow NIST AI RMF / ISO 42001? |
| Privacy | Where is inference data processed? Is it used for further training? |
| Security | Do you have SOC 2? Penetration test reports? |

### What's Missing

Every category above is **model-centric**. The implicit assumption is that if the model itself is safe, the system is safe. This was a reasonable simplification when AI meant "API call to a hosted LLM." It is dangerously wrong when AI means "agent with MCP connectors, marketplace extensions, runtime package resolution, persistent memory, and autonomous credential usage."

The missing categories are all **ecosystem-centric**:

1. **Supply chain integrity** — Not "is your code secure" but "how do you ensure the code your tool fetches at runtime hasn't been swapped?"
2. **Extension/connector governance** — Not "do you have an app store review process" but "what stops a sleeper extension from activating after it's been installed by thousands of developers?"
3. **Credential lifecycle** — Not "do you encrypt secrets at rest" but "can your agent request and receive production credentials without human approval, and if so, what's the blast radius?"
4. **Memory and persistence** — Not "do you log API calls" but "what does the agent remember, can that memory be poisoned, and who can exfiltrate it?"
5. **Kill-switch architecture** — Not "do you have an incident response plan" but "how fast can you revoke a specific extension, connector, or package across all customer instances, and can customers do it themselves?"

The frameworks that procurement teams reference — NIST AI RMF, ISO/IEC 42001, the EU AI Act — are valuable for what they cover. But they were primarily designed before AI agents became mainstream. The NIST AI RMF 1.0 was published in January 2023, before MCP existed, before AI coding agents had meaningful market penetration, and before extension marketplaces for AI tools were a recognized attack vector. Using it as your sole assessment framework in 2026 means you're systematically blind to the fastest-growing category of AI risk.

## Part 3: A Modern AI Vendor Assessment — The Missing Sections

Here is a concrete, immediately usable checklist. It is designed to supplement — not replace — existing model-level governance questionnaires. Add these sections to your vendor assessment process now.

### Section A: MCP Integration Governance

MCP (Model Context Protocol) is the de facto standard for connecting AI agents to external tools — databases, APIs, file systems, SaaS platforms. Most AI tooling vendors either use MCP directly or implement equivalent connector architectures. Every connector is a trust boundary.

**Core Questions:**

1. **Connector Publication:** Who can publish connectors/integrations to your platform? Is there a review process, or is it self-service? If self-service, what prevents a malicious connector from impersonating a legitimate service?

2. **Connector Isolation:** Can a compromised connector access credentials, memory, or execution context belonging to other connectors? Is there per-connector sandboxing, or do all connectors share an execution environment?

3. **Provenance Validation:** Do you cryptographically validate connector origin? If a connector claims to be "Snowflake" or "Jira," how do you know it's actually from that vendor?

4. **Dependency Transparency:** Does installing a connector pull additional dependencies? At install time or runtime? Are those dependencies pinned and verified?

5. **Permission Model:** What permissions does a connector get by default? Can connectors request elevation? Is there a principle of least privilege applied to connector access?

**Red Flags:**
- "Our marketplace is open — anyone can publish"
- "Connectors run in the same context as the agent"
- No cryptographic provenance verification
- Runtime dependency resolution without pinning

### Section B: Extension Marketplace Controls

If your AI vendor offers an extension marketplace (IDE plugins, agent skills, tool integrations), you have the same attack surface that GlassWorm exploited.

**Core Questions:**

1. **Publisher Identity Verification:** How do you verify publisher identity? Can someone create a throwaway GitHub account and publish extensions?

2. **Update Monitoring:** Do you detect anomalous update patterns — mass version pushes, publication bursts from clustered accounts, extensions that were dormant and suddenly activate?

3. **Behavioral Analysis:** Do you scan extension updates for behavioral changes, not just signature-based malware detection? A sleeper extension's first malicious update looks different from its benign predecessors.

4. **Enterprise Controls:** Can enterprise administrators gate extension installation? Approve publishers? Block specific extensions without waiting for a marketplace-level takedown?

5. **Transitive Dependencies:** Do your extensions declare dependencies on other extensions? If so, do you validate the entire dependency chain, or only the directly installed extension?

**Red Flags:**
- No publisher identity verification beyond email
- No behavioral change detection on updates
- No enterprise admin controls over extension installation
- Automatic update acceptance without review of changed behavior

### Section C: Package Provenance

AI tools increasingly resolve and install packages at runtime — Python packages for data processing, npm packages for tool execution, container images for sandboxed environments. The elementary-data incident shows what happens when this chain is compromised.

**Core Questions:**

1. **Provenance Attestations:** Do you generate and verify SLSA provenance attestations for the packages you distribute? Do you verify attestations for dependencies you consume?

2. **Signature Verification:** Do you sign your packages (e.g., Sigstore/cosign for containers, PEP 740 for Python)? Do you verify signatures on dependencies?

3. **Dependency Pinning:** Are all dependencies pinned to specific versions with integrity hashes? Or does your tool resolve "latest" or unpinned version ranges?

4. **Build Pipeline Integrity:** Is your build and release pipeline protected against the script injection and token theft patterns used by TeamPCP? When was your last CI/CD security audit?

5. **Dependency Resolution at Runtime:** Does your tool resolve or install any dependencies at runtime (vs. build time)? If yes, from which registries? Under whose identity? What verification is applied?

6. **Mirroring/Caching:** Do you maintain an internal mirror of dependencies, or do customer deployments pull directly from public registries?

**Red Flags:**
- No SLSA provenance or signature verification
- Unpinned dependencies or "latest" tags in critical paths
- Runtime dependency resolution from public registries
- No CI/CD security audit in the past 12 months

### Section D: Permission Enforcement Architecture

Cloudflare's framing of agents as non-human identities is correct. The question is: how does your vendor implement the Principle (identity), Credential (proof), and Policy (permissions) triad?

**Core Questions:**

1. **Credential Scoping:** Are agent credentials scoped to specific resources, actions, and time windows? Or are they broad API keys that grant access to everything?

2. **Credential Lifecycle:** How are agent credentials created, rotated, and revoked? Is rotation automatic or manual? What is the maximum credential lifetime?

3. **Human-in-the-Loop:** Can the agent request and receive new credentials or permission elevations without human approval? If automated, what is the approval workflow?

4. **Credential Storage:** Where are agent credentials stored? In the agent's memory? In a secrets manager? In configuration files? Are they encrypted at rest and in transit?

5. **Cross-Tenant Isolation:** In multi-tenant deployments, can one customer's agent credentials be accessed by another customer's agent? Is there cryptographic isolation or logical isolation?

6. **Audit Trail:** Is there an auditable log of every credential issuance, usage, and revocation? Can you trace which agent used which credential to access which resource?

**Red Flags:**
- Static API keys that never rotate
- No resource-level scoping (all-or-nothing permissions)
- Agents can self-provision credentials without human approval
- Credentials stored in agent memory without encryption

### Section E: Memory Handling

AI agents with persistent memory represent a category of risk that has no precedent in traditional software procurement. The agent remembers conversations, preferences, decisions, and context — and that memory is both a valuable feature and a potential vulnerability.

**Core Questions:**

1. **Memory Contents:** What does the agent remember? Conversations? Credentials? File contents? API responses? Configuration data? Be specific.

2. **Memory Storage:** Where is memory stored? Locally on the user's machine? In the vendor's cloud? In your cloud tenant? Is it encrypted?

3. **Memory Access Control:** Who can access the agent's memory? The user? The vendor? Other agents? Administrators? Is there a role-based access model?

4. **Memory Poisoning:** Can a malicious interaction — a crafted prompt, a compromised document, a manipulated API response — inject false information that persists in the agent's memory and influences future behavior?

5. **Memory Export/Deletion:** Can users export their agent's memory? Can they delete specific memories or purge all memory? Does deletion actually remove the data from backups?

6. **Cross-Session Persistence:** How long does memory persist? Per session only? Until explicitly cleared? Indefinitely?

**Red Flags:**
- "The agent remembers everything — that's the point"
- No ability to inspect or delete agent memory
- Memory accessible to vendor personnel without customer approval
- No isolation between memory from different users or contexts

### Section F: Kill-Switch Design

When — not if — a compromise is discovered, the speed of response determines the size of the breach. Your vendor's ability to surgically disable compromised components without taking down your entire AI capability is a security feature, not an operational inconvenience.

**Core Questions:**

1. **Component-Level Revocation:** Can you revoke a specific extension, connector, integration, or model without affecting other components? Or is it all-or-nothing?

2. **Customer-Controlled Kill Switches:** Can your security team block specific components without waiting for the vendor? Is there an admin API or dashboard for this?

3. **Time-to-Revoke:** What is your measured time from compromise discovery to revocation across all customer instances? Have you tested this? What's the SLA?

4. **Offline Revocation:** If a customer's environment is air-gapped or the vendor's revocation infrastructure is unavailable, can the customer still block compromised components locally?

5. **Communication Protocol:** What is your process for notifying customers of active compromises? How quickly after discovery do customers learn about it? What information do you provide?

6. **Rollback Capability:** Can customers roll back to a known-good state? Are previous versions of extensions, connectors, and packages available and verified?

**Red Flags:**
- "We handle security — you don't need to worry about it"
- No customer-facing controls for component blocking
- No published incident response SLA
- No rollback capability for extensions or connectors

## Part 4: Implementation Guidance

Adding these sections to your vendor assessment isn't a paperwork exercise. Here's how to make it operational:

### Step 1: Triage Your Existing Vendors
You already have AI vendors under contract. Don't wait for renewal. Send the six sections above to your top five AI vendors (by risk, not by spend) and ask for written responses within 30 days. Their inability to answer is as informative as a bad answer.

### Step 2: Weight the Findings
Not all gaps are equal. A vendor with weak extension marketplace controls (Section B) but strong credential management (Section D) might be acceptable if you disable their marketplace and manage extensions manually. A vendor with no package provenance (Section C) and runtime dependency resolution from public registries is a high-priority risk regardless of other scores.

### Step 3: Build the Questions into Your RFP Template
Make these sections standard in your procurement workflow. If Legal and Procurement push back ("this isn't in our standard template"), point them to the elementary-data incident, the GlassWorm campaign, and the GitGuardian data. The evidence exists. Use it.

### Step 4: Test, Don't Just Ask
Self-reported answers are necessary but insufficient. For critical vendors:
- Ask for their most recent CI/CD security audit report
- Request a demonstration of their kill-switch in action (in a test environment)
- Verify extension marketplace controls by attempting to publish a test extension under a new account
- Check whether their packages are actually signed and whether their dependencies are pinned by inspecting real artifacts

### Step 5: Align with Your Existing Frameworks
If your organization uses NIST AI RMF, ISO 42001, or the EU AI Act as governance frameworks, note that none of these directly addresses the supply chain categories above. That doesn't mean the frameworks are useless — it means you need to supplement them. Add these sections as an appendix to your AI RMF profile. Map the checklist items to existing controls where possible, and create new controls where gaps exist.

## The Strategic Argument

Here's the uncomfortable truth: asking only model-level questions of AI vendors isn't just incomplete. It's actively misleading.

It creates the appearance of due diligence while leaving the actual attack surface unexamined. It produces vendor assessment reports that say "low risk" because the model training data is clean, while the vendor's extension marketplace is being actively exploited by GlassWorm. It lets organizations report to their boards that "all AI vendors have passed our security review" when the review didn't cover the mechanisms that attackers are actually targeting.

This is not a hypothetical concern. The three incidents described above are not edge cases. They are the leading edge of an attack pattern that is growing faster than governance frameworks are adapting.

The organizations that will get this right are the ones that stop treating AI procurement as a model ethics exercise and start treating it rigorously as a supply chain security problem — because that is what AI tooling has become. AI tools are software supply chains with an LLM at the center. The model's safety properties are only as strong as the weakest link in the ecosystem that surrounds it.

Secure the supply chain, or the model's guarantees are meaningless.

---

**Arnaud Wiehe** is a cybersecurity and AI governance leader, author of *Emerging Tech, Emerging Threats* and *The Book on Cybersecurity*, and a speaker on the intersection of AI risk, supply chain security, and enterprise governance.

*For more analysis at the intersection of AI governance and cybersecurity, subscribe at [arnaudwiehe.com].*
