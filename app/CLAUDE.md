# Kitted Demo — Project Instructions

## What This Is
A non-production demo of Kitted, a perishable inventory optimization tool for
grocery stores. Built to pitch to startup founders. See kitted-demo-requirements.md
for full specs.

## Rules
- All data is hardcoded in /src/mockData.js — never add a backend or API calls
- Do not add authentication or login of any kind
- Ask before installing any dependencies not listed in the requirements doc
- Do not simplify the design — this needs to look like a real product
- Always use `formatCurrency(value, decimals?)` from `src/utils/format.js` for currency display — never inline toLocaleString with currency options
- Wrap expensive derived values (reduces, sorts, cross-referencing inventory/bundles) in useMemo

## Stack
- React + Vite 8.x
- Tailwind CSS
- Recharts for charts
- Lucide React for icons
- React Router for navigation

## Design
- Manager view: white header, white content panels, dark navy (#0f172a) accents, green (#16a34a) for positive/recovery signals, B2B SaaS tone
- Header: Wegmans "W" logo + store name/number on left, search bar center, bell/settings icons + manager name + avatar on right, subtle pill-style view toggle far right
- Shopper view: warm/consumer-friendly, phone frame mockup, amber accents
- No purple gradients, no Inter font, no generic AI design patterns
- Card style: white background, 12px border radius, 1px #e2e8f0 border — used consistently across all panels
- Right sidebar (BundlePanel): position sticky, max-height: calc(100vh - 108px) so it never exceeds left column height; cards scroll internally via flex: 1 + overflow-y: auto

## State Management Patterns
- **Simple independent state** (tab selection, cart items): use `useState`
- **Related filter state with multiple transitions**: use `useReducer` — see `ShopperView.jsx` for the pattern. Define an `INITIAL` const, a `reducer` function with named action types, and dispatch everywhere. Never add a new filter useState; extend the reducer instead.
- **Expensive derived values** (reduces, sorts, cross-referencing): wrap in `useMemo`

## Error Handling
- `src/components/ErrorBoundary.jsx` wraps `<App>` in `main.jsx` — any unhandled render error shows a recovery screen instead of a blank page
- Do not remove the ErrorBoundary wrapper in main.jsx

## Security Patterns
- CSP is set via `<meta http-equiv="Content-Security-Policy">` in `index.html` — if you add new external resource origins (fonts, CDNs, APIs), update the CSP to whitelist them
- Google Fonts are loaded via `<link rel="stylesheet">` in `index.html` with `<link rel="preconnect">` hints — do not move them back to a CSS `@import`
- Never hardcode API keys in project files; use environment variables

## Component Map
- `src/views/ManagerDashboard.jsx` — page layout, all KPI calculations (single reduce pass over bundles)
- `src/views/ShopperView.jsx` — phone frame mockup; filter state managed via `filterReducer` / `useReducer`
- `src/components/KPIStrip.jsx` — 3 KPI cards (label top-left, icon top-right, value, pill badge)
- `src/components/InventoryPanel.jsx` — scrollable at-risk table with working severity/shrink-value sort
- `src/components/BundlePanel.jsx` — dark green header, bundle cards with 3-col pricing, sticky sidebar
- `src/components/ShrinkChart.jsx` — stacked bar chart (recovered/unrecovered), efficiency peak metric
- `src/components/InsightCallout.jsx` — dynamic insight card; shows coverage gap (red) if unbundled SKU expiring ≤2 days, otherwise ingredient pull-through (green)
- `src/components/ErrorBoundary.jsx` — class component crash boundary; wraps entire app
- `src/utils/format.js` — shared formatCurrency utility

## When Something Is Unclear
Ask before building. Do not make assumptions on layout or data structure.
