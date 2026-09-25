# The Rise of OpenClaw: The AI That Actually Does Stuff

**Status:** Published  
**Created:** 2026-03-16  
**Updated:** 2026-03-16  
**Topic:** OpenClaw, AI agents, Personal AI  
**Agent:** Human  
**Published URL:** [LinkedIn Post](https://linkedin.com) *(Update with actual URL)*

---

## Full Article

By now, you may have heard the name. If not, let me catch you up.

OpenClaw is a free, open-source autonomous AI agent created by Austrian developer Peter Steinberger. Unlike chatbots that simply respond to queries, OpenClaw executes real-world tasks like researching topics, developing code, reading emails, managing calendars, running terminal commands, and maintaining memory across sessions. It runs as a local service on your own machine, or cloud based virtual machine, and connects to the chat apps you already use, like WhatsApp, Telegram, Slack, Discord, and more.

Think of it as an always on personal AI chief of staff. One that actually remembers you and works for you.

Most AI assistants forget you the moment you close the tab.

Mine doesn't.

I've been running my own personal AI agent, powered by OpenClaw, operating autonomously via scheduled "heartbeats" and delivering a morning briefing on what it did while I slept. It knows:

- Who I am
- What I care about
- What I'm working on
- What happened yesterday

Not because I told it again. Because it remembers.

Here's what that looks like in practice:

**It reads my files, not just my prompts.** My projects, priorities, and preferences live in a structured workspace. The agent reads them at startup. No re-explaining who I am every session.

**It takes initiative, within limits I define.** Morning intelligence briefs. Calendar reminders. Proactive research on AI governance, cybersecurity, and emerging tech. It doesn't wait to be asked.

**It runs on my machine.** No third-party cloud storing my notes, emails, or private context. I built a dedicated, air-gapped laptop on a separate network — unique usernames, emails, and passwords, isolated from my daily systems. Local-first by design.

**It gets smarter over time.** Every session adds to persistent memory files. The agent distills what matters and updates its long-term knowledge base. No starting from scratch.

This isn't the future. I'm using it today.

Now for the honest part: The cons.

I strongly recommend exploring OpenClaw, but I'll be direct: most people won't run it successfully. Here's why:

**Cost.** You need your own LLM API keys (Claude, GPT, DeepSeek). Those API calls accumulate. The software itself is free, but you bring your own API keys, and usage costs add up for always-on agents. You can run free open source LLMS (Qwen, Kimi-K2, Deepseek) but they require significant, expensive hardware resources to run.

**Complexity.** Installation requires setting it up on a server or local device and connecting it to a language model a process that can be challenging for less technical users.

**Security exposure.** This is the big one, and it deserves its own article, which I'm writing next. For now, know that Openclaw is inherently insecure because it can access email accounts, calendars, messaging platforms, and system-level commands, it exposes users to real security vulnerabilities. Prompt injection attacks, where malicious instructions are embedded in emails, documents, or web pages the agent processes can cause it to execute unintended actions.

In OpenClaw, Skills are modular add-ons installable from ClawHub, the public skill marketplace, which dramatically expand what your agent can do, but they represent a serious attack surface. Security researchers have identified hundreds of malicious skills in the registry, with some estimates placing the infection rate at around 20% of all published skills. ClawHub now displays a security scan for each skill, combining a VirusTotal verdict with OpenClaw's own confidence indicator. But even a "Benign / High Confidence" result is no guarantee, and you should treat any third-party skill as untrusted code until you've reviewed it yourself.

My mitigation: a dedicated standalone laptop, a fully separated network, isolated accounts, and strict controls over what the agent can and cannot touch. This isn't plug-and-play. It's a deliberate security architecture.

I'll be publishing a detailed breakdown of how I secured my OpenClaw setup in my next article.

**What comes next: The competitive landscape**

OpenClaw's rise has not gone unnoticed by the major players.

In February 2026, creator Peter Steinberger announced he would be joining OpenAI, with the project moving to an independent open-source foundation sponsored and supported by OpenAI. The model is MIT licensed, free to use, modify, and build on commercially. Interestingly, OpenClaw went through two prior name changes. It was originally called Clawdbot, then Moltbot. The first after Anthropic threatened legal action over the name's similarity to Claude, and the second because Steinberger simply preferred the new name.

Meanwhile, Nvidia is making its move. Nvidia is planning to launch an open-source enterprise-focused AI agent platform called NemoClaw, and has reportedly begun pitching it to companies including Salesforce, Cisco, Google, Adobe, and CrowdStrike.

Nvidia CEO Jensen Huang has called OpenClaw "single most important release of software probably ever" Whether or not that holds, the agentic AI era is no longer theoretical.

The gap between "AI I chat with" and "AI that actually knows me and acts on my behalf" is smaller than most people think and it's closing fast.

Have you tried building a persistent AI agent? What's your setup, and how are you thinking about the security tradeoffs?

---

## Hashtags

#AI #ArtificialIntelligence #OpenClaw #PersonalAI #AIAgents #Cybersecurity #AIGovernance #EmergingTech #Productivity #AITools

## Performance Metrics

- **Published:** 2026-03-16
- **Platform:** LinkedIn
- **Engagement:** *(To be updated)*
- **Follow-up post:** ClawBot Security Checklist (in progress)

## Related Content

- Next: ClawBot Security Checklist (draft in progress)
- Series: OpenClaw Deep Dive
