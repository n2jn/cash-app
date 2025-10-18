# @cash-app/app

Shared application code for both mobile (Expo) and web (Next.js) platforms.

## Structure

```
packages/app/
├── features/          # Feature-based modules
│   ├── auth/         # Authentication feature
│   │   ├── screens/  # Shared screens
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   └── profile/      # User profile feature
│       ├── screens/
│       ├── components/
│       ├── hooks/
│       └── index.ts
├── provider/         # Cross-platform providers
│   ├── index.tsx     # Main provider wrapper
│   ├── theme/        # Theme provider
│   ├── navigation/   # Navigation provider
│   └── auth/         # Auth provider
├── components/       # Shared UI components
├── hooks/           # Shared custom hooks
├── utils/           # Shared utilities
├── types/           # Shared TypeScript types
└── index.ts         # Main export
```

## Usage

### In Mobile App (Expo)
```typescript
import { AuthScreen, AppProvider } from '@cash-app/app'
```

### In Web App (Next.js)
```typescript
import { AuthScreen, AppProvider } from '@cash-app/app'
```

## Guidelines

- **Platform-agnostic code**: Write code that works on both React Native and React Native Web
- **Feature-based organization**: Group related code by feature, not by type
- **Providers with wrappers**: Create platform-specific wrappers when needed
- **Alternative libraries**: Use cross-platform libraries or provide platform-specific implementations

## Platform-Specific Code

When you need platform-specific behavior, use file extensions:
- `.web.tsx` - Web-specific implementation
- `.native.tsx` - Mobile-specific implementation
- `.tsx` - Shared implementation (fallback)

Example:
```
components/
├── Button.tsx         # Shared implementation
├── Button.web.tsx    # Web-specific override
└── Button.native.tsx # Mobile-specific override
```
