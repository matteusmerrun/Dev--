// CircuitLang Simulator - Executes circuits

class Simulator {
  constructor(ast) {
    this.ast = ast;
    this.gates = {};
    this.inputs = {};
    this.outputs = [];
    this.testData = [];
    this.inputNames = [];
    this.modules = {};       // For reusable circuit modules
    this.memory = {};        // For storing state
    this.cache = {};         // For memoization
  }

  simulate() {
    // First pass: collect all gate definitions and input/output declarations
    for (const stmt of this.ast.statements) {
      if (stmt.type === 'Gate') {
        this.gates[stmt.name] = stmt;
      } else if (stmt.type === 'Input') {
        this.inputNames = stmt.names;
      } else if (stmt.type === 'Output') {
        this.outputs.push(stmt.target);
      } else if (stmt.type === 'Test') {
        this.testData = stmt.assignments;
      }
    }

    // Run simulation with test data
    if (this.testData.length > 0) {
      return this.runTest();
    } else {
      return this.evaluateCircuit();
    }
  }

  runTest() {
    // Set up inputs from test data
    for (const assignment of this.testData) {
      this.inputs[assignment.name] = assignment.value;
    }

    // Evaluate all gates with dependency resolution
    const results = {};
    const evaluated = new Set();
    
    const evaluateGateDependencies = (gateName) => {
      if (evaluated.has(gateName)) return results[gateName];
      
      const gateDef = this.gates[gateName];
      
      // First, evaluate any gates this gate depends on
      for (const input of gateDef.inputs) {
        if (input.includes('.')) {
          const [depGateName] = input.split('.');
          if (this.gates.hasOwnProperty(depGateName)) {
            evaluateGateDependencies(depGateName);
          }
        }
      }
      
      // Now evaluate this gate
      results[gateName] = this.evaluateGate(gateName, gateDef, results);
      evaluated.add(gateName);
      return results[gateName];
    };
    
    for (const gateName of Object.keys(this.gates)) {
      evaluateGateDependencies(gateName);
    }

    // Collect outputs
    const output = [];
    for (const outputTarget of this.outputs) {
      output.push({
        target: outputTarget,
        value: this.resolveValue(outputTarget, results)
      });
    }

    return {
      inputs: this.inputs,
      gates: results,
      outputs: output
    };
  }

  evaluateCircuit() {
    const results = {};
    for (const [gateName, gateDef] of Object.entries(this.gates)) {
      results[gateName] = this.evaluateGate(gateName, gateDef);
    }
    return results;
  }

  evaluateGate(gateName, gateDef, gateResults = {}) {
    const { gateType, inputs, outputs } = gateDef;
    const inputValues = inputs.map(inputName => this.resolveValue(inputName, gateResults));

    let result;
    switch (gateType) {
      case 'AND':
        result = inputValues.length === 1 ? inputValues[0] : inputValues.reduce((a, b) => a & b);
        break;
      case 'OR':
        result = inputValues.reduce((a, b) => a | b, 0);
        break;
      case 'NOT':
        result = inputValues[0] ? 0 : 1;
        break;
      case 'XOR':
        result = inputValues.reduce((a, b) => a ^ b, 0);
        break;
      case 'NAND':
        result = (inputValues.length === 1 ? inputValues[0] : inputValues.reduce((a, b) => a & b)) ? 0 : 1;
        break;
      case 'NOR':
        result = (inputValues.reduce((a, b) => a | b, 0)) ? 0 : 1;
        break;
      // Advanced operations for CPU/calculator
      case 'ADD':
        result = (inputValues[0] + inputValues[1]) & 0xFF; // 8-bit addition
        break;
      case 'SUB':
        result = (inputValues[0] - inputValues[1]) & 0xFF; // 8-bit subtraction
        break;
      case 'MUL':
        result = (inputValues[0] * inputValues[1]) & 0xFF; // 8-bit multiplication
        break;
      case 'DIV':
        result = inputValues[1] !== 0 ? Math.floor(inputValues[0] / inputValues[1]) : 0;
        break;
      case 'LSHIFT':
        result = (inputValues[0] << (inputValues[1] || 1)) & 0xFF;
        break;
      case 'RSHIFT':
        result = (inputValues[0] >> (inputValues[1] || 1)) & 0xFF;
        break;
      case 'MOD':
        result = inputValues[1] !== 0 ? inputValues[0] % inputValues[1] : 0;
        break;
      case 'NEGATE':
        result = (-inputValues[0]) & 0xFF;
        break;
      default:
        throw new Error(`Unknown gate type: ${gateType}`);
    }

    // Return object with output pin names
    const output = {};
    for (const outName of outputs) {
      output[outName] = result;
    }
    return output;
  }

  resolveValue(reference, gateResults) {
    // Check if it's a direct input
    if (this.inputs.hasOwnProperty(reference)) {
      return this.inputs[reference];
    }

    // Check if it's a gate output (format: gateName.pinName)
    if (reference.includes('.')) {
      const [gateName, pinName] = reference.split('.');
      if (this.gates.hasOwnProperty(gateName)) {
        const gateResult = gateResults[gateName] || this.evaluateGate(gateName, this.gates[gateName]);
        if (gateResult.hasOwnProperty(pinName)) {
          return gateResult[pinName];
        }
      }
    }

    throw new Error(`Cannot resolve value: ${reference}`);
  }
}

module.exports = { Simulator };
