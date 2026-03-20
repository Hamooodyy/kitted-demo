# Kitted Demo — Requirements Document for Claude Code

## Purpose

Build a non-production interactive demo of Kitted — a perishable inventory optimization tool for grocery stores. This demo is for pitching to startup founders and technical partners. The goal is to make the core value proposition tangible and walkable, not to simulate a production system. Every screen should communicate one of two things: "here's the problem" or "here's what Kitted does about it."

---

## Tech Stack

- **Framework:** React (Vite scaffold preferred)
- **Styling:** Tailwind CSS
- **Data:** All hardcoded in a single `mockData.js` file — no backend, no API calls, no database
- **Routing:** React Router for view switching between the two main perspectives
- **Charts:** Recharts for any data visualizations
- **Icons:** Lucide React

The app must run with `npm install && npm run dev`. No environment variables required.

---

## Application Structure

The demo has two distinct views, selectable from a top-level navigation bar. Think of it as two tabs:

1. **Manager View** — the store ops/inventory dashboard
2. **Shopper View** — a mobile-style shopper-facing interface showing Tonight's Specials

A persistent top nav shows the Kitted logo, the two view tabs, and a small "Demo Mode" badge so it's always clear this is a prototype.

---

## View 1: Manager Dashboard

This is the internal-facing side of Kitted. It shows a store manager what the system has detected and what it recommends doing about it. It should feel like a SaaS ops dashboard — clean, data-dense, and action-oriented.

### 1A. At-Risk Inventory Panel

Display a table or card grid of SKUs that are approaching expiration. Each item should show:

- SKU name (e.g., "Boneless Chicken Breast", "Roma Tomatoes", "Corn Tortillas")
- Current quantity on hand
- Expiration date
- Days until expiration (highlight items ≤ 3 days in red, 4–6 days in yellow)
- Estimated shrink loss if unsold (quantity × cost per unit, formatted as a dollar amount)
- A status badge: `At Risk`, `Expiring Soon`, or `Critical`

Seed the mock data with at least 10–12 SKUs across produce, protein, and dairy categories to make the problem feel real. Include a mix of urgency levels.

At the top of this panel, show a summary strip with three KPI cards:
- Total estimated shrink exposure today (sum of all at-risk items' shrink value)
- Number of SKUs at risk
- Estimated recovery if all recommended bundles sell through

### 1B. Bundle Recommendations Panel

Below or alongside the inventory panel, show the bundles Kitted has generated from the at-risk inventory. Each bundle card should display:

- Bundle name (e.g., "Chicken Fajita Kit", "Caprese Salad Kit", "Breakfast Scramble Kit")
- "Tonight Only" or "Today's Lunch" label
- List of included ingredients, with quantities
- Serves X people
- Suggested bundle price
- Original value of ingredients at retail (so the margin story is visible)
- Estimated margin recovery vs. writing the ingredients off
- A `Push to App` button (non-functional — it just changes to a green "Live" state on click to simulate publishing)

Show at least 4–5 bundles. Each bundle should use at least 2–3 of the at-risk SKUs from the inventory panel above. Visually connect them — either with a highlighted row in the inventory table or a small ingredient tag on the bundle card.

### 1C. Shrink Trend Chart

A simple bar or area chart showing the last 7 days of estimated daily shrink loss (hardcoded values). Add a second line or bar showing projected recovery with Kitted active. This visualizes the before/after story — even with fake data, the shape of the chart should make the pitch clear.

Label the Y-axis in dollars. Keep it simple — this is a proof-of-concept, not a financial model.

---

## View 2: Shopper Mobile View

This view simulates what a shopper would see inside the grocery store's existing mobile app (e.g., a Wegmans or Kroger app). It should be rendered as a phone-frame mockup centered on the screen — a narrow, tall container styled to look like a mobile UI, with rounded corners and a subtle device bezel. The rest of the screen can be a neutral background.

This is the consumer-facing proof that the bundles actually reach shoppers.

### 2A. Tonight's Specials Feed

A vertical scrollable card feed inside the phone frame. Show 4–5 bundle offer cards. Each card includes:

- A bold banner: "Tonight Only" or "Today's Lunch Deal" (use color to differentiate)
- Bundle name
- Short description (one sentence, e.g., "Everything you need for a weeknight fajita dinner")
- Price badge (e.g., "$10")
- Serves X
- A visual ingredient list using small pill/tag components
- An `Add to Cart` button — clicking it should toggle to a green `Added ✓` state
- A countdown timer displayed as a static label (e.g., "Expires in 4 hrs") — does not need to tick

The cards should feel like something you'd actually see in a grocery app — approachable, food-forward, and deal-oriented. Not clinical.

### 2B. Cart Summary (Optional but recommended)

At the bottom of the phone frame, show a sticky cart bar that updates as the user taps `Add to Cart`. Display item count and total price. Keep it minimal — just enough to make the interaction feel real.

---

## Mock Data Specifications

All data lives in `/src/mockData.js`. Structure it as named exports:

- `atRiskInventory` — array of SKU objects
- `bundleRecommendations` — array of bundle objects, each referencing SKU IDs from the inventory array
- `shrinkTrendData` — array of 7 daily data points `{ date, shrinkLoss, kittedRecovery }`
- `storeInfo` — store name, location, manager name (use "Wegmans – Reston, VA" to make the demo feel grounded)

---

## Design Direction

The manager dashboard should feel like a modern B2B SaaS tool — think a tone between Linear and a grocery ERP. Dark header, white content area, green as the primary accent color (recovery = green). Use a slightly editorial sans-serif for headings.

The shopper view should contrast sharply — warmer, more consumer-friendly. Use a cream or off-white background inside the phone frame, amber/orange accents for deal badges, bold food-forward typography. It should feel like a real mobile grocery app, not a dashboard.

The tonal contrast between the two views reinforces the two-sided nature of the platform — Kitted serves both the operator and the end customer.

Avoid generic AI design patterns: no purple gradients, no system fonts, no cookie-cutter card layouts. Make it look like someone actually designed this product.

---

## Demo Flow (How a Pitch Should Walk Through This)

Claude Code should be aware that this is meant to be walked through in sequence during a live pitch. The intended narrative:

1. Open Manager Dashboard → "Here's what a store manager sees. Today, this store has $X,XXX of perishable inventory at risk of being thrown away."
2. Scroll to Bundle Recommendations → "Instead of marking down chicken breast by 40%, Kitted bundles it into a Fajita Kit. The store sells it at $10, recovers margin, and the customer skips the meal planning step entirely."
3. Click `Push to App` on a bundle → "With one click, that offer goes live."
4. Switch to Shopper View → "And here's what the shopper sees in their grocery app — a deal, a recipe, a complete dinner. No thinking required."
5. Tap `Add to Cart` → "The shopper buys it. The store sells what it would have thrown away."

This arc should feel natural when demoing. The UI should support it — nothing should require explanation to understand.

---

## Out of Scope

The following are explicitly excluded from this demo. Do not build them:

- Any real backend, database, or API integration
- Authentication or login
- Actual ERP or inventory system connectivity (SAP, Oracle Retail, etc.)
- Push notification functionality
- Real payment or cart flow
- Admin settings, user management, or multi-store views
- Any AI-generated content at runtime

---

## Deliverables

- A working React app scaffolded with Vite
- All source in a single `/kitted-demo` project directory
- Runs on `localhost:5173` with `npm run dev`
- No broken states, no console errors on initial load
- All interactive elements (Push to App, Add to Cart) provide visual feedback on click
