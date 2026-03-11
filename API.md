# API Reference

## Main Classes

### Lexer

Tokenizes circuit source code.

```javascript
const { Lexer } = require('./lexer');

const lexer = new Lexer(sourceCode);
const tokens = lexer.tokenize();
```

**Methods:**
- `tokenize()`: Returns array of Token objects
- `error(message)`: Throws lexer error with line/column info

**Throws:**
- `LexerError`: Invalid syntax

---

### Parser

Converts tokens to Abstract Syntax Tree.

```javascript
const { Parser } = require('./parser');

const parser = new Parser(tokens);
const ast = parser.parse();
```

**Methods:**
- `parse()`: Returns root `Program` AST node
- `error(message)`: Throws parse error

**Throws:**
- `ParseError`: Invalid circuit structure

---

### Simulator

Executes circuits and produces results.

```javascript
const { Simulator } = require('./simulator');

const simulator = new Simulator(ast);
const result = simulator.simulate();
```

**Methods:**
- `simulate()`: Runs circuit with test data, returns results
- `evaluateGate(name, gateDef)`: Evaluates single gate
- `resolveValue(reference)`: Gets value of signal/output

**Result Structure:**
```javascript
{
  inputs: { signal: value, ... },
  gates: { gateName: { pin: value, ... }, ... },
  outputs: [ { target: "name", value: number }, ... ]
}
```

---

### Module

Reusable circuit module definition.

```javascript
const { Module } = require('./modules');

const fullAdder = new Module(
  'FullAdder',
  ['A', 'B', 'Cin'],        // inputs
  ['Sum', 'Cout'],            // outputs
  [/* gate definitions */]
);
```

**Methods:**
- `instantiate(name, inputs, outputs)`: Creates module instance

---

### ModuleManager

Registry for reusable modules.

```javascript
const { ModuleManager } = require('./modules');

const manager = new ModuleManager();
manager.register('MyModule', inputs, outputs, gates);

if (manager.exists('MyModule')) {
  const module = manager.get('MyModule');
}
```

**Built-in Modules:**
- `FullAdder`: 1-bit full adder
- `Mux2to1`: 2-to-1 multiplexer
- `SRLatch`: SR flip-flop

---

### ALU

Arithmetic Logic Unit for CPU operations.

```javascript
const { ALU } = require('./alu');

const alu = new ALU();
const result = alu.execute(opcode, operand_a, operand_b);
const flags = alu.getFlags();
```

**Opcodes:**
| Code | Operation |
|------|-----------|
| 0x0 | ADD |
| 0x1 | SUB |
| 0x2 | AND |
| 0x3 | OR |
| 0x4 | XOR |
| 0x5 | NOT A |
| 0x6 | NAND |
| 0x7 | NOR |
| 0x8 | LSHIFT |
| 0x9 | RSHIFT |
| 0xA | MUL |
| 0xB | DIV |
| 0xC | MOD |
| 0xD | NEGATE |
| 0xE | INCREMENT |
| 0xF | DECREMENT |

**Methods:**
- `execute(opcode, a, b)`: Performs operation, returns 8-bit result
- `getFlags()`: Returns { result, zero, carry, negative }

**Status Flags:**
- `zeroFlag`: Set if result is 0
- `carryFlag`: Set if overflow/borrow
- `negFlag`: Set if result is negative (MSB)

---

## AST Node Types

### Program
```javascript
{
  type: "Program",
  statements: [ /* node array */ ]
}
```

### Gate
```javascript
{
  type: "Gate",
  name: "gate_name",
  gateType: "AND",
  inputs: ["A", "B"],
  outputs: ["Q"]
}
```

### Input
```javascript
{
  type: "Input",
  names: ["A", "B", "C"]
}
```

### Output
```javascript
{
  type: "Output",
  target: "gate_name.Q"
}
```

### Test
```javascript
{
  type: "Test",
  assignments: [
    { type: "Assignment", name: "A", value: 1 },
    { type: "Assignment", name: "B", value: 0 }
  ]
}
```

---

## Usage Examples

### Basic Circuit
```javascript
const { Lexer } = require('./lexer');
const { Parser } = require('./parser');
const { Simulator } = require('./simulator');

const code = `
and_gate: AND(A, B) -> (Q)
output: and_gate.Q
test: A=1, B=1
`;

const tokens = new Lexer(code).tokenize();
const ast = new Parser(tokens).parse();
const result = new Simulator(ast).simulate();

console.log(result.outputs[0].value); // 1
```

### Using ALU
```javascript
const { ALU } = require('./alu');

const alu = new ALU();
const result = alu.execute(0x0, 15, 7);  // ADD 15 + 7
console.log(result); // 22

const flags = alu.getFlags();
console.log(flags.carry); // false
```

### Using Modules
```javascript
const { ModuleManager } = require('./modules');

const manager = new ModuleManager();
const builtins = ModuleManager.getBuiltins();

const fullAdder = builtins.FullAdder;
```
