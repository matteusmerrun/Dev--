/**
 * CircuitLang Web Interface - Client-side Script
 */

class CircuitLangClient {
    constructor() {
        this.ws = null;
        this.examples = [];
        this.init();
    }

    init() {
        this.setupWebSocket();
        this.setupEventListeners();
        this.loadExamples();
        this.loadDefaultExample();
    }

    setupWebSocket() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        this.ws = new WebSocket(`${protocol}//${window.location.host}`);

        this.ws.onopen = () => {
            this.updateStatus('Connected', 'success');
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'result') {
                this.handleResult(data);
            }
        };

        this.ws.onerror = (error) => {
            this.updateStatus('Connection error', 'error');
            console.error('WebSocket error:', error);
        };

        this.ws.onclose = () => {
            this.updateStatus('Disconnected', 'error');
        };
    }

    setupEventListeners() {
        document.getElementById('runBtn').addEventListener('click', () => this.run());
        document.getElementById('clearBtn').addEventListener('click', () => this.clear());
        document.getElementById('exampleSelect').addEventListener('change', (e) => this.loadExample(e.target.value));

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Keyboard shortcut
        document.getElementById('editor').addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                this.run();
            }
        });
    }

    async loadExamples() {
        try {
            const response = await fetch('/api/examples');
            this.examples = await response.json();
            this.populateExamples();
        } catch (error) {
            console.error('Failed to load examples:', error);
        }
    }

    populateExamples() {
        const select = document.getElementById('exampleSelect');
        this.examples.forEach(example => {
            const option = document.createElement('option');
            option.value = example.name;
            option.textContent = example.name.replace(/_/g, ' ');
            select.appendChild(option);
        });
    }

    loadDefaultExample() {
        const defaultCode = `// Simple AND Gate
and_gate: AND(A, B) -> (Q)
output: and_gate.Q

test: A=1, B=1`;
        document.getElementById('editor').value = defaultCode;
    }

    async loadExample(name) {
        if (!name) return;

        try {
            const response = await fetch(`/api/example/${name}`);
            const data = await response.json();
            document.getElementById('editor').value = data.content;
            this.run();
        } catch (error) {
            console.error('Failed to load example:', error);
        }
    }

    run() {
        const code = document.getElementById('editor').value;
        if (!code.trim()) {
            this.updateStatus('Please enter circuit code', 'error');
            return;
        }

        this.updateStatus('Running...', '');
        this.ws.send(JSON.stringify({
            type: 'simulate',
            code: code
        }));
    }

    clear() {
        document.getElementById('editor').value = '';
        document.getElementById('resultsOutput').innerHTML = '<p class="placeholder">Run your circuit to see results...</p>';
        document.getElementById('tokensOutput').innerHTML = '<p class="placeholder">Tokens will appear here...</p>';
        document.getElementById('astOutput').innerHTML = '<p class="placeholder">AST will appear here...</p>';
        this.updateStatus('Ready', '');
    }

    handleResult(data) {
        if (data.success) {
            this.displayResults(data.data);
            this.updateStatus('✓ Success', 'success');
        } else {
            this.displayError(data.error);
            this.updateStatus('✗ Error', 'error');
        }
    }

    displayResults(data) {
        // Display simulation results
        const resultsDiv = document.getElementById('resultsOutput');
        resultsDiv.innerHTML = '';

        if (data.simulation.outputs && data.simulation.outputs.length > 0) {
            resultsDiv.innerHTML += '<div style="margin-bottom: 1rem;"><strong>Outputs:</strong></div>';
            data.simulation.outputs.forEach(output => {
                const item = document.createElement('div');
                item.className = 'result-item success';
                item.textContent = `${output.target} = ${output.value}`;
                resultsDiv.appendChild(item);
            });
        }

        if (data.simulation.inputs && Object.keys(data.simulation.inputs).length > 0) {
            resultsDiv.innerHTML += '<div style="margin-top: 1rem; margin-bottom: 0.5rem;"><strong>Inputs:</strong></div>';
            Object.entries(data.simulation.inputs).forEach(([name, value]) => {
                const item = document.createElement('div');
                item.className = 'result-item';
                item.textContent = `${name} = ${value}`;
                resultsDiv.appendChild(item);
            });
        }

        if (data.simulation.gates && Object.keys(data.simulation.gates).length > 0) {
            resultsDiv.innerHTML += '<div style="margin-top: 1rem; margin-bottom: 0.5rem;"><strong>Gates:</strong></div>';
            Object.entries(data.simulation.gates).forEach(([name, outputs]) => {
                Object.entries(outputs).forEach(([pin, value]) => {
                    const item = document.createElement('div');
                    item.className = 'result-item';
                    item.textContent = `${name}.${pin} = ${value}`;
                    resultsDiv.appendChild(item);
                });
            });
        }

        // Display tokens
        this.displayTokens(data.tokens);

        // Display AST
        this.displayAST(data.ast);

        // Draw circuit
        this.drawCircuit(data.simulation);

        // Update stats
        this.updateStats(data);
    }

    displayTokens(tokens) {
        const tokensDiv = document.getElementById('tokensOutput');
        let html = '';
        tokens.forEach((token, index) => {
            html += `[${index}] ${token.type}: ${token.value} (${token.line}:${token.col})\n`;
        });
        tokensDiv.textContent = html || 'No tokens';
    }

    displayAST(ast) {
        const astDiv = document.getElementById('astOutput');
        astDiv.textContent = JSON.stringify(ast, null, 2);
    }

    drawCircuit(simulation) {
        const canvas = document.getElementById('circuitCanvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Clear canvas
        ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = 'rgba(51, 65, 85, 0.3)';
        ctx.lineWidth = 1;
        const gridSize = 20;
        for (let i = 0; i < canvas.width; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        // Draw gates
        let yOffset = 50;
        const gateSize = 40;
        const gateSpacing = 80;

        ctx.fillStyle = '#2563eb';
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 2;

        Object.entries(simulation.gates).forEach((entry, index) => {
            const [gateName, outputs] = entry;
            const x = 50 + (index % 3) * gateSpacing;
            const y = 50 + Math.floor(index / 3) * gateSpacing;

            // Draw gate box
            ctx.fillRect(x, y, gateSize, gateSize);
            ctx.strokeRect(x, y, gateSize, gateSize);

            // Draw gate label
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(gateName.substring(0, 8), x + gateSize / 2, y + gateSize / 2);

            // Draw output value
            ctx.fillStyle = '#10b981';
            ctx.font = '10px Arial';
            Object.entries(outputs).forEach((out, outIndex) => {
                ctx.fillText(`${out[0]}=${out[1]}`, x + gateSize / 2, y + gateSize + 15 + outIndex * 12);
            });
        });

        ctx.fillStyle = '#f1f5f9';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Circuit Visualization', 10, canvas.height - 10);
    }

    displayError(error) {
        const resultsDiv = document.getElementById('resultsOutput');
        const item = document.createElement('div');
        item.className = 'result-item error';
        item.textContent = `Error: ${error}`;
        resultsDiv.innerHTML = '';
        resultsDiv.appendChild(item);
    }

    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        // Remove active from buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(tabName).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    }

    updateStatus(message, type) {
        const statusEl = document.getElementById('status');
        statusEl.textContent = message;
        statusEl.className = type;
    }

    updateStats(data) {
        const gates = Object.keys(data.simulation.gates || {}).length;
        const outputs = data.simulation.outputs ? data.simulation.outputs.length : 0;
        document.getElementById('stats').innerHTML = `
            <span>Gates: ${gates}</span>
            <span>Outputs: ${outputs}</span>
        `;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new CircuitLangClient();
});
