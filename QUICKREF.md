# CircuitLang Quick Reference

## Syntax Cheat Sheet

### Define a Gate
```
name: GATETYPE(input1, input2) -> (output)
```

### Common Gates
```
and_gate: AND(A, B) -> (Q)           # Bitwise AND
or_gate: OR(A, B) -> (Q)             # Bitwise OR
not_gate: NOT(A) -> (Q)              # Bitwise NOT
xor_gate: XOR(A, B) -> (Q)           # XOR
nand_gate: NAND(A, B) -> (Q)         # NAND
nor_gate: NOR(A, B) -> (Q)           # NOR
```

### Arithmetic Operations
```
add: ADD(A, B) -> (Q)                # A + B
sub: SUB(A, B) -> (Q)                # A - B
mul: MUL(A, B) -> (Q)                # A * B
div: DIV(A, B) -> (Q)                # A / B
mod: MOD(A, B) -> (Q)                # A % B
neg: NEGATE(A) -> (Q)                # -A
ls: LSHIFT(A, B) -> (Q)              # A << B
rs: RSHIFT(A, B) -> (Q)              # A >> B
```

### Reference Gate Output
```
gate2: AND(gate1.Q, C) -> (Q)        # Use gate1's Q output
```

### Declare Inputs (optional)
```
input: A, B, C
```

### Declare Outputs
```
output: gate_name.pin
output: another_gate.pin
```

### Test Circuit
```
test: A=1, B=1, C=0
```

### Comments
```
// Single line comment

/* Multi-line
   comment */
```

## Complete Example: Half Adder

```
// Half Adder Circuit
// Input: A, B (1-bit each)
// Output: Sum, Carry

input: A, B

// XOR for sum
xor_gate: XOR(A, B) -> (Sum)

// AND for carry
and_gate: AND(A, B) -> (Carry)

// Outputs
output: xor_gate.Sum
output: and_gate.Carry

// Test: 1 + 1
test: A=1, B=1
```

## Running Circuits

```bash
# Run a circuit file
node main.js circuit.circuit

# Run tests
npm test

# Run examples
npm run example:and
npm run example:half-adder
npm run example:cpu
```

## All Supported Operations

| Type | Operation | Input | Output |
|------|-----------|-------|--------|
| Logic | AND, OR, NOT, XOR, NAND, NOR | 2 inputs | 1 bit |
| Arith | ADD, SUB, MUL, DIV, MOD | 2 inputs | 8 bits |
| Shift | LSHIFT, RSHIFT | 2 inputs | 8 bits |
| Unary | NEGATE | 1 input | 8 bits |

## File Structure

```
circuitlang/
├── main.js              # Run circuits
├── lexer.js             # Tokenizer
├── parser.js            # AST builder
├── simulator.js         # Executor
├── alu.js               # ALU implementation
├── modules.js           # Reusable modules
├── examples/            # Example circuits
├── test.js              # Unit tests
└── *.md                 # Documentation
```

## Tips & Tricks

1. **Chain Gates**: Pass output of one gate to another
   ```
   gate1: AND(A, B) -> (Q)
   gate2: OR(gate1.Q, C) -> (Q)
   ```

2. **Multiple Outputs**: Reference gate multiple times
   ```
   output: gate1.Q
   output: gate2.Q
   output: gate3.Q
   ```

3. **Test Different Values**: Change test values to verify logic
   ```
   test: A=1, B=0
   test: A=0, B=1
   ```

4. **Use Comments**: Document complex circuits
   ```
   // Compute (A AND B) OR (C AND NOT D)
   ```

## Error Messages

| Error | Solution |
|-------|----------|
| `Unexpected token` | Check syntax, missing colon after gate name |
| `Cannot resolve value` | Reference doesn't exist, check gate name |
| `Unknown gate type` | Typo in gate name (AND vs and) |
| `Unclosed string` | Missing closing quote |

## Learning Path

1. Start: [README.md](README.md)
2. Learn: [TUTORIAL.md](TUTORIAL.md)
3. Reference: [SYNTAX.md](SYNTAX.md)
4. Deep Dive: [ARCHITECTURE.md](ARCHITECTURE.md)
5. Code: [API.md](API.md)

## Examples by Complexity

**Beginner**:
- and_gate.circuit
- or_gate.circuit
- xor_gate.circuit

**Intermediate**:
- half_adder.circuit
- multiplexer.circuit

**Advanced**:
- 4bit_calculator.circuit
- simple_cpu.circuit

---

**More Help**: See documentation folder or open an issue on GitHub
