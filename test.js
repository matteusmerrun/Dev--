#!/usr/bin/env node

/**
 * CircuitLang Test Suite
 * Run with: npm test
 */

const { Lexer } = require('./lexer');
const { Parser } = require('./parser');
const { Simulator } = require('./simulator');
const { ALU } = require('./alu');

const tests = [];
let passed = 0;
let failed = 0;

function test(name, fn) {
  tests.push({ name, fn });
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
}

function assertTrue(value, message) {
  if (!value) {
    throw new Error(`${message}: expected true, got ${value}`);
  }
}

// Helper to run a circuit
function runCircuit(code) {
  const tokens = new Lexer(code).tokenize();
  const ast = new Parser(tokens).parse();
  return new Simulator(ast).simulate();
}

// ============ TESTS ============

test('AND gate', () => {
  const result = runCircuit(`
    and_gate: AND(A, B) -> (Q)
    output: and_gate.Q
    test: A=1, B=1
  `);
  assertEqual(result.outputs[0].value, 1, 'AND(1,1)');
});

test('OR gate', () => {
  const result = runCircuit(`
    or_gate: OR(A, B) -> (Q)
    output: or_gate.Q
    test: A=0, B=1
  `);
  assertEqual(result.outputs[0].value, 1, 'OR(0,1)');
});

test('NOT gate', () => {
  const result = runCircuit(`
    not_gate: NOT(A) -> (Q)
    output: not_gate.Q
    test: A=0
  `);
  assertEqual(result.outputs[0].value, 1, 'NOT(0)');
});

test('XOR gate', () => {
  const result = runCircuit(`
    xor_gate: XOR(A, B) -> (Q)
    output: xor_gate.Q
    test: A=1, B=0
  `);
  assertEqual(result.outputs[0].value, 1, 'XOR(1,0)');
});

test('NAND gate', () => {
  const result = runCircuit(`
    nand_gate: NAND(A, B) -> (Q)
    output: nand_gate.Q
    test: A=1, B=1
  `);
  assertEqual(result.outputs[0].value, 0, 'NAND(1,1)');
});

test('NOR gate', () => {
  const result = runCircuit(`
    nor_gate: NOR(A, B) -> (Q)
    output: nor_gate.Q
    test: A=0, B=0
  `);
  assertEqual(result.outputs[0].value, 1, 'NOR(0,0)');
});

test('ADD operation', () => {
  const result = runCircuit(`
    add: ADD(A, B) -> (Q)
    output: add.Q
    test: A=15, B=7
  `);
  assertEqual(result.outputs[0].value, 22, 'ADD(15,7)');
});

test('SUB operation', () => {
  const result = runCircuit(`
    sub: SUB(A, B) -> (Q)
    output: sub.Q
    test: A=10, B=3
  `);
  assertEqual(result.outputs[0].value, 7, 'SUB(10,3)');
});

test('MUL operation', () => {
  const result = runCircuit(`
    mul: MUL(A, B) -> (Q)
    output: mul.Q
    test: A=3, B=4
  `);
  assertEqual(result.outputs[0].value, 12, 'MUL(3,4)');
});

test('DIV operation', () => {
  const result = runCircuit(`
    div: DIV(A, B) -> (Q)
    output: div.Q
    test: A=12, B=3
  `);
  assertEqual(result.outputs[0].value, 4, 'DIV(12,3)');
});

test('LSHIFT operation', () => {
  const result = runCircuit(`
    lshift: LSHIFT(A, B) -> (Q)
    output: lshift.Q
    test: A=1, B=2
  `);
  assertEqual(result.outputs[0].value, 4, 'LSHIFT(1,2)');
});

test('RSHIFT operation', () => {
  const result = runCircuit(`
    rshift: RSHIFT(A, B) -> (Q)
    output: rshift.Q
    test: A=8, B=1
  `);
  assertEqual(result.outputs[0].value, 4, 'RSHIFT(8,1)');
});

test('Half Adder', () => {
  const result = runCircuit(`
    xor_gate: XOR(A, B) -> (Sum)
    and_gate: AND(A, B) -> (Carry)
    output: xor_gate.Sum
    output: and_gate.Carry
    test: A=1, B=1
  `);
  assertEqual(result.outputs[0].value, 0, 'HalfAdder Sum');
  assertEqual(result.outputs[1].value, 1, 'HalfAdder Carry');
});

test('Multiple gates chain', () => {
  const result = runCircuit(`
    gate1: AND(A, B) -> (Q)
    gate2: OR(gate1.Q, C) -> (Q)
    output: gate2.Q
    test: A=0, B=1, C=1
  `);
  assertEqual(result.outputs[0].value, 1, 'Chained gates');
});

test('Multiple outputs', () => {
  const result = runCircuit(`
    gate1: AND(A, B) -> (Q)
    gate2: OR(A, B) -> (Q)
    output: gate1.Q
    output: gate2.Q
    test: A=1, B=0
  `);
  assertEqual(result.outputs.length, 2, 'Multiple outputs count');
  assertEqual(result.outputs[0].value, 0, 'First output');
  assertEqual(result.outputs[1].value, 1, 'Second output');
});

test('ALU - ADD', () => {
  const alu = new ALU();
  const result = alu.execute(0x0, 15, 7);
  assertEqual(result, 22, 'ALU ADD');
});

test('ALU - SUB', () => {
  const alu = new ALU();
  const result = alu.execute(0x1, 15, 7);
  assertEqual(result, 8, 'ALU SUB');
});

test('ALU - AND', () => {
  const alu = new ALU();
  const result = alu.execute(0x2, 12, 10);
  assertEqual(result, 8, 'ALU AND');
});

test('ALU - XOR', () => {
  const alu = new ALU();
  const result = alu.execute(0x4, 12, 10);
  assertEqual(result, 6, 'ALU XOR');
});

test('ALU flags - zero flag', () => {
  const alu = new ALU();
  alu.execute(0x0, 0, 0);
  assertTrue(alu.zeroFlag, 'Zero flag set');
});

test('ALU flags - carry flag', () => {
  const alu = new ALU();
  alu.execute(0x0, 255, 1);  // Overflow
  assertTrue(alu.carryFlag, 'Carry flag set');
});

test('Comments are ignored', () => {
  const result = runCircuit(`
    // This is a comment
    and_gate: AND(A, B) -> (Q)
    /* Multi-line
       comment */
    output: and_gate.Q
    test: A=1, B=1
  `);
  assertEqual(result.outputs[0].value, 1, 'Comments ignored');
});

test('Complex circuit', () => {
  const result = runCircuit(`
    add_op: ADD(A, B) -> (Q)
    and_op: AND(add_op.Q, C) -> (result)
    output: and_op.result
    test: A=15, B=7, C=12
  `);
  // (15 + 7) & 12 = 22 & 12 = 4
  assertEqual(result.outputs[0].value, 4, 'Complex computation');
});

// ============ RUN TESTS ============

async function runTests() {
  console.log(`\n🧪 CircuitLang Test Suite\n`);
  console.log(`Running ${tests.length} tests...\n`);

  for (const { name, fn } of tests) {
    try {
      fn();
      console.log(`✓ ${name}`);
      passed++;
    } catch (error) {
      console.log(`✗ ${name}`);
      console.log(`  Error: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total:  ${tests.length}`);
  console.log(`${'='.repeat(50)}\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
