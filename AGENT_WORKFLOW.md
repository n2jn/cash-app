# Agent Workflow Guide

This document explains how to use the specialized agents in this project to build features efficiently.

## Agent Team Structure

### 🎯 Product Manager
**Agent**: `product-manager`
- Analyzes requirements
- Creates structured tickets
- Coordinates the team
- Maintains task tracking

### 🎨 UI Expert (NEW!)
**Agent**: `ui-expert`
- Builds design system in `packages/ui/`
- Creates reusable UI components (atoms, molecules, organisms)
- Manages Storybook for component documentation
- Ensures cross-platform compatibility

### 💎 Fullstack Expert
**Agent**: `fullstack-expert`
- Creates feature screens in `packages/app/`
- Uses UI components from `@cash-app/ui`
- Handles business logic and providers
- Features work on both mobile AND web

### 📱 Expo Expert
**Agent**: `expo-expert`
- Configures mobile platform (apps/mobile/)
- Integrates shared features
- Handles mobile-only features (camera, GPS, etc.)
- Optimizes for iOS and Android

### 🌐 Next.js Expert
**Agent**: `nextjs-expert`
- Configures web platform (apps/next/)
- Integrates shared features
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
- Break down into UI, feature, and platform tasks
- Update `tasks.json`

Example response:
```
Created FEATURE-001: User Authentication System

Tasks created:
- 3 UI component tasks → assigned to ui-expert
- 2 feature tasks → assigned to fullstack-expert
- 2 mobile integration tasks → assigned to expo-expert
- 2 web integration tasks → assigned to nextjs-expert

See: tickets/FEATURE-001.md
```

### 3️⃣ Developers Implement

I'll launch the agents in the right order:

**Step 1: UI Components (runs first)**
- Launch **ui-expert** agent
- Creates reusable components in `packages/ui/`
- Adds Storybook stories
- Follows Atomic Design (atoms → molecules → organisms)

**Step 2: Feature Screens (runs second)**
- Launch **fullstack-expert** agent
- Creates feature screens in `packages/app/`
- Uses UI components from `@cash-app/ui`
- Builds cross-platform features

**Step 3: Platform Integration (runs third)**
- Launch **expo-expert** + **nextjs-expert** (parallel)
  - Expo: Integrates features into `apps/mobile/`
  - Next.js: Integrates features into `apps/next/`
  - Both configure platform-specific settings

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
   → Breaks into: 2 UI tasks, 2 feature tasks, 2 platform tasks

2. Launch ui-expert
   → Creates Avatar atom in packages/ui/
   → Creates ProfileCard molecule in packages/ui/
   → Adds Storybook stories

3. Launch fullstack-expert
   → Creates ProfileScreen in packages/app/
   → Uses Avatar and ProfileCard from @cash-app/ui
   → Creates ProfileProvider

4. Launch expo-expert + nextjs-expert (parallel)
   → expo-expert: Integrates ProfileScreen in apps/mobile/
   → nextjs-expert: Integrates ProfileScreen in apps/next/
   → Both configure routing

5. Report completion
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
│       ├── ui-expert.md           # UI component library
│       ├── fullstack-expert.md    # Feature screens
│       ├── expo-expert.md         # Mobile platform
│       └── nextjs-expert.md       # Web platform
├── packages/
│   ├── ui/                        # ⭐ UI LIBRARY (Atomic Design)
│   │   ├── atoms/                 # Basic components
│   │   ├── molecules/             # Simple combinations
│   │   ├── organisms/             # Complex components
│   │   ├── templates/             # Page layouts
│   │   └── utils/theme.ts         # Design tokens
│   └── app/                       # ⭐ FEATURE CODE
│       ├── features/              # Feature modules
│       ├── provider/              # Providers
│       ├── hooks/                 # Hooks
│       └── types/                 # Types
├── apps/
│   ├── mobile/                    # Expo (integrates features)
│   ├── next/                      # Next.js (integrates features)
│   ├── storybook/                 # Web component docs
│   └── storybook-rn/              # Mobile component docs
├── tickets/                       # Feature tickets
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
| **ui-expert** | Reusable UI components | `packages/ui/` |
| **fullstack-expert** | Feature screens & logic | `packages/app/` |
| **expo-expert** | Mobile config | `apps/mobile/` |
| **nextjs-expert** | Web config | `apps/next/` |

### Component Flow

```
ui-expert creates Button in packages/ui/
        ↓
fullstack-expert uses Button in LoginScreen (packages/app/)
        ↓
expo-expert integrates LoginScreen (apps/mobile/)
nextjs-expert integrates LoginScreen (apps/next/)
```

## Workflow Summary

1. **You**: Describe feature in natural language
2. **Product Manager**: Creates tickets with UI, feature, and platform tasks
3. **UI Expert**: Builds reusable components (if needed)
4. **Fullstack Expert**: Builds feature using UI components
5. **Platform Experts**: Integrate and configure (in parallel)
6. **You**: Review, iterate, approve

This gives you a full "virtual team" with:
- ✅ Reusable design system
- ✅ Zero UI duplication
- ✅ Documented components (Storybook)
- ✅ Cross-platform features

## Questions?

Just ask me naturally:
- "Show me all open tickets"
- "What's the status of the login feature?"
- "Use the product-manager to plan a new feature"
- "Have expo-expert implement this ticket"

I'll orchestrate the agents automatically based on your needs!
