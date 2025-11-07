# 🎯 Bazu Sponsor Package Calculator

A slick, interactive web app for pitching sponsorship deals to brands during meetings. Built for Bazu, Hungary's leading media company.

## ✨ Features

- **Interactive Budget Slider** - 200K - 2M HUF range with smooth animations
- **Smart Package Recommendations** - Based on client budget and goals
- **Real-time Package Builder** - Toggle features on/off, see price updates instantly
- **Estimated Reach Calculator** - Show CPV and total reach for each package
- **PDF Export** - Professional proposal export with Bazu branding
- **Premium Design** - Dark mode with Bazu brand colors, Apple-style configurator vibes
- **Hungarian Language UI** - Optimized for Hungarian market

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `sponsor-baz` repository
4. Vercel will auto-detect the Vite configuration
5. Set **Root Directory** to: `bazu-sponsor-calculator`
6. Click **"Deploy"**
7. Done! You'll get a live URL like `bazu-sponsor-calculator.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to project directory
cd bazu-sponsor-calculator

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? bazu-sponsor-calculator
# - In which directory? ./
# - Override settings? No
```

For production deployment:
```bash
vercel --prod
```

## 📦 Package Structure

### Sponsorship Packages

- **Bronze (470K/month)**: 2 podcast episodes, 30-60s sponsor slot, description link, exclusivity
- **Silver (790K/month)**: 4 podcast episodes, 30-60s sponsor slot, description link, exclusivity
- **Gold (940K/month)**: 4 podcast episodes, 30-60s sponsor slot, end-roll slot, monthly Instagram story, description link, exclusivity
- **Custom**: Build-your-own package

### Reach Metrics

- Podcast: ~50k views per episode, 4 episodes/month
- TikTok: 300k avg views
- Instagram: 100k avg views

## 🛠 Tech Stack

- **React 19** + **TypeScript** - Modern React with full type safety
- **Vite** - Lightning-fast dev server and build tool
- **Tailwind CSS** - Utility-first styling with custom Bazu theme
- **Framer Motion** - Smooth, premium animations
- **jsPDF** - Client-side PDF generation

## 🎨 Design System

### Colors
- **Bazu Orange**: `#FF6B35`
- **Bazu Red**: `#E63946`
- **Bazu Dark**: `#0A0A0A`
- **Bazu Gray**: `#1A1A1A`

### Typography
- **Font**: Inter (400-900 weights)
- **Display**: Bold, large typography for impact
- **Gradient Text**: Orange-to-red gradient for key elements

## 📝 Development Notes

- All client-side (no backend needed)
- Optimized for laptop/tablet demos
- Mobile responsive but desktop-first design
- Hungarian currency formatting throughout

## 🤝 Contributing

Built with Claude Code for Bazu's sales team.

---

**Made with ❤️ for Bazu Media**
