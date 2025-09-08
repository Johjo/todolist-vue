# CLAUDE.md

On travaille dans ce sens.

On lance toujours un test avant de coder quoique ce soit.

On travaille avec une vue qui utilise un controller. Le controller permet de déclencher des actions (il appelle les uses cases).
Le controller met à jour le state.
Pour la vue des composants, on utilise le state via pinia. C'est le state qui met à disposition un view model. 

On utilise massivement l'architecture hexagonale.

Au niveau des tests, on se retrouve avec plusieurs couches : 
On fait un test de composant qui va vérifier que l'on affiche le composant correctement en fonction du state seul.
On fait un test de contrat qui vérifie avec un stub paramétré que le composant appelle le bon controller (le controller est stubbé).
On fait un test de contrat qui vérifie que le controller appelle le bon use case (le use case est stubbé).
On fait des tests unitaires pour les use cases.
On fait des tests d'intégration pour les adapters.

On fait une couche après l'autre.







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