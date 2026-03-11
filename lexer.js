// CircuitLang Lexer - Tokenizes circuit syntax

class Token {
  constructor(type, value, line, col) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.col = col;
  }

  toString() {
    return `Token(${this.type}, ${this.value}, ${this.line}:${this.col})`;
  }
}

class Lexer {
  constructor(source) {
    this.source = source;
    this.pos = 0;
    this.line = 1;
    this.col = 1;
    this.tokens = [];
  }

  error(message) {
    throw new Error(`Lexer error at ${this.line}:${this.col}: ${message}`);
  }

  peek(offset = 0) {
    return this.source[this.pos + offset];
  }

  advance() {
    const char = this.source[this.pos];
    this.pos++;
    if (char === '\n') {
      this.line++;
      this.col = 1;
    } else {
      this.col++;
    }
    return char;
  }

  skipWhitespace() {
    while (this.peek() && /\s/.test(this.peek())) {
      this.advance();
    }
  }

  skipComment() {
    if (this.peek() === '/' && this.peek(1) === '/') {
      while (this.peek() && this.peek() !== '\n') {
        this.advance();
      }
      return true;
    }
    if (this.peek() === '/' && this.peek(1) === '*') {
      this.advance(); // /
      this.advance(); // *
      while (this.pos < this.source.length) {
        if (this.peek() === '*' && this.peek(1) === '/') {
          this.advance(); // *
          this.advance(); // /
          return true;
        }
        this.advance();
      }
      this.error('Unclosed block comment');
    }
    return false;
  }

  readIdentifier() {
    let result = '';
    while (this.peek() && /[a-zA-Z0-9_]/.test(this.peek())) {
      result += this.advance();
    }
    return result;
  }

  readNumber() {
    let result = '';
    while (this.peek() && /[0-9]/.test(this.peek())) {
      result += this.advance();
    }
    return result;
  }

  readString(quote) {
    this.advance(); // Skip opening quote
    let result = '';
    while (this.peek() && this.peek() !== quote) {
      if (this.peek() === '\\') {
        this.advance();
        const escaped = this.advance();
        result += escaped === 'n' ? '\n' : escaped === 't' ? '\t' : escaped;
      } else {
        result += this.advance();
      }
    }
    if (!this.peek()) {
      this.error('Unclosed string');
    }
    this.advance(); // Skip closing quote
    return result;
  }

  tokenize() {
    while (this.pos < this.source.length) {
      this.skipWhitespace();
      while (this.skipComment()) {
        this.skipWhitespace();
      }

      if (this.pos >= this.source.length) break;

      const startLine = this.line;
      const startCol = this.col;
      const char = this.peek();

      // Identifiers and keywords
      if (/[a-zA-Z_]/.test(char)) {
        const id = this.readIdentifier();
        const keywords = ['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR', 'ADD', 'SUB', 'MUL', 'DIV', 'MOD', 'LSHIFT', 'RSHIFT', 'NEGATE', 'output', 'test', 'input'];
        const type = keywords.includes(id) ? 'KEYWORD' : 'IDENTIFIER';
        this.tokens.push(new Token(type, id, startLine, startCol));
        continue;
      }

      // Numbers
      if (/[0-9]/.test(char)) {
        const num = this.readNumber();
        this.tokens.push(new Token('NUMBER', num, startLine, startCol));
        continue;
      }

      // Strings
      if (char === '"' || char === "'") {
        const str = this.readString(char);
        this.tokens.push(new Token('STRING', str, startLine, startCol));
        continue;
      }

      // Operators and punctuation
      if (char === '(' || char === ')' || char === '[' || char === ']' || char === '{' || char === '}') {
        this.advance();
        this.tokens.push(new Token(char, char, startLine, startCol));
        continue;
      }

      if (char === ',' || char === ';') {
        this.advance();
        this.tokens.push(new Token(char, char, startLine, startCol));
        continue;
      }

      if (char === ':') {
        this.advance();
        if (this.peek() === '=') {
          this.advance();
          this.tokens.push(new Token(':=', ':=', startLine, startCol));
        } else {
          this.tokens.push(new Token(':', ':', startLine, startCol));
        }
        continue;
      }

      if (char === '=') {
        this.advance();
        if (this.peek() === '>') {
          this.advance();
          this.tokens.push(new Token('=>', '=>', startLine, startCol));
        } else {
          this.tokens.push(new Token('=', '=', startLine, startCol));
        }
        continue;
      }

      if (char === '-' && this.peek(1) === '>') {
        this.advance();
        this.advance();
        this.tokens.push(new Token('->', '->', startLine, startCol));
        continue;
      }

      if (char === '-') {
        this.advance();
        this.tokens.push(new Token('-', '-', startLine, startCol));
        continue;
      }

      if (char === '+') {
        this.advance();
        this.tokens.push(new Token('+', '+', startLine, startCol));
        continue;
      }

      if (char === '*') {
        this.advance();
        this.tokens.push(new Token('*', '*', startLine, startCol));
        continue;
      }

      if (char === '/') {
        this.advance();
        this.tokens.push(new Token('/', '/', startLine, startCol));
        continue;
      }

      if (char === '.') {
        this.advance();
        this.tokens.push(new Token('.', '.', startLine, startCol));
        continue;
      }

      this.error(`Unexpected character: ${char}`);
    }

    this.tokens.push(new Token('EOF', null, this.line, this.col));
    return this.tokens;
  }
}

module.exports = { Lexer, Token };
