# Architecture Guide

## Overview

CircuitLang is a text-based hardware description language designed for simulating and designing digital circuits, from simple logic gates to complex CPU architectures.

## Core Components

### 1. Lexer (`lexer.js`)
- Tokenizes circuit syntax into atomic units
- Handles comments (// and /* */)
- Recognizes keywords, identifiers, numbers, and operators
- Line and column tracking for error reporting

**Key Classes:**
- `Token`: Represents a single token with type, value, line, and column
- `Lexer`: Main tokenizer class

### 2. Parser (`parser.js`)
- Converts tokens into an Abstract Syntax Tree (AST)
- Recursive descent parser
- Supports statements in any order
- Handles gate definitions, inputs, outputs, and test data

**Key Classes:**
- `ASTNode`: Represents AST nodes with type and properties
- `Parser`: Main parser class

### 3. Simulator (`simulator.js`)
- Executes circuits by evaluating gates
- Supports 15+ logic and arithmetic operations
- Memoization and caching for performance
- State management for complex circuits

**Key Classes:**
- `Simulator`: Main execution engine

### 4. Module System (`modules.js`)
- Defines reusable circuit modules
- Built-in modules: FullAdder, Multiplexer, SRLatch
- Module instantiation and composition

### 5. ALU (`alu.js`)
- Arithmetic Logic Unit for CPU operations
- 16 different operations with status flags
- Used for calculator and CPU examples

## Data Flow

```
Source Code (.circuit file)
    ↓
Lexer → Tokens
    ↓
Parser → AST
    ↓
Simulator → Results
    ↓
Output (JSON + formatted results)
```

## Gate Types

### Logic Gates
- `AND`: Bitwise AND
- `OR`: Bitwise OR
- `NOT`: Bitwise NOT
- `XOR`: Bitwise XOR
- `NAND`: NAND (NOT AND)
- `NOR`: NOR (NOT OR)

### Arithmetic Operations
- `ADD`: 8-bit addition with carry
- `SUB`: 8-bit subtraction
- `MUL`: 8-bit multiplication
- `DIV`: Integer division
- `MOD`: Modulo operation
- `NEGATE`: Negate (two's complement)
- `LSHIFT`: Left shift (multiply by 2)
- `RSHIFT`: Right shift (divide by 2)

## Circuit Syntax

```
// Define input signals
input: A, B, C

// Define gates
gate_name: GateType(input1, input2, ...) -> (output)

// Define outputs
output: target_signal

// Define test inputs
test: A=1, B=0, C=1
```

## Internal Representation

### Gate Definition (AST Node)
```javascript
{
  type: "Gate",
  name: "and_gate",
  gateType: "AND",
  inputs: ["A", "B"],
  outputs: ["Q"]
}
```

### Test Data (AST Node)
```javascript
{
  type: "Test",
  assignments: [
    { type: "Assignment", name: "A", value: 1 },
    { type: "Assignment", name: "B", value: 0 }
  ]
}
```

## Performance Considerations

1. **Gate Caching**: Results are cached to avoid redundant calculations
2. **Bitwise Operations**: All arithmetic is masked to 8 bits for performance
3. **Direct Gate Evaluation**: No dependency graph - gates evaluated in order

## Extension Points

### Adding New Gate Types
Edit `simulator.js` in the `evaluateGate()` method:
```javascript
case 'YOURGATE':
  result = /* computation */;
  break;
```

### Adding New Modules
Use `modules.js` `ModuleManager`:
```javascript
ModuleManager.register('YourModule', inputs, outputs, gates);
```

### Custom Simulators
Extend the `Simulator` class for specialized behavior.

## Limitations & Future Improvements

### Current Limitations
- Single clock cycle evaluation only
- No state persistence between cycles
- Limited to 8-bit operations
- No timing analysis
- No power analysis

### Planned Features
- Sequential logic with clock signals
- Register files
- Multi-cycle operations
- Timing constraints
- Memory subsystems
- Parametric designs
