# 20,225 Instagram Users Potentially Impacted by AI-Assisted Account Recovery Abuse

“AI chatbots create interesting new attack surface, and we’re likely going to see a lot more of these kinds of attacks.” — Ian Goldin, threat researcher at Lumen’s Black Lotus Labs, speaking to Krebs on Security, June 2026

At the end of May 2026, instructions began circulating on Telegram showing how attackers could abuse Meta’s AI-assisted Instagram account recovery process.

The steps were almost embarrassingly simple. Use a VPN to appear near the target’s location. Request a password reset. Chat with Meta’s AI support assistant. Ask it to link the account to a new email address. Receive the reset code. Change the password.

No malware. No phishing emails. No stolen credentials. The attackers simply took advantage of a support process that failed to verify who was making the request. That was all it took.

The Instagram accounts of the Obama White House and the Chief Master Sergeant of the U.S. Space Force were briefly defaced with pro-Iranian images and messages. Other high-profile accounts were reportedly affected too.

Meta later disclosed that 20,225 Instagram users were potentially impacted, although the company said the final number may be lower because some of those accounts may have been accessed by their legitimate owners.

The flaw was in Meta’s High Touch Support system, an AI-assisted account recovery tool for Instagram. According to Meta’s disclosure, the tool failed to properly verify that the email address provided during recovery matched the email address already associated with the account.

If the account did not have two-factor authentication enabled, the attacker could receive a reset link and take control.

Even SMS-based MFA, often treated as the weakest form of multi-factor authentication, appears to have been enough to stop this attack. The attackers reportedly said the method failed against accounts with MFA enabled.

The issue was not some science-fiction version of AI hacking. The system followed the path available to it. It sat inside an identity-critical workflow, and that workflow allowed the wrong person to reach a sensitive action.

AI support agents are moving into IT, HR, customer service, finance, fraud operations, and identity management. They will reset passwords, update account details, trigger workflows, open tickets, approve exceptions, and route sensitive requests.

Once an AI system can take action, the risk changes. It is no longer just about what the model says. It is also about what the surrounding workflow allows it to do.

If an AI agent can trigger account recovery, change an email address, downgrade MFA, issue credentials, export data, update payment details, or make a contractual commitment, the organization has moved into operational control risk.

For these high-risk workflows, good intentions are not enough.

I have heard versions of this many times:

“The agent knows to verify the user.”

“We’ve told it not to do that.”

“We tested it and it behaved correctly.”

None of those are real safeguards.

What matters is what happens when someone reaches a sensitive action. Before an email address can be changed, before a password can be reset, before recovery details can be updated, what actually stops the wrong person from getting through?

Is there a hard identity check? Is MFA required? Does a high-risk change need human approval? Is there an audit trail if something goes wrong?

These are the questions that matter now. Any organization putting AI into real operational workflows should be asking them early, while the design can still be changed.

The Meta incident is useful because it cuts through a lot of the hype around AI. The concerning part was not that the AI did something unusually clever. The concerning part was that it was connected to a sensitive account recovery process without enough safeguards to prevent misuse.

Every AI governance program should classify the following as high-risk agent actions:

- Account recovery and password reset
- Email address or phone number reassignment
- Credential issuance or rotation
- MFA bypass, downgrade, or reset
- Payment instrument changes
- Data export or deletion requests
- Legal, contractual, or financial commitments

For each of these, the key question is simple: what prevents the wrong person from getting from a conversation to a sensitive action?

If the answer is mainly “the agent has been told how to handle it,” the safeguard probably is not strong enough.

Meta fixed this issue. Many enterprises are still at the beginning of wiring AI into support and operations, which means they still have a chance to design the right controls before something similar happens inside their own environment.

AI agents can create real value. They can reduce friction, speed up support, and remove tedious manual steps. But when they are connected to sensitive actions, the workflow needs to prove who is making the request before anything happens.

Sources: Krebs on Security, BleepingComputer, SecurityWeek.
