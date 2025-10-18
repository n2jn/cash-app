# Agent Workflow Guide

This document explains how to use the specialized agents in this project to build features efficiently.

## Agent Team Structure

### 🎯 Product Manager
**Agent**: `product-manager`
- Analyzes requirements
- Creates structured tickets
- Breaks down work for developers
- Maintains task tracking

### 📱 Expo Expert
**Agent**: `expo-expert`
- Implements mobile features (apps/mobile/)
- Expert in React Native + Expo
- Handles iOS and Android

### 🌐 Next.js Expert
**Agent**: `nextjs-expert`
- Implements web features (apps/next/)
- Expert in Next.js 14 + React
- Handles SSR, SEO, performance

## How to Use the Agents

### 1️⃣ Request a Feature

Simply describe what you want in natural language:

```
"I need a user authentication system with login and signup"
```

```
"Add a dashboard showing transaction history"
```

```
"Create a settings page for both mobile and web"
```

### 2️⃣ Product Manager Creates Tickets

I'll automatically launch the **product-manager** agent who will:
- Analyze your request
- Create a ticket in `tickets/FEATURE-XXX.md`
- Break down into mobile and web tasks
- Update `tasks.json`

Example response:
```
Created FEATURE-001: User Authentication System

Platform: Both (Mobile + Web)
Tasks created:
- 3 mobile tasks → assigned to expo-expert
- 3 web tasks → assigned to nextjs-expert
- 1 shared task → API contracts

See: tickets/FEATURE-001.md
```

### 3️⃣ Developers Implement

I'll launch the appropriate expert agents in parallel:

**For mobile work:**
- Launch **expo-expert** agent
- Reads ticket and implements in `apps/mobile/`
- Updates task status

**For web work:**
- Launch **nextjs-expert** agent
- Reads ticket and implements in `apps/next/`
- Updates task status

### 4️⃣ Review and Iterate

The agents will:
- Report what was implemented
- List files created/modified
- Note any blockers or next steps
- Update ticket status

You can then:
- Review the code
- Request changes
- Ask for additional features

## Example Workflows

### Simple Feature (Single Platform)

```
You: "Add a dark mode toggle to the mobile app"

Me:
1. Launch product-manager
   → Creates FEATURE-002.md (Mobile only)

2. Launch expo-expert
   → Implements dark mode in apps/mobile/

3. Report completion
```

### Complex Feature (Cross-Platform)

```
You: "Build a payment flow for both apps"

Me:
1. Launch product-manager
   → Creates FEATURE-003.md
   → Breaks into 5 mobile tasks + 5 web tasks

2. Launch expo-expert (parallel)
   → Implements mobile payment UI
   → Integrates payment SDK

3. Launch nextjs-expert (parallel)
   → Implements web payment pages
   → Creates API routes

4. Coordinate shared types and contracts
5. Report completion
```

### Bug Fix

```
You: "The login form doesn't validate email properly on web"

Me:
1. Launch product-manager
   → Creates BUG-001.md
   → Assigns to nextjs-expert

2. Launch nextjs-expert
   → Fixes validation logic
   → Adds tests

3. Report fix
```

## Advanced Usage

### Request Specific Agent

```
"Use the expo-expert to add biometric authentication"
```

### Multiple Features in Sequence

```
"First create a login system, then add social auth, then implement forgot password"
```

I'll orchestrate the agents to work through each feature in order.

### Parallel Work

```
"Build user profiles for mobile and a dashboard for web"
```

I'll run expo-expert and nextjs-expert in parallel on separate features.

## File Structure Reference

```
cash-app/
├── .claude/
│   └── agents/
│       ├── product-manager.md     # PM agent
│       ├── expo-expert.md         # Mobile dev
│       └── nextjs-expert.md       # Web dev
├── tickets/
│   ├── README.md                  # Ticket system docs
│   ├── .template.md               # Ticket template
│   ├── FEATURE-001.md            # Feature tickets
│   └── BUG-001.md                # Bug tickets
├── tasks.json                     # Task tracking
└── apps/
    ├── mobile/                    # Expo app
    └── next/                      # Next.js app
```

## Task Tracking

Check `tasks.json` to see:
- All active tasks
- What's in progress
- What's completed
- Who's assigned to what

```json
{
  "tasks": [
    {
      "id": "FEATURE-001-mobile-1",
      "title": "Create login screen",
      "platform": "mobile",
      "status": "done",
      "assignee": "expo-expert",
      "ticketRef": "FEATURE-001"
    }
  ]
}
```

## Tips for Best Results

### ✅ Do:
- Describe features clearly with business context
- Mention if it's mobile, web, or both
- Ask for iterations and improvements
- Request specific patterns or libraries
- Review tickets before implementation starts

### ❌ Avoid:
- Vague requirements ("make it better")
- Mixing multiple unrelated features in one request
- Skipping the product-manager step for complex features

## Common Commands

```bash
# View all agents
/agents

# Check context usage
/context

# Review tickets
cat tickets/*.md

# Check task status
cat tasks.json
```

## Workflow Summary

1. **You**: Describe feature in natural language
2. **Product Manager**: Creates structured tickets
3. **Developers**: Implement in parallel
4. **You**: Review, iterate, approve

This gives you a full "virtual team" working on your monorepo! 🚀

## Questions?

Just ask me naturally:
- "Show me all open tickets"
- "What's the status of the login feature?"
- "Use the product-manager to plan a new feature"
- "Have expo-expert implement this ticket"

I'll orchestrate the agents automatically based on your needs!
