# CircuitLang

A text-based programming language for designing and simulating digital circuits. Build anything from simple logic gates to complex CPU architectures using an intuitive syntax.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D12.0-brightgreen.svg)

## ✨ Features

- **Intuitive Syntax**: Define circuits in plain text
- **15+ Operations**: Logic gates + arithmetic operations
- **Circuit Simulation**: Test designs before building
- **CPU Support**: Build processors and calculators
- **Module System**: Reusable components
- **ALU (Arithmetic Logic Unit)**: 16 operations with status flags
- **Comprehensive Examples**: From basic gates to CPU designs

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/matteusmerrun/circuitlang.git
cd circuitlang
npm install
```

### Web Server (Recommended)

```bash
npm start
```

Open **http://localhost:3000** in your browser for the interactive IDE!

### Command Line

Create `hello_circuit.circuit`:
```
and_gate: AND(A, B) -> (Q)
output: and_gate.Q
test: A=1, B=1
```

Run it:
```bash
node main.js hello_circuit.circuit
```

Output:
```
📊 Outputs:
  and_gate.Q = 1
```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [WEB_SERVER.md](WEB_SERVER.md) | Web interface guide |
| [SYNTAX.md](SYNTAX.md) | Complete syntax reference |
| [TUTORIAL.md](TUTORIAL.md) | Step-by-step learning guide |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Design and internals |
| [API.md](API.md) | Programmatic API reference |

## 🌐 Web Server

CircuitLang includes a live web server with an interactive IDE!

```bash
npm start
# Open http://localhost:3000
```

**Features:**
- Live code editor
- Real-time simulation
- Multiple output tabs (Results, Tokens, AST, Circuit)
- Example circuit library
- WebSocket-based communication
- Dark theme UI

See [WEB_SERVER.md](WEB_SERVER.md) for details.

## 🎯 Supported Operations

### Logic Gates
- `AND` - Bitwise AND
- `OR` - Bitwise OR  
- `NOT` - Bitwise NOT
- `XOR` - Bitwise XOR
- `NAND` - NAND gate
- `NOR` - NOR gate

### Arithmetic
- `ADD` - Addition
- `SUB` - Subtraction
- `MUL` - Multiplication
- `DIV` - Division
- `MOD` - Modulo
- `NEGATE` - Negate
- `LSHIFT` - Left shift
- `RSHIFT` - Right shift

## 📖 Examples

### Logic: Multiplexer
```
not_sel: NOT(SEL) -> (Q)
and_a: AND(A, not_sel.Q) -> (Q)
and_b: AND(B, SEL) -> (Q)
or_gate: OR(and_a.Q, and_b.Q) -> (Q)

output: or_gate.Q
test: A=1, B=0, SEL=1
```

### Arithmetic: Half Adder
```
xor_gate: XOR(A, B) -> (Sum)
and_gate: AND(A, B) -> (Carry)

output: xor_gate.Sum
output: and_gate.Carry

test: A=1, B=1
```

### CPU: Simple Calculation
```
add_op: ADD(A, B) -> (Q)
and_op: AND(add_op.Q, C) -> (result)

output: add_op.Q
output: and_op.result

test: A=15, B=7, C=12
```

### Run Examples
```bash
npm run example:and
npm run example:half-adder
npm run example:simple-cpu
npm run example:xor
npm run example:multiplexer
```

## 💻 API Usage

Use CircuitLang programmatically:

```javascript
const { Lexer } = require('./lexer');
const { Parser } = require('./parser');
const { Simulator } = require('./simulator');

const code = `
xor: XOR(A, B) -> (Q)
output: xor.Q
test: A=1, B=1
`;

const tokens = new Lexer(code).tokenize();
const ast = new Parser(tokens).parse();
const result = new Simulator(ast).simulate();

console.log(result.outputs[0].value); // 0
```

## 🏗️ Architecture

```
Source Code
    ↓
Lexer (tokenization)
    ↓
Parser (AST building)
    ↓
Simulator (execution)
    ↓
Results
```

## 📦 Project Structure

```
circuitlang/
├── main.js              # Entry point
├── lexer.js             # Tokenizer
├── parser.js            # AST builder
├── simulator.js         # Execution engine
├── modules.js           # Reusable components
├── alu.js               # Arithmetic Logic Unit
├── examples/            # Circuit examples
├── README.md            # This file
├── SYNTAX.md            # Syntax reference
├── TUTORIAL.md          # Learning guide
├── ARCHITECTURE.md      # Design docs
├── API.md               # API reference
├── CONTRIBUTING.md      # Contribution guide
├── CHANGELOG.md         # Version history
├── LICENSE              # MIT License
└── package.json         # Project config
```

## 🧪 Testing

```bash
npm test
```

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch
3. Add your changes
4. Submit a pull request

## 📋 Roadmap

- [ ] Sequential logic with clock signals
- [ ] Register files
- [ ] Multi-cycle operations  
- [ ] Timing constraints
- [ ] Memory subsystems
- [ ] Power analysis
- [ ] Web-based simulator
- [ ] Visual circuit designer

## ⚖️ License

MIT License - see [LICENSE](LICENSE) file

## 👤 Author

Created by Matteus Merrun

## 🔗 Links

- [GitHub Repository](https://github.com/matteusmerrun/circuitlang)
- [Issue Tracker](https://github.com/matteusmerrun/circuitlang/issues)
- [Discussions](https://github.com/matteusmerrun/circuitlang/discussions)

## 📝 Notes

- All arithmetic uses 8-bit operations
- Gates are evaluated in order
- Comments supported: `//` and `/* */`
- Outputs can reference gate pins using dot notation: `gate_name.pin`

## 🎓 Learning Resources

- **Beginners**: Start with [TUTORIAL.md](TUTORIAL.md)
- **Syntax**: Check [SYNTAX.md](SYNTAX.md)
- **Deep Dive**: Read [ARCHITECTURE.md](ARCHITECTURE.md)
- **Coding**: See [API.md](API.md)

---

**Happy Circuit Designing!** 🎯

