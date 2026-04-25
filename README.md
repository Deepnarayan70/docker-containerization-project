# Startup Funding Tracker

A production-ready web application to track startup funding trends powered by Firecrawl API. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Startup Funding Tracker](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🔍 **Real-time search** for startup funding data using Firecrawl API
- 📊 **Interactive trend charts** and comprehensive metrics dashboard
- 🎯 **Advanced filters** by time period (today, this week, this month)
- 🏷️ **Category filters** (AI, Fintech, HealthTech, and more)
- 💰 **Auto-extraction** of funding amounts, round types, and contact information
- 🌍 **Global coverage** of funding news from multiple sources
- 📈 **AI-powered insights** and funding trend summaries
- 💳 **API cost control** with configurable result limits (10/50/100 results)
- 🎨 **Beautiful UI** inspired by Firecrawl's design language
- ⚡ **Production-ready** with full TypeScript support and error handling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Firecrawl API key ([Get one here](https://firecrawl.dev))

### Installation

1. **Clone and install dependencies:**
```bash
cd "c:\Users\Bhanu Partap\Downloads\FireCrawl"
npm install
```

2. **Set up environment variables:**
```bash
# Copy the example env file
cp .env.example .env.local

# Edit .env.local and add your Firecrawl API key
# FIRECRAWL_API_KEY=fc-your-api-key-here
```

**⚠️ CRITICAL SECURITY WARNING:**
- **NEVER** commit `.env.local` to Git - it contains your private API key
- **NEVER** share your API key in screenshots, chat, or public repos
- The `.env.local` file is already in `.gitignore` to prevent accidental commits
- See [SECURITY.md](../SECURITY.md) for complete security guidelines

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📋 Project Structure

```
FireCrawl/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts          # Firecrawl API integration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── components/
│   ├── MetricsDisplay.tsx        # Trend metrics cards
│   ├── SearchBar.tsx             # Search and filter interface
│   ├── SummarySection.tsx        # Results and insights
│   └── TrendChart.tsx            # Interactive chart
├── types/
│   └── index.ts                  # TypeScript type definitions
├── .env.local                    # Environment variables (not in git)
├── .env.example                  # Example environment file
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#f97316` - Main accent color (buttons, highlights)
- **Neutral Gray**: `#fafafa` - Background color
- **White**: `#ffffff` - Card backgrounds
- **Text Primary**: `#171717` - Main text
- **Text Secondary**: `#737373` - Secondary text

### Components
- Clean card-based layout with subtle shadows
- Orange CTA buttons with hover effects
- Responsive grid system
- Smooth transitions and animations

## 🔧 Configuration

### Result Limits
Control API costs by selecting result limits:
- **10 results** (2 credits) - Quick searches
- **50 results** (10 credits) - Medium datasets
- **100 results** (20 credits) - Comprehensive analysis

### Time Filters
- **Today** - Past 24 hours
- **This Week** - Past 7 days
- **This Month** - Past 30 days

### Categories
AI & Machine Learning, Finance & Fintech, Healthcare & Biotech, E-commerce & Retail, SaaS & Enterprise, Crypto & Web3, Climate & Clean Energy, Education Technology

## 🔍 How It Works

1. **User enters search query** with filters (category, time period, result limit)
2. **API constructs search query** combining user input with funding-related keywords
3. **Firecrawl API searches** web and news sources for relevant articles
4. **Content is scraped** and parsed to extract funding details:
   - Funding amounts ($5M, $2.5B, etc.)
   - Round types (Series A/B/C, Seed, Angel)
   - Company names and contact information
   - Website links
5. **Results are displayed** with metrics, charts, and detailed cards
6. **AI-generated insights** provide context and trends

## 📊 Data Extraction

The app uses advanced regex patterns to extract:
- **Funding Amounts**: `$5 million`, `$2.5B`, `raised $10M`
- **Round Types**: `Series A`, `seed round`, `pre-seed`
- **Email Addresses**: Standard email format validation
- **Company Names**: Extracted from article titles
- **Dates**: When funding was announced

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add your `FIRECRAWL_API_KEY` in the Vercel dashboard under Environment Variables.

### Other Platforms
The app can be deployed to any Node.js hosting platform:
- Netlify
- Railway
- Render
- AWS Amplify
- DigitalOcean App Platform

## � Security (IMPORTANT!)

### Before Pushing to GitHub

**Run the security check script:**
```powershell
# Windows PowerShell
.\security-check.ps1

# Or manually check
git status
# Verify .env.local is NOT in the list
```

### Security Checklist

✅ **Protected files (never commit these):**
- `.env.local` - Contains your private API key
- `.env` - Any environment file with real credentials
- `*.key`, `*.pem` - Certificate files
- `secrets.json` - Any file with credentials

✅ **What IS safe to commit:**
- `.env.example` - Template with placeholder values only
- All source code (`.ts`, `.tsx`, `.js` files)
- Configuration files (`next.config.js`, `tailwind.config.js`)
- Documentation files

### If You Accidentally Commit Secrets

1. **Remove from Git immediately:**
   ```bash
   git rm --cached .env.local
   git commit -m "Remove sensitive file"
   ```

2. **Rotate your API key IMMEDIATELY:**
   - Go to https://firecrawl.dev/app
   - Revoke the exposed key
   - Generate a new key
   - Update `.env.local` with new key

3. **Update all deployments** with the new key

📖 **Read [SECURITY.md](../SECURITY.md) for complete security guidelines**

## �🛡️ Production Features

✅ **TypeScript** - Full type safety across the application  
✅ **Error Handling** - Comprehensive error boundaries and user feedback  
✅ **Loading States** - Skeleton screens and loading indicators  
✅ **Responsive Design** - Mobile, tablet, and desktop optimized  
✅ **Environment Variables** - Secure API key management  
✅ **Build Optimization** - Code splitting and tree shaking  
✅ **SEO Ready** - Proper meta tags and semantic HTML  

## 📈 API Cost Optimization

- Configurable result limits to control API usage
- Clear credit cost display (2 credits per 10 results)
- Cached results to avoid redundant searches (coming soon)
- Efficient data extraction minimizes scraping needs

## 🐛 Troubleshooting

### Build Errors
```bash
# Clean build cache
rm -rf .next
npm run build
```

### Type Errors
```bash
# Check TypeScript errors
npx tsc --noEmit
```

### API Errors
- Verify your Firecrawl API key is correct
- Check API rate limits and credit balance
- Ensure internet connectivity

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
## ScreenShots

## 🔗 Links
<img width="1552" height="865" alt="ass_1" src="https://github.com/user-attachments/assets/e1e05273-fe43-4922-8753-19eb620e884d" />
<img width="1351" height="223" alt="ass_2" src="https://github.com/user-attachments/assets/4c8589a3-6fe0-4e83-99c6-e9fb057f568b" />
<img width="1182" height="565" alt="ass_3" src="https://github.com/user-attachments/assets/ac484391-2363-47b1-87ef-59e236ddfa43" />

- [Firecrawl Documentation](https://docs.firecrawl.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check Firecrawl documentation
- Review Next.js troubleshooting guide

---

Built with ❤️ using Firecrawl API
