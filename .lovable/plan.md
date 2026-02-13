

# Personal Trading Operating System — Implementation Plan

## Design System
- Pure black background (#000), white/light-gray text, no color accents
- Subtle glass panels: semi-transparent backgrounds with low opacity backdrop blur, sharp corners (no rounded edges)
- Monospace or clean sans-serif typography, text-first hierarchy
- No emojis, decorative graphics, or playful elements — strict command-terminal feel
- Minimal borders using very subtle white/gray at low opacity

---

## Pages & Features

### 1. Login & Onboarding
- Clean email/password login screen on black background
- Simple onboarding flow (3-4 steps): name, trading style, timezone, preferred alert channel
- All frontend-only for now with local state (Supabase auth to be added later)

### 2. Dashboard (Command Center)
- Central hub showing system status at a glance
- **Monitoring Status** — list of what the system is currently watching (pairs, sessions, conditions)
- **Recent Alerts** — text-based feed of recent alerts with timestamps and categories
- **System Status** — connection health indicators for WhatsApp, MT5, TradingView (connected/disconnected)
- No charts, no clutter — just clean text rows and status indicators

### 3. Connections
- Manage integrations: WhatsApp, MT5, TradingView
- Each integration shows: connection status, configuration fields (API keys, account IDs, webhook URLs), and a connect/disconnect action
- Config UI built now; real API logic deferred to backend phase
- WhatsApp: alert delivery channel config
- MT5: account credentials and server config for trade data
- TradingView: screenshot webhook/URL config

### 4. Trading Logic (Definitions)
- Select from predefined SMC/ICT concept definitions: MSS, BOS, Liquidity Sweeps, FVGs, Order Blocks
- Each concept has a dropdown to pick from 2-3 predefined definitions
- Optional free-text field for custom explanation, labeled "Experimental"
- Saved per user (local state for now)

### 5. Alerts & Monitoring
- Configure which pairs/instruments to monitor
- Set alert conditions and delivery preferences (WhatsApp, in-app)
- Manage active/paused monitoring rules

### 6. Execution & Risk Controls
- Set risk parameters: max risk per trade (%), max daily loss, max concurrent positions
- Position sizing preferences
- Execution rules (e.g., no trading during news, session restrictions)

### 7. Personal Trading Rules
- Free-form natural language rules that the trader writes for themselves
- Simple list interface: add, edit, delete rules
- Each rule is a text statement (e.g., "Never counter-trend on Monday")
- Rules are referenced in journal and analytics for adherence tracking

### 8. Trade Journal
- Auto-logged trade entries (mock data simulating MT5 import)
- Each entry: instrument, direction, entry/exit, P&L, duration
- Attach screenshots (file upload placeholder) and text notes
- Performance summary per trade and rolling stats
- Clean table/list view, no complex visualizations

### 9. Analytics (Behavior Focus)
- Rule adherence score: how often trades followed personal rules
- Session discipline: trading within defined hours
- Risk compliance: staying within set risk parameters
- Simple text-based metrics and minimal progress bars — no charts
- Weekly/monthly summary views

### 10. Settings
- Profile management (name, timezone, preferences)
- All configuration sections accessible from sidebar navigation
- Dark-only mode (no theme toggle needed)

---

## Navigation
- Left sidebar in command-terminal style with text labels and minimal icons
- Sections: Dashboard, Connections, Definitions, Alerts, Execution, Rules, Journal, Analytics, Settings
- Collapsible to icon-only mini sidebar

---

## Technical Notes
- All data stored in local state/mock data for this phase
- Component architecture designed for easy Supabase integration later
- Multi-user data isolation will be handled when backend is added

