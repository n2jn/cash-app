---
description: Product Manager creates tickets, then optionally launches dev team to implement
---

You are orchestrating a complete feature development workflow: product planning → approval → implementation.

## Tech Stack Overview

**Mobile**: Expo SDK 54 + React Native 0.81.4 + Expo Router 6 (file-based routing)
**Web**: Next.js 14 + React 18.2.0
**UI Library**: Gluestack UI v1.1.73 + NativeWind v4.2.1 (cross-platform Tailwind)
**Shared Logic**: packages/app (business logic, providers, hooks)

## Feature Request

{{input}}

## Your Task

Follow this workflow:

### Step 1: Product Planning

Launch the **product-manager** agent to analyze the feature request and create structured tickets. The PM should:
- Break down the feature into logical tickets
- Define acceptance criteria for each ticket
- Prioritize the tickets
- Identify dependencies
- Consider mobile (Expo SDK 54), web (Next.js 14), and shared component requirements
- Account for Expo Router 6 file-based routing on mobile
- Leverage Gluestack UI + NativeWind for cross-platform UI consistency

Use the Task tool to launch the product-manager agent with the feature request above.

### Step 2: Review & Approval

After the product-manager creates tickets, present them to the user in a clear, readable format with:
- Ticket titles
- Descriptions
- Acceptance criteria
- Priority levels
- Any dependencies

Then use the AskUserQuestion tool to ask:

**Question**: "Do you want the dev team to implement these tickets?"
**Header**: "Implementation"
**Options**:
- **Yes, implement all tickets**: Launch all agents to implement the full feature
- **Yes, but let me choose**: Show tickets and let user select which ones to implement
- **No, just planning for now**: Stop here, keep the tickets for reference

**multiSelect**: false

### Step 3: Implementation (if approved)

If the user approves implementation:

**Option 1: "Yes, implement all tickets"**
- Launch the multi-agent team (ui-expert, nextjs-expert, expo-expert, fullstack-expert) in parallel
- Give each agent the complete ticket breakdown and their specific responsibilities
- Ensure agents coordinate their work based on the tickets

**Option 2: "Yes, but let me choose"**
- Present each ticket as a separate option
- Let user select which tickets to implement
- Launch agents for only the selected tickets

**Option 3: "No, just planning for now"**
- Thank the user
- Remind them they can use `/guys <ticket description>` later to implement specific tickets

### Step 4: Summary

After implementation (if done), provide a comprehensive summary:
- What was built
- Where the code is located
- How to test it
- Any next steps or dependencies

## Example Flow

```
User: /feature user authentication with social login

1. PM creates tickets:
   - Ticket 1: OAuth integration utilities
   - Ticket 2: Login UI components
   - Ticket 3: Next.js login page
   - Ticket 4: Mobile login screen

2. Ask user: "Implement these tickets?"

3a. If "Yes, all": Launch all agents in parallel
3b. If "Choose": Let user pick tickets 1,2,4
3c. If "No": Stop, save tickets

4. Summary of what was built
```

Now execute this workflow for the feature request above.
