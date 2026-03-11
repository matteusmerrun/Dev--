# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-11

### Added
- Initial release of CircuitLang
- Core lexer for tokenization
- Recursive descent parser
- Circuit simulator with 15+ operations
- Support for logic gates: AND, OR, NOT, XOR, NAND, NOR
- Arithmetic operations: ADD, SUB, MUL, DIV, MOD, LSHIFT, RSHIFT, NEGATE
- Module system for reusable components
- ALU (Arithmetic Logic Unit) for CPU designs
- Built-in modules: FullAdder, Multiplexer, SRLatch
- Example circuits: AND gate, OR gate, XOR gate, Half-adder, Multiplexer
- Advanced examples: 4-bit calculator, Simple CPU
- Comprehensive documentation

### Features
- Text-based circuit definition syntax
- Support for comments (single and multi-line)
- Input/output signal declarations
- Test data for simulation
- Gate output references (dot notation)
- JSON output for programmatic use

### Examples
- `examples/and_gate.circuit`: Simple AND gate
- `examples/or_gate.circuit`: Simple OR gate
- `examples/xor_gate.circuit`: Simple XOR gate
- `examples/half_adder.circuit`: Half-adder circuit
- `examples/multiplexer.circuit`: 2-to-1 multiplexer
- `examples/4bit_calculator.circuit`: 4-bit adder
- `examples/simple_cpu.circuit`: Multi-stage CPU with ALU

### Documentation
- README.md: Overview and quick start
- SYNTAX.md: Complete syntax reference
- ARCHITECTURE.md: Design and internals
- API.md: API reference for developers
- CHANGELOG.md: Version history
