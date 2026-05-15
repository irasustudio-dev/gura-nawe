# GURA NAWE - Deployment Guide

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run lint` - No TypeScript errors
- [ ] Run `npm run build` - Build completes successfully
- [ ] Check console for warnings in dev mode
- [ ] All environment variables configured
- [ ] No console errors or warnings in production build

### Testing
- [ ] Contact form validation works
- [ ] Dark mode toggle works across all pages
- [ ] Mobile responsive on all breakpoints
- [ ] Lighthouse audit score > 90
- [ ] All links and routing work
- [ ] WhatsApp integration functional

### SEO & Metadata
- [ ] Meta tags populated on all pages
- [ ] Open Graph tags configured
- [ ] Favicon configured
- [ ] robots.txt created
- [ ] sitemap.xml generated

### Security
- [ ] No secrets in code
- [ ] Environment variables used correctly
- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] CORS configured properly

### Performance
- [ ] Bundle size optimized
- [ ] Images optimized and lazy loaded
- [ ] Unnecessary dependencies removed
- [ ] Code splitting implemented
- [ ] Caching strategy defined

## 🚀 Deployment Platforms

### 1. Vercel (Recommended for Next.js & React)

#### Setup
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Configuration File (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_GEMINI_API_KEY": "@gemini_api_key",
    "VITE_GOOGLE_ANALYTICS_ID": "@analytics_id",
    "VITE_SENTRY_DSN": "@sentry_dsn",
    "VITE_APP_ENV": "production"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Environment Variables (Vercel Dashboard)
1. Go to Settings → Environment Variables
2. Add each variable:
   - `VITE_GEMINI_API_KEY`
   - `VITE_GOOGLE_ANALYTICS_ID`
   - `VITE_SENTRY_DSN`
   - `VITE_APP_ENV=production`

#### Deploy
```bash
vercel --prod
```

---

### 2. Railway

#### Setup
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link existing project
railway link
```

#### Configuration File (`railway.json`)
```json
{
  "buildCommand": "npm run build",
  "startCommand": "npm run preview",
  "enviromentVariables": {
    "VITE_GEMINI_API_KEY": "$GEMINI_API_KEY",
    "VITE_GOOGLE_ANALYTICS_ID": "$ANALYTICS_ID",
    "VITE_SENTRY_DSN": "$SENTRY_DSN",
    "VITE_APP_ENV": "production",
    "NODE_ENV": "production"
  }
}
```

#### Dockerfile (if needed)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
```

#### Deploy
```bash
railway up
```

---

### 3. Netlify

#### Setup
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

#### Configuration File (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  VITE_GEMINI_API_KEY = "$GEMINI_API_KEY"
  VITE_GOOGLE_ANALYTICS_ID = "$ANALYTICS_ID"
  VITE_SENTRY_DSN = "$SENTRY_DSN"
  VITE_APP_ENV = "production"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Cache-Control = "public, max-age=3600, must-revalidate"
```

#### Deploy
```bash
netlify deploy --prod
```

---

### 4. Docker + Cloud Run (Google Cloud)

#### Build Docker Image
```bash
docker build -t gura-nawe:latest .
```

#### Push to Container Registry
```bash
docker tag gura-nawe:latest gcr.io/PROJECT_ID/gura-nawe:latest
docker push gcr.io/PROJECT_ID/gura-nawe:latest
```

#### Deploy to Cloud Run
```bash
gcloud run deploy gura-nawe \
  --image gcr.io/PROJECT_ID/gura-nawe:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars VITE_GEMINI_API_KEY=value,VITE_GOOGLE_ANALYTICS_ID=value
```

---

## 🔐 Security Setup

### SSL/HTTPS
All platforms above provide automatic HTTPS. No additional setup needed.

### Environment Variables
Never commit secrets to git. Use platform-specific secret management:
- **Vercel**: Settings → Environment Variables
- **Railway**: Dashboard → Variables
- **Netlify**: Settings → Build & Deploy → Environment
- **Cloud Run**: gcloud secrets

### Content Security Policy
Add to server headers:
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
```

### Rate Limiting
Configure at API gateway or use service-level rate limiting:
- Vercel: Built-in
- Railway: Configure in firewall
- Netlify: Addon available
- Cloud Run: gcloud run update

---

## 📊 Post-Deployment

### Monitoring
1. **Google Analytics**
   - Verify real-time tracking
   - Check conversion goals
   - Monitor traffic sources

2. **Sentry**
   - Monitor error trends
   - Set up alerts for critical errors
   - Review performance metrics

3. **Lighthouse**
   - Run periodic audits
   - Track Core Web Vitals
   - Monitor performance regression

### Maintenance
```bash
# Update dependencies monthly
npm update

# Check for vulnerabilities
npm audit

# Run security scan
npm audit --audit-level=moderate
```

### Backup Strategy
- Git repository backed up
- Database backups (if applicable)
- Environment variables documented
- Deployment history maintained

---

## 🚨 Rollback Procedure

### Vercel
```bash
vercel rollback
```

### Railway
```bash
railway rollback
```

### Manual Rollback
1. Revert to previous commit
2. Build: `npm run build`
3. Redeploy to platform
4. Verify health checks pass

---

## 📞 Support

For deployment issues:
- Check platform documentation
- Review error logs on platform dashboard
- Verify all environment variables are set
- Check build logs for compilation errors
- Monitor application health dashboard

---

**Last Updated**: 2026-05-15  
**Version**: 1.0.0
