// Simple ALU (Arithmetic Logic Unit) for CPU calculator

/*
ALU: Takes two 8-bit operands and a 4-bit opcode
Outputs 8-bit result and status flags

Opcodes:
0000 = ADD
0001 = SUB
0010 = AND
0011 = OR
0100 = XOR
0101 = NOT A
0110 = NAND
0111 = NOR
1000 = LSHIFT
1001 = RSHIFT
1010 = MUL
1011 = DIV
1100 = MOD
1101 = NEGATE
1110 = Increment
1111 = Decrement
*/

class ALU {
  constructor() {
    this.lastResult = 0;
    this.zeroFlag = false;  // Set if result is 0
    this.carryFlag = false; // Set if overflow
    this.negFlag = false;   // Set if result is negative
  }

  execute(opcode, a, b) {
    let result = 0;

    switch (opcode) {
      case 0x0: // ADD
        result = (a + b) & 0xFF;
        this.carryFlag = (a + b) > 0xFF;
        break;
      case 0x1: // SUB
        result = (a - b) & 0xFF;
        this.carryFlag = a < b;
        break;
      case 0x2: // AND
        result = a & b;
        break;
      case 0x3: // OR
        result = a | b;
        break;
      case 0x4: // XOR
        result = a ^ b;
        break;
      case 0x5: // NOT A
        result = (~a) & 0xFF;
        break;
      case 0x6: // NAND
        result = (~(a & b)) & 0xFF;
        break;
      case 0x7: // NOR
        result = (~(a | b)) & 0xFF;
        break;
      case 0x8: // LSHIFT
        result = (a << 1) & 0xFF;
        this.carryFlag = (a & 0x80) !== 0;
        break;
      case 0x9: // RSHIFT
        result = (a >> 1) & 0xFF;
        this.carryFlag = (a & 0x01) !== 0;
        break;
      case 0xA: // MUL
        result = (a * b) & 0xFF;
        this.carryFlag = (a * b) > 0xFF;
        break;
      case 0xB: // DIV
        result = b !== 0 ? Math.floor(a / b) : 0;
        break;
      case 0xC: // MOD
        result = b !== 0 ? a % b : 0;
        break;
      case 0xD: // NEGATE
        result = (-a) & 0xFF;
        break;
      case 0xE: // INCREMENT
        result = (a + 1) & 0xFF;
        this.carryFlag = a === 0xFF;
        break;
      case 0xF: // DECREMENT
        result = (a - 1) & 0xFF;
        this.carryFlag = a === 0;
        break;
      default:
        result = 0;
    }

    // Set flags
    this.lastResult = result;
    this.zeroFlag = result === 0;
    this.negFlag = (result & 0x80) !== 0; // MSB indicates negative

    return result;
  }

  getFlags() {
    return {
      result: this.lastResult,
      zero: this.zeroFlag,
      carry: this.carryFlag,
      negative: this.negFlag
    };
  }
}

module.exports = { ALU };
