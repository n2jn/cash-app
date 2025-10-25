---
description: Launch multi-agent team to build a feature across the full stack
---

You are coordinating a team of specialized agents to build a feature across the entire stack (shared UI, Next.js web, and Expo mobile).

## Tech Stack Overview

**Mobile**: Expo SDK 54 + React Native 0.81.4 + Expo Router 6 (file-based routing)
**Web**: Next.js 14 + React 18.2.0
**UI Library**: Gluestack UI v1.1.73 + NativeWind v4.2.1 (cross-platform Tailwind)
**Shared Logic**: packages/app (business logic, providers, hooks)
**React Version**: React 19.1.1 (mobile), React 18.3.1 (web root), React 18.2.0 (Next.js)

## Feature Request

{{input}}

## Your Task

Analyze the feature request and launch the appropriate specialized agents in parallel to implement it. Use the Task tool to launch agents concurrently.

### Available Agents

1. **ui-expert**: Creates cross-platform UI components in `packages/ui` using Gluestack UI + NativeWind
2. **nextjs-expert**: Integrates features into the Next.js 14 web app in `apps/next`
3. **expo-expert**: Integrates features into the Expo SDK 54 mobile app in `apps/mobile` with Expo Router 6
4. **fullstack-expert**: Handles shared code, business logic, and cross-cutting concerns in `packages/app`
5. **backend-expert**: Builds APIs, server-side logic, database schemas, and authentication/authorization

### Execution Strategy

1. **Analyze the feature request** to determine which agents are needed
2. **Launch agents in parallel** using a single message with multiple Task tool calls
3. **Provide clear, specific prompts** to each agent:
   - ui-expert: If UI components are needed, describe the design/functionality
   - nextjs-expert: If web integration is needed, specify the route/page/integration
   - expo-expert: If mobile integration is needed, specify the screen/route/integration
   - fullstack-expert: If shared logic/utilities are needed, describe the functionality
   - backend-expert: If APIs/database/authentication are needed, specify the endpoints and data requirements

4. **Wait for all agents to complete** and then summarize the results

### Example Agent Launch

For a login feature:
- **backend-expert**: Create authentication API endpoints (POST /api/auth/login, POST /api/auth/register), JWT token generation, password hashing
- **ui-expert**: Create LoginForm, Input, Button components using Gluestack UI + NativeWind
- **fullstack-expert**: Create authentication utilities, providers, and API client in packages/app
- **nextjs-expert**: Create /login page in Next.js 14 app using the LoginForm
- **expo-expert**: Create login screen in Expo mobile app using Expo Router 6 file-based routing

### Mobile Development Notes

When launching expo-expert for mobile features:
- Uses Expo Router 6 with file-based routing in `apps/mobile/app/`
- Screens are created as route files (e.g., `app/login.tsx`, `app/(tabs)/home.tsx`)
- Navigation is handled automatically by Expo Router
- Supports native features: camera, GPS, notifications, etc.

### Important Guidelines

- Launch ALL relevant agents in a SINGLE message with multiple Task tool calls for parallel execution
- Give each agent complete, autonomous instructions
- Don't wait for one agent to finish before launching others (unless there's a true dependency)
- After agents complete, provide a cohesive summary showing how the feature works across platforms

Now analyze the feature request above and launch the appropriate agents in parallel to implement it.
