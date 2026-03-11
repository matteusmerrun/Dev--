# Contributing to CircuitLang

Thank you for your interest in contributing! We welcome contributions from everyone.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**: `git clone https://github.com/yourusername/circuitlang.git`
3. **Create a branch**: `git checkout -b feature/your-feature`
4. **Make changes** and test them
5. **Push to your fork** and **create a Pull Request**

## Development Setup

```bash
git clone https://github.com/matteusmerrun/circuitlang.git
cd circuitlang
npm install
```

## Running Tests

```bash
npm test
```

## Running Examples

```bash
npm run example:and
npm run example:half-adder
npm run example:simple-cpu
```

## Code Style

- Use consistent indentation (2 spaces)
- Use camelCase for variables and functions
- Use UPPERCASE for constants
- Add comments for complex logic
- Keep functions focused and small

## Adding Features

### Adding a New Gate Type

1. Add the gate to `lexer.js` keywords if needed
2. Implement evaluation in `simulator.js` `evaluateGate()` method
3. Add documentation to `SYNTAX.md`
4. Create an example circuit in `examples/`
5. Add test cases

### Creating an Example Circuit

1. Create a new `.circuit` file in `examples/`
2. Include comments explaining the circuit
3. Add test data at the bottom
4. Update `package.json` scripts
5. Document in README.md

### Reporting Bugs

When reporting bugs, please include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- CircuitLang version
- Example circuit file (if applicable)

## Pull Request Process

1. Update documentation if you add features
2. Test your changes thoroughly
3. Ensure all examples still work
4. Add a clear PR description
5. Reference any related issues

## Commit Messages

Use clear, descriptive commit messages:
```
feat: add support for memory operations
fix: resolve gate resolution issue
docs: update syntax guide
test: add ALU tests
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue to ask questions or discuss ideas!
