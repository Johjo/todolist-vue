# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Practice of TDD. Run test and only do what test results says

## Development Commands

```bash
# Development server with hot reload
npm run dev

# Build for production (includes type checking)
npm run build

# Type checking only
npm run type-check

# Linting and auto-fix
npm run lint

# Code formatting
npm run format

# Unit tests with Vitest
npm run test:unit

# E2E tests with Cypress (development)
npm run test:e2e:dev

# E2E tests with Cypress (production build)
npm run build && npm run test:e2e
```

## Project Architecture

This is a Vue 3 TypeScript application using the Composition API with the following stack:

- **Frontend Framework**: Vue 3 with TypeScript and Composition API
- **Build Tool**: Vite (using Rolldown variant for faster builds)
- **State Management**: Pinia stores
- **Routing**: Vue Router 4
- **Testing**: Vitest for unit tests, Cypress for E2E testing
- **Linting**: ESLint with Vue/TypeScript configurations
- **Formatting**: Prettier

### Directory Structure

```
src/
├── main.ts           # Application entry point
├── App.vue           # Root component
├── router/           # Vue Router configuration
├── stores/           # Pinia store definitions
└── __tests__/        # Unit test files
```

### Key Configurations

- **Path Alias**: `@` is configured to point to `src/` directory in `vite.config.ts:17`
- **TypeScript**: Configured with strict settings and Vue support
- **ESLint**: Uses flat config with Vue, TypeScript, Vitest, and Cypress rules
- **Testing**: Vitest runs in jsdom environment for component testing

### Development Notes

- Uses Pinia stores with Composition API syntax (setup stores)
- Router is configured but currently has no routes defined
- Vue DevTools integration is enabled for development
- Node.js version requirement: ^20.19.0 || >=22.12.0