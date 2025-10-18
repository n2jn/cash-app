# Cash App Monorepo

A monorepo containing both mobile (Expo) and web (Next.js) applications for Cash App.

## Project Structure

```
cash-app/
├── apps/
│   ├── mobile/          # Expo React Native app
│   └── next/            # Next.js web app
├── .env.dev             # Development environment variables
├── .env.prod            # Production environment variables
├── .env.test            # Test environment variables
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── .gitignore           # Git ignore rules
├── package.json         # Root package with workspaces
└── tsconfig.json        # Base TypeScript configuration

```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- For mobile development: Expo CLI

### Installation

Install all dependencies for both apps:

```bash
npm install
```

## Development

### Mobile App (Expo)

```bash
# Start development server
npm run dev:mobile

# Run on iOS
npm run ios --workspace=apps/mobile

# Run on Android
npm run android --workspace=apps/mobile

# Run on web
npm run web --workspace=apps/mobile
```

### Web App (Next.js)

```bash
# Start development server
npm run dev:next

# Build for production
npm run build:next

# Start production server
npm run start --workspace=apps/next
```

## Scripts

- `npm run dev:mobile` - Start Expo development server
- `npm run dev:next` - Start Next.js development server
- `npm run build:mobile` - Build Expo app
- `npm run build:next` - Build Next.js app
- `npm run lint` - Lint all code
- `npm run format` - Format code with Prettier

## Environment Variables

Environment variables are managed in the root directory with three files:

- `.env.dev` - Development environment
- `.env.prod` - Production environment
- `.env.test` - Test environment

### Variable Prefixes

- **NEXT_*** - Next.js app variables (use NEXT_PUBLIC_* for client-side)
- **MOBILE_*** - Mobile app variables

## Tech Stack

### Mobile App
- Expo
- React Native
- TypeScript
- Expo Router

### Web App
- Next.js 14
- React 18
- TypeScript

### Shared Tools
- TypeScript
- ESLint
- Prettier

## Code Quality

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Monorepo Management

This project uses npm workspaces to manage the monorepo. Each app in the `apps/` directory is a separate workspace that shares dependencies defined in the root `package.json`.

### Adding Dependencies

```bash
# Add to specific workspace
npm install <package> --workspace=apps/mobile
npm install <package> --workspace=apps/next

# Add to root (shared dev dependencies)
npm install <package> -D
```

## TypeScript

Both apps extend the base TypeScript configuration in `tsconfig.json`. Each app has its own `tsconfig.json` that extends the base configuration with app-specific settings.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` and `npm run format`
4. Commit your changes
5. Create a pull request

## License

[Add your license here]
