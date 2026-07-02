# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React dashboard project built with Material UI. It implements a collapsible side navigation component (`Sidenav`) that serves as the main layout structure for the application.

## Core Components

### Sidenav (`src/Sidenav.jsx`)
A fully-featured side navigation component with:
- **Responsive collapse toggle** — Collapses to icon-only view when toggled
- **Hierarchical navigation items** — Supports single-level items, expandable groups with children, and up to 3-level nesting
- **Design token integration** — Uses tokens from `tokens/base.json` for colors and `tokens/typography.json` for typography
- **Interactive states**:
  - Active/selected: Light blue background (#eaf2fd) with primary text color (#003d78)
  - Hover: Semi-transparent primary overlay (#003d781a)
- **Bottom account section** — Pinned to bottom with account icon and menu button

**Color mapping from tokens:**
- Primary blue: `color.Primary.Solid.700` (#003d78)
- Selected background: `color.Primary.Solid.50` (#eaf2fd)
- Text primary: `color.Neutral.Solid.900` (#212121)
- Hover overlay: `color.Primary.Opacity.10` (#003d781a)

**Typography mapping from tokens:**
- Navigation items: `desktop.font.size.md` (16px, Roboto Regular)
- Sub-items: `desktop.font.size.sm` (14px, Roboto Regular)
- Group headers: 16px, Roboto Medium (500 weight)

## Development Setup

```bash
npm install
```

All dependencies are already configured in `package.json`:
- React 19
- Material UI (@mui/material, @mui/icons-material)
- Emotion (CSS-in-JS)
- Roboto font (imported via Google Fonts in `public/index.html`)

## Project Structure

```
src/
  ├── Sidenav.jsx      # Side navigation component (single file implementation)
  ├── App.jsx          # Application root component
  └── index.jsx        # React entry point

public/
  └── index.html       # HTML template with Roboto font import

tokens/
  ├── tokens.json      # High-level semantic tokens
  ├── base.json        # Base color and typography definitions
  └── typography.json  # Typography scales
```

## Design Tokens

The component references the following tokens from `tokens/base.json`:
- **Colors**: Primary blue palette (50–900), Neutral grays, White
- **Type scales**: 8–56px font sizes
- **Font families**: Roboto, Space Grotesk

See the token files for comprehensive design system documentation.

## Navigation Item Configuration

The navigation structure is defined in `Sidenav.jsx` as a `navItems` array. Items support:
- `type: 'group'` — Non-interactive section header
- `type: 'item'` — Clickable navigation item with icon
- `type: 'expandable'` — Collapsible container with `children` array

Example:
```javascript
{
  id: 'expandable1',
  label: 'Lorem Ipsum',
  icon: Folder,
  type: 'expandable',
  children: [
    { id: 'sub1', label: 'Lorem Ipsum' },
    {
      id: 'sub2',
      label: 'Lorem Ipsum',
      type: 'expandable',
      children: [/* nested children */],
    },
  ],
}
```

## Dev Server

To run a local dev server (requires a build tool like Vite):
```bash
npm install -D vite @vitejs/plugin-react
```

Then add to `package.json`:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build"
}
```

The app expects the HTML file at `public/index.html` and React entry at `src/index.jsx`.
