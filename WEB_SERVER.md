# CircuitLang Web Server

Live web interface for designing and simulating digital circuits in real-time.

## Features

- **Live Editor**: Write circuit code with real-time syntax validation
- **WebSocket Communication**: Instant feedback and results
- **Visual Tabs**: View outputs, tokens, AST, and circuit visualization
- **Example Library**: Load pre-built circuits for learning
- **Dark Theme**: Modern, easy-on-the-eyes interface
- **Responsive Design**: Works on desktop and tablets

## Getting Started

### Prerequisites
- Node.js 12+
- npm

### Installation

```bash
cd /Users/matteusmerrun/Desktop/dev--/circuit-lang
npm install
```

### Running the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### Development Mode

```bash
npm run dev
```

## Usage

### Web Interface

1. **Write Code**: Use the left editor panel to write circuit code
2. **Select Example**: Use the dropdown to load example circuits
3. **Run Simulation**: Click "Run" or press Ctrl+Enter (Cmd+Enter on Mac)
4. **View Results**: Check output in the Results panel with multiple tabs

### Tabs

- **Output**: Simulation results showing gate outputs and final results
- **Tokens**: Lexer tokens with line and column information
- **AST**: Abstract Syntax Tree representation
- **Circuit**: Visual representation of the circuit (basic visualization)

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Run simulation
- Tab navigation: Click tab buttons to switch views

## File Structure

```
public/
├── index.html      # Main web page
├── style.css       # Styling (dark theme)
└── script.js       # Client-side logic
```

## API

### REST Endpoints

#### GET `/api/examples`
Returns list of available example circuits.

**Response:**
```json
[
  {
    "name": "and_gate",
    "path": "/examples/and_gate.circuit"
  }
]
```

#### GET `/api/example/:name`
Returns content of a specific example.

**Response:**
```json
{
  "content": "and_gate: AND(A, B) -> (Q)\n..."
}
```

### WebSocket Protocol

#### Send
```json
{
  "type": "simulate",
  "code": "and_gate: AND(A, B) -> (Q)\noutput: and_gate.Q\ntest: A=1, B=1"
}
```

#### Receive
```json
{
  "type": "result",
  "success": true,
  "data": {
    "tokens": [...],
    "ast": {...},
    "simulation": {
      "inputs": {"A": 1, "B": 1},
      "gates": {"and_gate": {"Q": 1}},
      "outputs": [{"target": "and_gate.Q", "value": 1}]
    }
  }
}
```

## Example Circuit

```
// Half Adder Circuit
xor_gate: XOR(A, B) -> (Sum)
and_gate: AND(A, B) -> (Carry)

output: xor_gate.Sum
output: and_gate.Carry

test: A=1, B=1
```

## Features

### Real-Time Simulation
- Instant feedback as you type
- WebSocket-based communication
- No page reloads needed

### Visual Feedback
- Status indicator
- Gate count and output count
- Error highlighting
- Success/error states

### Example Library
Pre-loaded examples:
- `and_gate` - Simple AND gate
- `or_gate` - Simple OR gate  
- `xor_gate` - XOR gate
- `half_adder` - Half-adder circuit
- `multiplexer` - 2-to-1 multiplexer
- `4bit_calculator` - 4-bit calculator
- `simple_cpu` - Simple CPU design

## Customization

### Styling
Edit `public/style.css` to customize the appearance.

### Adding Examples
Place `.circuit` files in the `examples/` directory and restart the server.

### Default Code
Edit the `loadDefaultExample()` function in `public/script.js`.

## Performance

- Lightweight dependencies (Express + WebSocket)
- Efficient real-time communication
- Fast circuit simulation
- Responsive UI updates

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Use a different port
PORT=3001 npm start
```

### WebSocket connection fails
- Check browser console for errors
- Ensure server is running
- Check firewall settings

### Slow performance
- Clear browser cache
- Reduce circuit complexity
- Close other browser tabs

## Development

### Adding a New Tab

1. Add button to HTML
2. Add pane div
3. Update tab switching logic
4. Add display function in script.js

### Extending the API

Edit `server.js` to add new endpoints or WebSocket message types.

### Circuit Visualization

The circuit visualization in the Canvas tab can be enhanced by modifying the `drawCircuit()` function in `script.js`.

## Deployment

### Heroku

```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
git push heroku main
```

### Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## License

MIT License

## Support

For issues or feature requests, please open an issue on GitHub.

---

**Enjoy designing circuits with CircuitLang!** ⚡
