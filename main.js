#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Lexer } = require('./lexer');
const { Parser } = require('./parser');
const { Simulator } = require('./simulator');

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('CircuitLang - Text-Based Circuit Programming Language');
    console.log('\nUsage: node main.js <circuit-file>');
    console.log('\nExample: node main.js examples/and_gate.circuit');
    process.exit(1);
  }

  const filePath = args[0];

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  try {
    const source = fs.readFileSync(filePath, 'utf-8');

    // Lexing
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    console.log('📝 Tokens:');
    tokens.filter(t => t.type !== 'EOF').forEach((t, i) => {
      console.log(`  [${i}] ${t.toString()}`);
    });
    console.log();

    // Parsing
    const parser = new Parser(tokens);
    const ast = parser.parse();

    console.log('🌳 AST:');
    console.log(JSON.stringify(ast, null, 2));
    console.log();

    // Simulation
    const simulator = new Simulator(ast);
    const result = simulator.simulate();

    console.log('⚡ Simulation Results:');
    console.log(JSON.stringify(result, null, 2));
    console.log();

    // Pretty print outputs
    if (result.outputs && result.outputs.length > 0) {
      console.log('📊 Outputs:');
      result.outputs.forEach(output => {
        console.log(`  ${output.target} = ${output.value}`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
