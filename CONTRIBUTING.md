# Contributing to Generic Form Format

Thank you for your interest in contributing to the Generic Form Format specification!

## Ways to Contribute

1. **Report Issues**: Found a problem or ambiguity in the specification? Open an issue.
2. **Suggest Features**: Have an idea for a new field type or feature? We'd love to hear it.
3. **Improve Documentation**: Help make the documentation clearer and more comprehensive.
4. **Add Examples**: Create example forms that demonstrate specific use cases.
5. **Propose Changes**: Submit pull requests with improvements to the specification.

## Reporting Issues

When reporting issues, please include:

- **Version**: Which version of the specification you're referring to
- **Section**: Which part of the specification (e.g., field type, dependency system)
- **Description**: Clear description of the issue or ambiguity
- **Example**: If applicable, provide a minimal example demonstrating the issue

## Suggesting New Features

For new field types or features:

1. **Use Case**: Describe the real-world use case
2. **Existing Gaps**: Explain why existing field types don't address this need
3. **Proposed Solution**: Describe how the feature should work
4. **Example**: Provide a JSON example of the proposed feature
5. **Backward Compatibility**: Explain impact on existing forms

## Pull Request Process

### For Specification Changes

1. **Discuss First**: Open an issue to discuss major changes before submitting a PR
2. **Update All Docs**: If changing the specification:
   - Update SPECIFICATION.md (human-readable)
   - Update AI_SPECIFICATION.md (AI-optimized)
   - Update JSON Schema (schema/form.schema.json)
   - Update README.md if needed
3. **Add Examples**: Create example forms demonstrating the new feature
4. **Version Consideration**: Indicate whether the change is:
   - Additive (minor version bump, e.g., 1.0 → 1.1)
   - Breaking (major version bump, e.g., 1.0 → 2.0)

### For Documentation Improvements

1. Ensure documentation is clear and concise
2. Use proper Markdown formatting
3. Add examples where helpful
4. Check spelling and grammar

### For Examples

1. Place example in `examples/` directory
2. Use descriptive filename (e.g., `user-registration-form.json`)
3. Validate against the JSON Schema
4. Document the example in `examples/README.md`
5. Include comments in README explaining key features demonstrated

## Style Guidelines

### JSON Files

- Use 2-space indentation
- Use double quotes for strings
- No trailing commas
- Sort object properties logically (id, type, caption, tooltip, params, layout)

### Markdown Files

- Use ATX-style headers (`#` not `===`)
- Use fenced code blocks with language specification
- Use tables for structured data
- Keep lines under 120 characters when possible
- Use relative links for internal references

### Field Type Names

- Use lowercase, single words when possible (e.g., `text`, `number`, `checkbox`)
- Use camelCase for multi-word types (e.g., `dateTime`)
- Be descriptive but concise

### Property Names

- Use camelCase for all property names
- Be descriptive (e.g., `minLength` not `min_len` or `ml`)
- Avoid abbreviations unless widely understood

## Decision Process

1. **Minor Changes**: Documentation fixes, typos, clarifications can be merged quickly
2. **New Features**: Require discussion and consensus
3. **Breaking Changes**: Require strong justification and major version bump

## Code of Conduct

- Be respectful and constructive
- Focus on the specification, not personalities
- Welcome newcomers and help them contribute
- Assume good intentions

## Questions?

If you have questions about contributing, feel free to:

- Open an issue with your question
- Tag it with the `question` label
- Provide context about what you're trying to achieve

## Recognition

Contributors will be acknowledged in:

- Git commit history
- Release notes (for significant contributions)
- Specification acknowledgments section (if created in future versions)

Thank you for helping make Generic Form Format better! 🎉
