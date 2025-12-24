# AI Agent Standards

**Before completing ANY task, these checks MUST pass:**

```bash
npm run build          # Zero TypeScript errors
npm test               # All tests passing
npm run test:coverage  # 100% lines/statements, ≥96% branches, ≥98% functions
```

## Non-Negotiable Rules

1. **Never reduce** coverage thresholds in `jest.config.js`
2. **Never commit** code with TypeScript errors
3. **Never skip** writing tests for new code
4. **Always use** error handler system (`throwFormCreationError`, `throwDuplicateFieldError`)
5. **Always maintain** immutability (spread operators, no mutations)

## Current Metrics

- **Tests:** 151 passing
- **Coverage:** 100% lines, 100% statements, 96.93% branches, 98.52% functions
- **TypeScript:** Zero errors

**These metrics must be maintained or improved, never decreased.**

## Quick Reference

```bash
npm run build          # Compile TypeScript
npm test               # Run all tests
npm run test:coverage  # Generate coverage report
npm run test:watch     # Development mode
```

**See [AI_GUIDE.md](AI_GUIDE.md) for complete API reference and usage examples.**

