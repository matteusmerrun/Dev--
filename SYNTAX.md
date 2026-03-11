# CircuitLang Syntax Guide

## Basic Syntax

### Gate Definition
```
gate_name: GateType(input1, input2, ...) -> (output1, output2, ...)
```

- `gate_name`: Unique identifier for the gate
- `GateType`: Type of logic gate (AND, OR, NOT, XOR, NAND, NOR)
- `input1, input2, ...`: Input pin names
- `output1, output2, ...`: Output pin names

### Output Declaration
```
output: target
```

- `target`: Can be a direct input (e.g., `A`) or a gate output (e.g., `gate_name.pin_name`)

### Test Data
```
test: input1=value1, input2=value2, ...
```

- Specifies values for inputs
- Values are 0 (false) or 1 (true)

### Input Declaration
```
input: input1, input2, input3
```

- Declares which signals are circuit inputs (optional, for documentation)

## Supported Gates

| Gate | Inputs | Function |
|------|--------|----------|
| AND | 2+ | All inputs must be 1 for output to be 1 |
| OR | 2+ | Any input 1 produces output 1 |
| NOT | 1 | Inverts the input |
| XOR | 2 | Output 1 if inputs differ |
| NAND | 2+ | NOT AND - opposite of AND |
| NOR | 2+ | NOT OR - opposite of OR |

## Comments

```
// Single-line comment

/* Multi-line
   comment */
```

## Examples

### Simple AND Gate
```
and_gate: AND(A, B) -> (Q)
output: and_gate.Q
test: A=1, B=1
```

### Multiple Gates
```
// Inputs
input: A, B, C

// Gates
gate1: AND(A, B) -> (X)
gate2: OR(X, C) -> (Y)

// Output
output: gate2.Y

// Test values
test: A=1, B=0, C=1
```

### Complex Logic: (A AND B) OR (C AND NOT D)
```
and1: AND(A, B) -> (Q)
and2: AND(C, notD) -> (Q)
not_d: NOT(D) -> (Q)
or_final: OR(and1.Q, and2.Q) -> (Q)

output: or_final.Q
test: A=1, B=1, C=0, D=0
```

## Running Circuits

```bash
node main.js path/to/circuit.circuit
```

Output shows:
1. **Tokens**: Parsed tokens from source code
2. **AST**: Abstract syntax tree representation
3. **Simulation Results**: Gate states and final outputs
4. **Outputs**: Formatted output values
