# 🛒 KITTED
### Intelligent Perishable Recovery for Grocery Retailers

> Convert expiring inventory into profitable meal bundles before it hits the bin.

---

## The Problem

The US grocery industry has a waste crisis hiding in plain sight.

| Metric | Figure |
|---|---|
| Share of US food supply that goes unsold or uneaten | 31% |
| Surplus food that ends up in landfills | 85% |
| Annual food waste value (US) | $382 billion |
| Annual grocer loss to perishable shrink | $23 billion |
| Perishable inventory wasted *despite* markdowns | 35–40% |

Grocery stores lose billions every year because perishable ingredients don’t sell before they expire. Existing markdown tools lower prices, but they don’t create demand because shoppers don’t understand what to cook with discounted ingredients.

---

## The Solution

We turn expiring inventory into discounted meal bundles. Our software analyzes store inventory and automatically surfaces chef-curated recipes using at-risk ingredients in mobile apps or in-store, increasing sell-through without adding any extra work for store employees.
**KITTED** sits on top of existing inventory management systems and converts near-expiry perishables into purchase bundles shoppers actually want to buy.

> **Hypothesis:** A discount paired with a recipe is more likely to sell through than a discount alone.

### Core Experience Loop

```
Detect inventory approaching expiration
        ↓
Identify complementary in-stock items
        ↓
Generate bundles using approved recipes
        ↓
Price attractively as "Tonight's Special"
        ↓
Surface to shoppers in-store or via mobile app
```

Bundles are fulfilled through existing pickup and delivery workflows. No new operational overhead.

---

## Key Benefits

### For Retailers
- 💰 **Recover margin** from inventory that would otherwise be written off
- 📈 **Increase sell-through** of perishable inventory
- 🛍️ **Grow basket size** through recipe-driven, multi-item purchases
- ⚙️ **Low incremental cost** since bundles run through existing ERP/WMS infrastructure

### For Shoppers
- 🍽️ **Less meal-planning friction** -- dinner is already figured out
- 💸 **Attractive pricing** on fresh ingredients
- 📱 **Timely offers** surfaced where they already shop

---

## How It Works

KITTED integrates with your existing inventory management platform (SAP, Oracle Retail, or others) via API. It monitors SKU-level expiration data in real time, applies recipe-matching logic, and generates bundle offers pushed to whatever shopper-facing surface you already operate: mobile app, in-store signage, loyalty platform, etc.

No rip-and-replace. No new hardware. No retraining staff.

---

## MVP Scope

The initial release focuses on the core loop:

- [x] ERP/IMS integration for near-expiry SKU detection
- [x] Recipe-based complementary item matching
- [x] Dynamic bundle pricing engine
- [x] Offer generation ("Tonight's Special", "Today's Lunch Deal")
- [x] Push to existing mobile app or in-store display
- [ ] Shopper preference personalization *(future)*
- [ ] Prepared foods / deli department integration *(future)*
- [ ] Waste reduction reporting dashboard *(future)*

---

## Sources

- ReFED, *Insights Engine: US Food Waste*
- USDA Economic Research Service, *Food Loss and Waste*
- Food and Agriculture Organization (FAO), *Global Food Loss and Waste*

---

## Status

🚧 **Early Development.** Currently in the research and scoping phase. Interested in partnering or piloting? Open an issue or reach out directly.
