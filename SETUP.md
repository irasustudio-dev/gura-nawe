# GURA NAWE - Digital Marketplace

Modern, professional digital marketplace for buying and selling social media assets and digital services in Rwanda.

## 🚀 Features

- **Modern UI/UX**: Built with React 19, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Dark Mode**: Full dark mode support with automatic theme detection
- **High Performance**: Code splitting, lazy loading, optimized bundle
- **SEO Optimized**: Meta tags, structured data, Open Graph support
- **Error Handling**: Comprehensive error boundaries and recovery
- **Form Validation**: Zod schema validation with helpful error messages
- **Analytics**: Google Analytics 4 integration ready
- **Error Tracking**: Sentry integration for production monitoring
- **Accessibility**: WCAG 2.1 AA compliance

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd gura-nawe
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
```
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
VITE_SENTRY_DSN=your_sentry_dsn
VITE_APP_ENV=development
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

This generates an optimized production build in the `dist/` directory.

## 🧪 Preview Production Build

```bash
npm run preview
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## 🏗️ Project Structure

```
src/
├── components/
│   ├── home/           # Homepage components (Hero, ProductCard, ServiceCard)
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── shared/         # Shared components (ErrorBoundary, Loaders, etc.)
├── pages/              # Route pages (Home, Marketplace, Services, Contact, etc.)
├── context/            # React Context (ThemeContext)
├── utils/              # Utilities (validation, notifications, SEO, analytics, env)
├── data/               # Static data (marketplace.json)
├── App.tsx             # Main App component
├── main.tsx            # React DOM entry point
└── index.css           # Global styles

public/
└── (static assets)
```

## 🎨 Design System

### Colors
- Primary: Violet (`#7c3aed`)
- Success: Emerald (`#10b981`)
- Error: Red (`#ef4444`)
- Background: Slate (`#f1f5f9` light, `#0f172a` dark)

### Typography
- **Display**: Poppins (bold, headings)
- **Serif**: Inter (body, regular text)
- **Monospace**: Monaco (code)

## 🔒 Security

- Environment variables for sensitive data
- HTTPS enforced in production
- Content Security Policy (CSP) headers
- CORS configuration
- SQL injection protection (parameterized queries)

## 📊 Analytics

The application includes Google Analytics 4 integration. Events tracked:
- Page views
- Product views
- Add to cart actions
- Search queries
- Form submissions
- WhatsApp contact clicks

## 🚨 Error Tracking

Sentry integration for production error monitoring. Configure `VITE_SENTRY_DSN` to enable.

## 🌍 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Railway
```bash
npm install -g railway
railway link
railway up
```

### Docker
```bash
docker build -t gura-nawe .
docker run -p 3000:3000 gura-nawe
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guides.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 12+, Chrome Android)

## 🤝 API Integration

### WhatsApp Integration
The marketplace integrates with WhatsApp Web for contact:
```
https://wa.me/250722248567?text=Hello%20GURA%20NAWE
```

### Gemini AI (Optional)
Google Gemini AI integration is available in `.env.local`:
```
VITE_GEMINI_API_KEY=your_key
```

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- --port 3001
```

### Build errors
```bash
npm run clean
npm install
npm run build
```

### Missing dependencies
```bash
npm install
npm ci  # Clean install
```

## 📄 License

This project is proprietary. All rights reserved.

## 👥 Support

For support, contact us:
- **WhatsApp**: +250722248567
- **Email**: hello@guranawe.rw
- **Address**: Kigali, Rwanda

## 📈 Performance Targets

- **Lighthouse Score**: > 90 (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 150KB gzipped

## 🔄 Version History

### v1.0.0 - Initial Release
- Core marketplace functionality
- Product and service listing
- Contact form with validation
- Dark mode support
- Mobile responsive design
- SEO optimization
- Error boundaries and error handling
- Analytics integration

---

**Built with ❤️ by GURA NAWE Team**
