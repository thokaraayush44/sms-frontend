# Naming Convention Guide - SMS Frontend

## Overview
This document outlines the standardized naming conventions for the SMS Frontend project to ensure Linux compatibility and follow JavaScript/React best practices.

## Directory Naming

### ✅ Use lowercase for all directories
```
✅ pages/
✅ components/
✅ common/
✅ charts/
✅ forms/
✅ tables/
✅ services/
✅ utils/
✅ context/
✅ assets/
```

### ❌ Avoid PascalCase for directories
```
❌ Pages/
❌ Common/
❌ Components/
```

## File Naming

### React Components (`.jsx` files)
**Use PascalCase** - Each word capitalized, no separators
```
✅ Login.jsx
✅ Dashboard.jsx
✅ StudentForm.jsx
✅ DataTable.jsx
✅ Alert.jsx
```

### Utility/Service Files (`.js` files)
**Use lowercase with hyphens** (kebab-case)
```
✅ api.js
✅ store.js
✅ helpers.js
✅ auth-utils.js (if multi-word)
```

### Style Files (`.css` files)
**Use lowercase or match component name**
```
✅ index.css
✅ App.css
✅ styles.css
```

## Import Statements

### ✅ Correct Examples
```javascript
// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Common Components
import Alert from './components/common/Alert';
import Modal from './components/common/Modal';

// Services
import { studentsAPI } from './services/api';

// Utils
import { formatDate } from './utils/helpers';
```

### ❌ Incorrect Examples
```javascript
// Wrong - uppercase folder names
import Login from './Pages/Login';
import Alert from './components/Common/Alert';
import { studentsAPI } from './services/API';
```

## Why These Conventions?

### 1. **Linux Compatibility** 🐧
- Linux file systems are case-sensitive
- `pages/` and `Pages/` are different directories on Linux
- Lowercase ensures consistency across all platforms

### 2. **Industry Standards** 📚
- Follows React and JavaScript community conventions
- Matches popular projects (Next.js, Create React App, etc.)
- Easier for new developers to understand

### 3. **Avoid Confusion** 🎯
- Clear distinction between components (PascalCase) and utilities (lowercase)
- Predictable import paths
- Reduces cognitive load

## Quick Reference

| Type | Convention | Example |
|------|-----------|---------|
| Folders | lowercase | `pages/`, `common/` |
| React Components | PascalCase | `Login.jsx`, `Alert.jsx` |
| Services/Utils | lowercase + hyphens | `api.js`, `helpers.js` |
| CSS Files | lowercase | `index.css`, `app.css` |

## Migration Checklist

When adding new files/folders:

- [ ] Is it a folder? → Use lowercase
- [ ] Is it a React component? → Use PascalCase for filename
- [ ] Is it a utility/service? → Use lowercase with hyphens
- [ ] Update all import statements to match
- [ ] Test on Linux/WSL if possible

## Common Mistakes to Avoid

1. ❌ Creating `Components/` instead of `components/`
2. ❌ Creating `API.js` instead of `api.js`
3. ❌ Mixing cases in import paths
4. ❌ Using spaces in file/folder names
5. ❌ Using uppercase for utility files

## Tools to Help

### ESLint Rules (Optional)
Consider adding these rules to catch naming issues:

```json
{
  "rules": {
    "import/no-unresolved": "error"
  }
}
```

### VS Code Settings
Enable case-sensitive file watching:
```json
{
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true
  }
}
```

---

**Last Updated**: February 1, 2026  
**Status**: Active Standard for SMS Frontend Project
