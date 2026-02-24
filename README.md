# Mission Control 🎯

A unified dashboard for monitoring your entire operation.

🌐 **Live URL:** https://mission-control-lovat-rho.vercel.app

## Features

### 📊 Overview
- Real-time system health
- Key metrics at a glance
- Quick status of all systems

### 🚀 Projects
- All active projects with status
- Deployment health
- Progress tracking
- Quick links to live URLs & GitHub

### 📈 Trading
- Equity curve visualization
- Strategy performance metrics
- Win rate, drawdown, Sharpe ratio
- Active strategies list

### ⏰ Cron Jobs
- All 15 scheduled jobs
- Last run status
- Next scheduled run
- Health indicators

### 📝 Content
- Content calendar
- Draft queue
- Platform tracking (X/Twitter)
- Posting schedule

### 💰 Revenue
- MRR tracking
- Revenue goal progress ($5K target)
- Multiple revenue streams
- Conversion metrics

## Tech Stack

- Next.js 14 + TypeScript
- Tailwind CSS
- Recharts (charts)
- Lucide React (icons)
- Vercel (hosting)

## Data Sources

This dashboard aggregates data from:
- Trading backtest results (`/trading/`)
- Brain files (`/brain/`)
- Cron job status
- GitHub repos
- Content calendar

## Development

```bash
npm install
npm run dev
```

## Roadmap

- [x] MVP with all tabs
- [ ] Real-time data from APIs
- [ ] WebSocket updates
- [ ] Mobile app view
- [ ] Alerts & notifications
- [ ] Export reports

---

Part of the HoneyBot ecosystem 🤖
