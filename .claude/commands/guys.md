---
description: Launch multi-agent team to build a feature across the full stack
---

You are coordinating a team of specialized agents to build a feature across the entire stack (shared UI, Next.js web, and Expo mobile).

## Feature Request

{{input}}

## Your Task

Analyze the feature request and launch the appropriate specialized agents in parallel to implement it. Use the Task tool to launch agents concurrently.

### Available Agents

1. **ui-expert**: Creates cross-platform UI components in `packages/ui` using Gluestack UI
2. **nextjs-expert**: Integrates features into the Next.js web app in `apps/next`
3. **expo-expert**: Integrates features into the Expo mobile app in `apps/mobile`
4. **fullstack-expert**: Handles shared code, business logic, and cross-cutting concerns in `packages/`

### Execution Strategy

1. **Analyze the feature request** to determine which agents are needed
2. **Launch agents in parallel** using a single message with multiple Task tool calls
3. **Provide clear, specific prompts** to each agent:
   - ui-expert: If UI components are needed, describe the design/functionality
   - nextjs-expert: If web integration is needed, specify the route/page/integration
   - expo-expert: If mobile integration is needed, specify the screen/route/integration
   - fullstack-expert: If shared logic/utilities are needed, describe the functionality

4. **Wait for all agents to complete** and then summarize the results

### Example Agent Launch

For a login feature:
- **ui-expert**: Create LoginForm, Input, Button components using Gluestack UI
- **nextjs-expert**: Create /login page in Next.js app using the LoginForm
- **expo-expert**: Create login screen in mobile app using the LoginForm
- **fullstack-expert**: Create authentication utilities and API client

### Important Guidelines

- Launch ALL relevant agents in a SINGLE message with multiple Task tool calls for parallel execution
- Give each agent complete, autonomous instructions
- Don't wait for one agent to finish before launching others (unless there's a true dependency)
- After agents complete, provide a cohesive summary showing how the feature works across platforms

Now analyze the feature request above and launch the appropriate agents in parallel to implement it.
