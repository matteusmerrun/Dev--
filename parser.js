// CircuitLang Parser - Builds AST from tokens

class ASTNode {
  constructor(type, props = {}) {
    this.type = type;
    Object.assign(this, props);
  }
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }

  error(message) {
    const token = this.peek();
    throw new Error(`Parse error at ${token.line}:${token.col}: ${message}`);
  }

  peek(offset = 0) {
    const index = this.pos + offset;
    return index < this.tokens.length ? this.tokens[index] : null;
  }

  advance() {
    return this.tokens[this.pos++];
  }

  expect(type) {
    const token = this.peek();
    if (!token || token.type !== type && token.value !== type) {
      this.error(`Expected ${type}, got ${token ? token.value : 'EOF'}`);
    }
    return this.advance();
  }

  match(...types) {
    const token = this.peek();
    return token && types.some(t => token.type === t || token.value === t);
  }

  parse() {
    const statements = [];
    while (this.peek() && this.peek().type !== 'EOF') {
      statements.push(this.parseStatement());
    }
    this.expect('EOF');
    return new ASTNode('Program', { statements });
  }

  parseStatement() {
    const token = this.peek();
    
    if (token.type === 'KEYWORD') {
      if (token.value === 'output') {
        return this.parseOutput();
      }
      if (token.value === 'test') {
        return this.parseTest();
      }
      if (token.value === 'input') {
        return this.parseInput();
      }
    }
    if (token.type === 'IDENTIFIER') {
      return this.parseGateStatement();
    }
    this.error(`Unexpected token: ${token.value}`);
  }

  parseGateStatement() {
    const name = this.expect('IDENTIFIER').value;
    this.expect(':');

    // Gate or component
    const gateType = this.expect('KEYWORD').value;
    this.expect('(');
    const inputs = this.parseIdentifierList();
    this.expect(')');

    this.expect('->');

    this.expect('(');
    const outputs = this.parseIdentifierList();
    this.expect(')');

    return new ASTNode('Gate', { name, gateType, inputs, outputs });
  }

  parseIdentifierList() {
    const items = [];
    if (!this.match(')')) {
      items.push(this.parseRef());
      while (this.match(',')) {
        this.advance(); // consume comma
        items.push(this.parseRef());
      }
    }
    return items;
  }

  parseRef() {
    // Parse reference: can be identifier or identifier.identifier (for gate outputs)
    let ref = this.expect('IDENTIFIER').value;
    while (this.match('.')) {
      this.advance();
      ref += '.' + this.expect('IDENTIFIER').value;
    }
    return ref;
  }

  parseOutput() {
    this.expect('output');
    this.expect(':');
    const target = this.parseTarget();
    return new ASTNode('Output', { target });
  }

  parseTest() {
    this.expect('test');
    this.expect(':');
    const assignments = [];

    assignments.push(this.parseAssignment());
    while (this.match(',')) {
      this.advance(); // consume comma
      assignments.push(this.parseAssignment());
    }

    return new ASTNode('Test', { assignments });
  }

  parseInput() {
    this.expect('input');
    this.expect(':');
    const names = [];
    names.push(this.expect('IDENTIFIER').value);
    while (this.match(',')) {
      this.advance();
      names.push(this.expect('IDENTIFIER').value);
    }
    return new ASTNode('Input', { names });
  }

  parseAssignment() {
    const name = this.expect('IDENTIFIER').value;
    this.expect('=');
    const value = this.expect('NUMBER').value;
    return new ASTNode('Assignment', { name, value: parseInt(value) });
  }

  parseTarget() {
    let name = this.expect('IDENTIFIER').value;
    while (this.match('.')) {
      this.advance();
      name += '.' + this.expect('IDENTIFIER').value;
    }
    return name;
  }
}

module.exports = { Parser, ASTNode };
