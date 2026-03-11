# 🚀 Deployment Guide for GitHub

Follow these steps to publish CircuitLang to GitHub.

## Prerequisites

- GitHub account
- Git installed locally
- Node.js 12+

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `circuitlang`
3. Description: "A text-based programming language for designing digital circuits"
4. Choose public (recommended for open source)
5. Click "Create repository"

## Step 2: Local Git Setup

```bash
cd /Users/matteusmerrun/Desktop/dev/circuit-lang

# Initialize git if needed
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CircuitLang v1.0.0

- Complete lexer, parser, and simulator
- Support for 15+ logic and arithmetic operations
- Comprehensive documentation and examples
- Full test suite with 23 tests
- Ready for production use"

# Add GitHub remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/circuitlang.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Configure GitHub Settings

1. Go to repository settings
2. **General**:
   - Description: "A text-based programming language for designing digital circuits"
   - Homepage: (optional)
   - Topics: `circuit`, `hardware`, `simulation`, `logic-gates`, `cpu`, `dsl`

3. **About**:
   - License: MIT (should auto-detect)

4. **Social preview** (optional):
   - Add custom preview image

## Step 4: Enable GitHub Features

### Actions (CI/CD)
- Already configured via `.github/workflows/test.yml`
- Automatically runs tests on push

### Pages (optional)
- Settings → Pages
- Choose deploy from: `main` branch
- Choose folder: `/ (root)`

### Discussions (optional)
- Settings → General → Discussions
- Enable for community engagement

## Step 5: Add Badges to README

Update README.md badges:
```markdown
![GitHub release](https://img.shields.io/github/release/USERNAME/circuitlang.svg)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/USERNAME/circuitlang/test.yml?branch=main)
![npm](https://img.shields.io/npm/v/circuitlang)
![GitHub](https://img.shields.io/github/license/USERNAME/circuitlang)
```

## Step 6: Publish to npm (Optional)

```bash
# Update package.json version if needed
npm version patch

# Login to npm (if not already logged in)
npm login

# Publish
npm publish

# Verify
npm search circuitlang
```

## Step 7: Create Release

1. Go to repository
2. Click "Releases" → "Draft a new release"
3. Tag version: `v1.0.0`
4. Release title: `CircuitLang v1.0.0 - Initial Release`
5. Description:
```
## Features
- Complete lexer, parser, and simulator
- 15+ logic and arithmetic operations
- CPU calculator and processor support
- Comprehensive documentation

## Installation
```bash
npm install circuitlang
```

## Quick Start
```bash
node main.js examples/and_gate.circuit
```

See README.md for full documentation.
```

6. Click "Publish release"

## Step 8: Share & Promote

- Twitter/X: Share release announcement
- Reddit: Post to relevant subreddits (r/learnprogramming, r/ECE, etc.)
- Dev.to: Write introductory article
- HackerNews: Share when ready

## Step 9: Ongoing Maintenance

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request on GitHub
# Merge after review
```

## Repository Structure for GitHub

```
circuitlang/
├── .github/
│   └── workflows/
│       └── test.yml              # CI/CD
├── examples/
│   ├── and_gate.circuit
│   ├── or_gate.circuit
│   ├── xor_gate.circuit
│   ├── half_adder.circuit
│   ├── multiplexer.circuit
│   ├── 4bit_calculator.circuit
│   └── simple_cpu.circuit
├── .gitignore
├── LICENSE
├── README.md
├── SYNTAX.md
├── TUTORIAL.md
├── ARCHITECTURE.md
├── API.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── PROJECT_SUMMARY.md
├── alu.js
├── lexer.js
├── parser.js
├── simulator.js
├── modules.js
├── main.js
├── test.js
└── package.json
```

## Verification Checklist

- [ ] Repository created on GitHub
- [ ] All files pushed
- [ ] CI/CD workflow runs successfully
- [ ] README displays correctly
- [ ] Examples are readable
- [ ] Tests pass on GitHub Actions
- [ ] License file visible
- [ ] Contributing guide accessible
- [ ] Documentation complete
- [ ] npm package published (optional)

## Support Links

- Issues: `/issues`
- Discussions: `/discussions`
- Security: `SECURITY.md` (optional)
- Code of Conduct: `CODE_OF_CONDUCT.md` (optional)

## Additional Resources

- [GitHub Documentation](https://docs.github.com)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules)
- [Open Source Guide](https://opensource.guide)

---

After following these steps, your CircuitLang project will be:
- ✅ Published on GitHub
- ✅ Open source (MIT license)
- ✅ Professionally documented
- ✅ Ready for contributions
- ✅ Available to the community
