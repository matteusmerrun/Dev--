/**
 * CircuitLang Web Server
 * Express.js server with WebSocket support for live circuit simulation
 */

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const { Lexer } = require('./lexer');
const { Parser } = require('./parser');
const { Simulator } = require('./simulator');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/examples', (req, res) => {
  const fs = require('fs');
  const examplesDir = path.join(__dirname, 'examples');
  const examples = fs.readdirSync(examplesDir)
    .filter(file => file.endsWith('.circuit'))
    .map(file => ({
      name: file.replace('.circuit', ''),
      path: `/examples/${file}`
    }));
  res.json(examples);
});

app.get('/api/example/:name', (req, res) => {
  const fs = require('fs');
  const filePath = path.join(__dirname, 'examples', `${req.params.name}.circuit`);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ content });
  } else {
    res.status(404).json({ error: 'Example not found' });
  }
});

// WebSocket handling
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'simulate') {
        const result = simulateCircuit(data.code);
        ws.send(JSON.stringify({
          type: 'result',
          success: true,
          data: result
        }));
      }
    } catch (error) {
      ws.send(JSON.stringify({
        type: 'result',
        success: false,
        error: error.message
      }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

function simulateCircuit(code) {
  try {
    const tokens = new Lexer(code).tokenize();
    const ast = new Parser(tokens).parse();
    const result = new Simulator(ast).simulate();
    
    return {
      tokens: tokens.filter(t => t.type !== 'EOF').map(t => ({
        type: t.type,
        value: t.value,
        line: t.line,
        col: t.col
      })),
      ast: ast,
      simulation: result
    };
  } catch (error) {
    throw new Error(`Simulation error: ${error.message}`);
  }
}

// Start server
server.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════╗`);
  console.log(`║   CircuitLang Live Server v1.0.0      ║`);
  console.log(`║   🚀 Running on http://localhost:${PORT}      ║`);
  console.log(`║   📝 Open browser to start designing   ║`);
  console.log(`╚════════════════════════════════════════╝\n`);
});

module.exports = { app, server, wss };
