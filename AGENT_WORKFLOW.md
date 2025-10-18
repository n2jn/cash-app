# Agent Workflow Guide

This document explains how to use the specialized agents in this project to build features efficiently.

## Agent Team Structure

### 🎯 Product Manager
**Agent**: `product-manager`
- Analyzes requirements
- Creates structured tickets
- Coordinates the team
- Maintains task tracking

### 💎 Fullstack Expert (NEW!)
**Agent**: `fullstack-expert`
- Creates shared UI in `packages/app/`
- Builds cross-platform screens and components
- Handles business logic and providers
- Features work on both mobile AND web

### 📱 Expo Expert
**Agent**: `expo-expert`
- Configures mobile platform (apps/mobile/)
- Integrates shared code from `packages/app/`
- Handles mobile-only features (camera, GPS, etc.)
- Optimizes for iOS and Android

### 🌐 Next.js Expert
**Agent**: `nextjs-expert`
- Configures web platform (apps/next/)
- Integrates shared code from `packages/app/`
- Handles web-only features (SEO, SSR, etc.)
- Optimizes for browsers

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
- Break down into shared, mobile, and web tasks
- Update `tasks.json`

Example response:
```
Created FEATURE-001: User Authentication System

Platform: Both (Mobile + Web)
Tasks created:
- 3 shared tasks → assigned to fullstack-expert
- 2 mobile integration tasks → assigned to expo-expert
- 2 web integration tasks → assigned to nextjs-expert

See: tickets/FEATURE-001.md
```

### 3️⃣ Developers Implement

I'll launch the agents in the right order:

**Step 1: Shared Code (runs first)**
- Launch **fullstack-expert** agent
- Creates screens and components in `packages/app/`
- Builds cross-platform features

**Step 2: Platform Integration (runs after shared code)**
- Launch **expo-expert** agent (parallel)
  - Integrates shared code into `apps/mobile/`
  - Configures Expo settings

- Launch **nextjs-expert** agent (parallel)
  - Integrates shared code into `apps/next/`
  - Configures Next.js settings

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
You: "Add push notifications to the mobile app"

Me:
1. Launch product-manager
   → Creates FEATURE-002.md (Mobile only)

2. Launch expo-expert
   → Configures expo-notifications
   → Implements handlers

3. Report completion
```

### Cross-Platform Feature (Most Common)

```
You: "Build a user profile screen for both apps"

Me:
1. Launch product-manager
   → Creates FEATURE-003.md
   → Breaks into: 2 shared tasks, 1 mobile task, 1 web task

2. Launch fullstack-expert
   → Creates ProfileScreen in packages/app/
   → Creates ProfileProvider
   → Builds cross-platform UI

3. Launch expo-expert + nextjs-expert (parallel)
   → expo-expert: Integrates ProfileScreen in apps/mobile/
   → nextjs-expert: Integrates ProfileScreen in apps/next/
   → Both configure routing

4. Report completion
```

### Complex Feature

```
You: "Build a payment flow with mobile camera scanning and web stripe checkout"

Me:
1. Launch product-manager
   → Creates FEATURE-004.md
   → Shared: Payment UI, validation
   → Mobile: Camera scanning
   → Web: Stripe integration

2. Launch fullstack-expert
   → Creates PaymentScreen (shared UI)
   → Creates payment validation logic

3. Launch expo-expert
   → Integrates PaymentScreen
   → Adds camera scanning feature

4. Launch nextjs-expert
   → Integrates PaymentScreen
   → Adds Stripe checkout

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
│       ├── fullstack-expert.md    # Shared code dev
│       ├── expo-expert.md         # Mobile platform
│       └── nextjs-expert.md       # Web platform
├── packages/
│   └── app/                       # ⭐ SHARED CODE
│       ├── features/              # Feature modules
│       ├── components/            # Shared components
│       ├── provider/              # Providers
│       ├── hooks/                 # Hooks
│       └── types/                 # Types
├── apps/
│   ├── mobile/                    # Expo (integrates shared code)
│   └── next/                      # Next.js (integrates shared code)
├── tickets/
│   ├── README.md                  # Ticket system docs
│   ├── .template.md               # Ticket template
│   └── FEATURE-001.md            # Feature tickets
└── tasks.json                     # Task tracking
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

## Architecture Benefits

### Why This Structure?

**Before (❌ Duplicate Code)**:
```
apps/mobile/screens/LoginScreen.tsx    # React Native version
apps/next/app/login/page.tsx           # Next.js version
// Duplicate code, double maintenance!
```

**After (✅ Shared Code)**:
```
packages/app/features/auth/screens/LoginScreen.tsx  # ONE implementation
apps/mobile/app/(auth)/login.tsx        // Import and use
apps/next/app/(auth)/login/page.tsx     // Import and use
// Write once, use everywhere!
```

### Division of Labor

| Agent | Responsibility | Output |
|-------|---------------|--------|
| **fullstack-expert** | Shared UI & logic | `packages/app/` |
| **expo-expert** | Mobile config | `apps/mobile/` |
| **nextjs-expert** | Web config | `apps/next/` |

## Workflow Summary

1. **You**: Describe feature in natural language
2. **Product Manager**: Creates structured tickets with task breakdown
3. **Fullstack Expert**: Builds shared code (if cross-platform)
4. **Platform Experts**: Integrate and configure (in parallel)
5. **You**: Review, iterate, approve

This gives you a full "virtual team" with zero code duplication! 🚀

## Questions?

Just ask me naturally:
- "Show me all open tickets"
- "What's the status of the login feature?"
- "Use the product-manager to plan a new feature"
- "Have expo-expert implement this ticket"

I'll orchestrate the agents automatically based on your needs!
