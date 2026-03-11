// CircuitLang Module System - For reusable components

class Module {
  constructor(name, inputs, outputs, gates) {
    this.name = name;
    this.inputs = inputs;      // Array of input names
    this.outputs = outputs;    // Array of output names
    this.gates = gates;        // Internal gate definitions
  }

  // Instantiate module with specific input/output connections
  instantiate(name, inputConnections, outputConnections) {
    return {
      type: 'ModuleInstance',
      moduleName: this.name,
      instanceName: name,
      inputs: inputConnections,
      outputs: outputConnections,
      gates: this.gates
    };
  }
}

class ModuleManager {
  constructor() {
    this.modules = {};
  }

  register(name, inputs, outputs, gates) {
    this.modules[name] = new Module(name, inputs, outputs, gates);
  }

  get(name) {
    return this.modules[name];
  }

  exists(name) {
    return name in this.modules;
  }

  // Pre-built modules
  static getBuiltins() {
    const builtins = {};

    // 1-bit Full Adder
    builtins.FullAdder = new Module(
      'FullAdder',
      ['A', 'B', 'Cin'],
      ['Sum', 'Cout'],
      [
        { name: 'xor1', type: 'XOR', inputs: ['A', 'B'], outputs: ['out1'] },
        { name: 'xor2', type: 'XOR', inputs: ['out1', 'Cin'], outputs: ['Sum'] },
        { name: 'and1', type: 'AND', inputs: ['A', 'B'], outputs: ['out2'] },
        { name: 'and2', type: 'AND', inputs: ['out1', 'Cin'], outputs: ['out3'] },
        { name: 'or1', type: 'OR', inputs: ['out2', 'out3'], outputs: ['Cout'] }
      ]
    );

    // 2-to-1 Multiplexer
    builtins.Mux2to1 = new Module(
      'Mux2to1',
      ['A', 'B', 'Sel'],
      ['Out'],
      [
        { name: 'not_sel', type: 'NOT', inputs: ['Sel'], outputs: ['notSel'] },
        { name: 'and_a', type: 'AND', inputs: ['A', 'notSel'], outputs: ['a_out'] },
        { name: 'and_b', type: 'AND', inputs: ['B', 'Sel'], outputs: ['b_out'] },
        { name: 'or_out', type: 'OR', inputs: ['a_out', 'b_out'], outputs: ['Out'] }
      ]
    );

    // 1-bit Latch (SR Flip-Flop)
    builtins.SRLatch = new Module(
      'SRLatch',
      ['S', 'R'],
      ['Q', 'Qn'],
      [
        { name: 'nor1', type: 'NOR', inputs: ['S', 'Qn'], outputs: ['Q'] },
        { name: 'nor2', type: 'NOR', inputs: ['R', 'Q'], outputs: ['Qn'] }
      ]
    );

    return builtins;
  }
}

module.exports = { Module, ModuleManager };
