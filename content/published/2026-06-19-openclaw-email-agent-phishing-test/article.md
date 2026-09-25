# An OpenClaw Email Agent Failed a Phishing Test. The Lesson Is Bigger Than OpenClaw.

> “All warfare is based on deception.”
> — Sun Tzu

Varonis Threat Labs built an OpenClaw email agent, connected it to Gmail, browser tools, and Google Workspace APIs, then asked it to monitor and process incoming email.

The agent handled some technical warning signs reasonably well. In one test, it identified a suspicious OAuth consent flow and refused to proceed. In another, its strict configuration blocked a fake gift-card phishing page.

But a more ordinary email was enough to fool it. Someone pretending to be “Dan” wrote that production was down and staging credentials were urgently needed. The message came from an external Gmail address, yet the request sounded plausible. The agent searched the mailbox, found AWS IAM keys, database connection strings, and SSH details, then forwarded them in plaintext.

The strict configuration had explicit instructions to verify sender identity before handling sensitive requests, yet it still failed.

There is an obvious CISO response: why were those secrets in email at all? The agent did not create the credential-management failure. It automated the consequence of it.

A second test used a softer pretext. The attacker asked for a customer export to support a quarterly business review (QBR) deck. The agent sent a synthetic export containing 247 customer records, including contact details, contract dates, customer tiers, and roughly $1.28 million in monthly recurring revenue data.

No real customer data was exposed in the Varonis lab. But the workflow was realistic enough to make the point.

This is of course a bigger issue than OpenClaw, Hermes or other AI agents.

The wider issue is that organisations are giving agents inboxes, APIs, files, calendars, CRM data, and the ability to send messages from trusted accounts. That sounds more like a privileged identity with an inbox.

A person can fall for phishing too. But people sometimes bring useful context to a strange request. They may know how a colleague normally writes. They may notice an unusual channel, unfamiliar timing, or a request that does not fit the sender’s role.

An agent can reference past conversations and messages. That does not mean it can reliably determine whether a new request is genuinely coming from the person it claims to be from.

We have already learned that phishing cannot be solved through awareness training alone. Mature security programs use email security, identity controls, conditional access, data-loss prevention, approval workflows, credential vaults, logging, and monitoring.

Email-processing agents need the same discipline. Before an agent gets a mailbox, it needs a threat model:

* What can it read?
* What can it send?
* Which inbound channels and senders are untrusted by default?
* Which actions require independent identity verification?
* Which actions require human approval?
* Which connectors should be unavailable to an email-triggered workflow?
* Can the agent search for secrets, personal data, or commercial data?
* Can it send data externally, especially to a first-time recipient?
* Which enforced control prevents an action when a request conflicts with policy?
* Who owns the agent’s permissions, approval rules, and audit trail?

The most important design decision is to separate low-risk automation from high-consequence action.

An agent may be allowed to classify inbound mail, prepare a draft reply, summarise an attachment, or create a ticket. That does not mean it should be able to search internal repositories, retrieve credentials, export CRM data, or send sensitive information to an external address.

Those actions need technical controls outside the prompt.

Agent phishing also deserves its own category in security discussions. This is different from indirect prompt injection, where malicious instructions are embedded in documents, webpages, or attachments. Here, the attacker is exploiting social trust. They are sending a plausible business request and relying on the agent to act before it verifies who is asking.

The defences overlap, but the key control is different. For prompt injection, the question is often, what content is the agent allowed to interpret as instruction? For agent phishing, the question is, what authority does the sender have, and how is that authority independently verified?

The answer cannot live only in a prompt library. If an email asks for credentials, customer data, or access to internal systems, the agent should hit a control it cannot bypass like a DLP rule that blocks the transfer, an approval workflow that requires a human sign-off, a connector that cannot access secrets, or an outbound policy that prevents sensitive data from being sent to an untrusted recipient. Those protections belong in identity governance, connector design, secrets management, outbound-email controls, approval workflows, and audit logging.

For agents, “pause before you act” has to be enforced by the system.

## Source

[Varonis Threat Labs: Phishing for Lobsters — How We Tricked OpenClaw into Spilling Secrets](https://www.varonis.com/blog/openclaw-phishing).
