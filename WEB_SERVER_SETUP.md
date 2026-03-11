# 🌐 Web Server Integration Complete

CircuitLang now includes a full-featured web server with live IDE!

## What's New

### Web Server Files
- **server.js** - Express + WebSocket server
- **public/index.html** - Interactive web IDE
- **public/style.css** - Modern dark theme UI
- **public/script.js** - Real-time client logic
- **WEB_SERVER.md** - Complete web server documentation

### npm Scripts
```bash
npm start     # Run web server on http://localhost:3000
npm run dev   # Development mode
npm test      # Run tests
```

## Features

✨ **Live Editor**
- Syntax highlighting
- Real-time validation
- Multiple tabs for different views

⚡ **Real-Time Simulation**
- WebSocket-based communication
- Instant feedback
- No page reloads

📊 **Multiple Output Views**
- Output tab: Final results
- Tokens tab: Lexer output
- AST tab: Parse tree
- Circuit tab: Visual representation

🎨 **Beautiful UI**
- Dark theme (easy on the eyes)
- Responsive design
- Professional appearance

📚 **Example Library**
- Pre-built circuit examples
- One-click loading
- Perfect for learning

## Quick Start

```bash
cd /Users/matteusmerrun/Desktop/dev--/circuit-lang

# Install dependencies
npm install

# Start the web server
npm start

# Open browser to http://localhost:3000
```

## Architecture

```
CircuitLang Web Stack:
┌─────────────────────────────────┐
│   Browser (HTML/CSS/JS)        │
│  - Code Editor                  │
│  - Tab Navigation              │
│  - Circuit Visualization        │
└──────────────┬──────────────────┘
               │ WebSocket
┌──────────────▼──────────────────┐
│   Express Server (Node.js)      │
│  - HTTP endpoints               │
│  - WebSocket handler            │
│  - Example serving              │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│   CircuitLang Interpreter       │
│  - Lexer                        │
│  - Parser                       │
│  - Simulator                    │
└─────────────────────────────────┘
```

## File Structure

```
circuit-lang/
├── server.js                    # Web server
├── public/
│   ├── index.html              # Web IDE
│   ├── style.css               # Styling
│   └── script.js               # Client logic
├── WEB_SERVER.md               # Server docs
├── lexer.js                    # Core language
├── parser.js
├── simulator.js
└── ... (other files)
```

## Usage Examples

### In the Web IDE

1. Open http://localhost:3000
2. Write circuit code in editor
3. Click "Run" or press Ctrl+Enter
4. View results in multiple tabs
5. Load examples from dropdown

### Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Run simulation
- **Click tabs**: Switch views

## Dependencies

**Production:**
- express ^4.18.2 - Web server
- ws ^8.13.0 - WebSocket support

**Optional:**
- nodemon - Auto-reload during development

## Performance

- Lightweight stack
- Fast real-time communication
- Efficient circuit simulation
- Responsive UI updates

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Next Steps

1. ✅ Web server running
2. ✅ Live IDE available
3. ✅ Real-time simulation working
4. ⬜ Add more visualization features
5. ⬜ Deploy to cloud (Heroku, Vercel, etc.)

## Deployment

### Local Testing
```bash
npm start
open http://localhost:3000
```

### Production (Heroku example)
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
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### Port 3000 in use?
```bash
PORT=3001 npm start
```

### WebSocket not connecting?
- Check browser console (F12)
- Ensure server is running
- Check firewall settings

### Slow performance?
- Close other browser tabs
- Clear cache (Ctrl+Shift+Del)
- Reduce circuit complexity

## Features to Consider

- 🎨 Circuit diagram rendering
- 💾 Save/load circuits
- 📤 Export circuit images
- 🔗 Share circuit links
- 📱 Mobile app
- 🌍 Collaborative editing

## Status

✅ **Web server is running!**

Visit http://localhost:3000 to start designing circuits.

---

**Enjoy CircuitLang!** ⚡
