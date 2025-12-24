# Generic Form Format - TypeScript Library

This directory contains the TypeScript library for creating Generic Form Format (GFF) definitions programmatically.

## Directory Structure

```
lib/
├── src/               # TypeScript source files
│   ├── fields.ts      # Field creation functions
│   ├── form.ts        # Form management functions
│   ├── helpers.ts     # Helper utilities
│   ├── index.ts       # Main exports
│   ├── types.ts       # TypeScript type definitions
│   └── __tests__/     # Jest tests
└── dist/              # Compiled JavaScript output (generated)
```

## Development

### Building

```bash
npm run build
```

This compiles TypeScript to JavaScript in `lib/dist/`.

### Testing

```bash
npm test           # Run tests once
npm run test:watch # Run tests in watch mode
```

### Source Files

- **types.ts**: Core TypeScript interfaces and types for GFF (Field, FormDefinition, etc.)
- **fields.ts**: Factory functions for creating all 13 field types
- **form.ts**: Functions for form management (create, add/remove fields, merge, etc.)
- **helpers.ts**: Utility functions for conditions, effects, dependencies, and options
- **index.ts**: Main entry point that exports all public APIs

## Usage in Other Projects

When published, import from the package:

```typescript
import {
  createForm,
  addField,
  createTextField,
  toJSON,
} from '@wearehere-labs/generic-form-format';
```

For local development, build first and then use:

```typescript
import { ... } from './lib/dist/index';
```

## Type Safety

The library provides full TypeScript support with:
- Complete type definitions for all GFF structures
- Type-safe field parameter validation
- Immutable operation patterns
- Generic types for extensibility

## Contributing

When adding new features to the library:

1. Update type definitions in `types.ts`
2. Add implementation in appropriate file (`fields.ts`, `form.ts`, etc.)
3. Export new functions in `index.ts`
4. Add tests in `__tests__/`
5. Update main README.md with new API documentation
