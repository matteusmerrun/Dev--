# CircuitLang Tutorial

Complete guide to designing circuits with CircuitLang.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Basic Circuits](#basic-circuits)
3. [Logic Circuits](#logic-circuits)
4. [Arithmetic Circuits](#arithmetic-circuits)
5. [CPU Design](#cpu-design)
6. [Advanced Topics](#advanced-topics)

## Getting Started

### Installation

```bash
git clone https://github.com/matteusmerrun/circuitlang.git
cd circuitlang
npm install
```

### Running Your First Circuit

Create `my_first.circuit`:
```
// My first circuit!
and_gate: AND(A, B) -> (Q)
output: and_gate.Q
test: A=1, B=1
```

Run it:
```bash
node main.js my_first.circuit
```

Expected output:
```
📊 Outputs:
  and_gate.Q = 1
```

## Basic Circuits

### Circuit Structure

Every CircuitLang program has three main parts:

1. **Gate Definitions**: Define logic gates and their connections
2. **Outputs**: Specify which signals to display
3. **Tests**: Provide input values for simulation

### Simple Gates

**AND Gate**
```
and_gate: AND(A, B) -> (Q)
output: and_gate.Q
test: A=1, B=1
```

**OR Gate**
```
or_gate: OR(A, B) -> (Q)
output: or_gate.Q
test: A=0, B=1
```

**NOT Gate**
```
not_gate: NOT(A) -> (Q)
output: not_gate.Q
test: A=0
```

### Multiple Outputs

```
gate1: AND(A, B) -> (Q)
gate2: OR(A, B) -> (Q)

output: gate1.Q
output: gate2.Q

test: A=1, B=0
```

## Logic Circuits

### De Morgan's Laws

Demonstrate that NOT(A AND B) = NOT(A) OR NOT(B):

```
// De Morgan's Law: ¬(A ∧ B) = ¬A ∨ ¬B

// Left side: NOT(A AND B)
and_gate: AND(A, B) -> (Q)
not_gate: NOT(and_gate.Q) -> (Q)

// Right side: NOT(A) OR NOT(B)
not_a: NOT(A) -> (Q)
not_b: NOT(B) -> (Q)
or_gate: OR(not_a.Q, not_b.Q) -> (Q)

// Both should have same output
output: not_gate.Q
output: or_gate.Q

test: A=1, B=1
```

### Multiplexer (2-to-1 Switch)

Select between A or B based on SEL:

```
// If SEL=0, output A; if SEL=1, output B

not_sel: NOT(SEL) -> (Q)
and_a: AND(A, not_sel.Q) -> (Q)
and_b: AND(B, SEL) -> (Q)
or_gate: OR(and_a.Q, and_b.Q) -> (Q)

output: or_gate.Q

test: A=1, B=0, SEL=0  // Output should be 1 (A)
```

## Arithmetic Circuits

### Half Adder

Add two 1-bit numbers:

```
// Sum = A XOR B
// Carry = A AND B

xor_gate: XOR(A, B) -> (Sum)
and_gate: AND(A, B) -> (Carry)

output: xor_gate.Sum
output: and_gate.Carry

test: A=1, B=1
// Output: Sum=0, Carry=1 (binary 10 = decimal 2)
```

### Full Adder

Add two 1-bit numbers plus carry-in:

```
// Full adder: Cin + A + B

// First XOR: A XOR B
xor1: XOR(A, B) -> (s1)

// Second XOR: (A XOR B) XOR Cin
xor2: XOR(xor1.s1, Cin) -> (Sum)

// Carry calculation
and1: AND(A, B) -> (c1)
and2: AND(xor1.s1, Cin) -> (c2)
or1: OR(and1.c1, and2.c2) -> (Cout)

output: xor2.Sum
output: or1.Cout

test: A=1, B=1, Cin=1
// Output: Sum=1, Cout=1 (1+1+1=3, binary 11)
```

### Simple Addition

Using arithmetic operations:

```
// Add two numbers: 15 + 7

add_op: ADD(A, B) -> (Q)
output: add_op.Q

test: A=15, B=7
// Output: 22
```

## CPU Design

### ALU (Arithmetic Logic Unit)

A CPU's ALU performs multiple operations:

```
// ALU: Execute different operations based on OP code
// OP=0: ADD, OP=1: AND, OP=2: OR

input: A, B, OP

// Different operations
add_result: ADD(A, B) -> (Q)
and_result: AND(A, B) -> (Q)
or_result: OR(A, B) -> (Q)

// Select output based on OP (would need multiplexer)
output: add_result.Q
output: and_result.Q
output: or_result.Q

test: A=12, B=5, OP=0
```

### Multi-Stage Computation

Pipeline computation across multiple stages:

```
// Stage 1: Arithmetic
// Stage 2: Logic
// Stage 3: Output

input: A, B, C

// Stage 1: ADD
stage1: ADD(A, B) -> (Q)

// Stage 2: AND with C
stage2: AND(stage1.Q, C) -> (result)

// Output
output: stage2.result

test: A=15, B=7, C=12
// (15 + 7) = 22
// 22 AND 12 = 4
```

### Simple Calculator

Complete 4-bit calculator circuit:

See `examples/4bit_calculator.circuit` for full implementation.

```bash
node main.js examples/4bit_calculator.circuit
```

## Advanced Topics

### Extending CircuitLang

Add support for new operations in `simulator.js`:

```javascript
case 'MYOP':
  result = /* your computation */;
  break;
```

### Creating Modules

Define reusable components in `modules.js`:

```javascript
new Module(
  'MyComponent',
  ['input1', 'input2'],    // inputs
  ['output1'],              // outputs
  [/* gate definitions */]
)
```

### Performance Tips

1. Use descriptive gate names
2. Break complex circuits into logical sections
3. Add comments for clarity
4. Test incrementally
5. Use test data close to expected inputs

### Debugging Circuits

Check intermediate values:

```
// Add outputs at each stage
output: gate1.Q
output: gate2.Q
output: gate3.Q

// Compare with expected values
test: A=1, B=1
```

## Common Patterns

### Inverting Output

```
gate: AND(A, B) -> (Q)
not_gate: NOT(gate.Q) -> (Q_inverted)
output: not_gate.Q_inverted
```

### Gating Signal

```
// Enable output only when EN=1
and_gate: AND(signal, EN) -> (gated)
output: and_gate.gated
```

### Cascading Gates

```
// Chain operations
gate1: AND(A, B) -> (Q)
gate2: OR(gate1.Q, C) -> (Q)
gate3: AND(gate2.Q, D) -> (final)
output: gate3.final
```

## Next Steps

- Explore examples in `examples/` directory
- Read `SYNTAX.md` for detailed syntax
- Check `ARCHITECTURE.md` for internals
- Check `API.md` for programmatic usage
- Contribute your own circuits!

Happy circuit designing! 🎯
