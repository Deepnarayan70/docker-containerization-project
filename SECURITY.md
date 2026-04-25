# 🔒 Security Guidelines

## API Key Management

### ⚠️ CRITICAL: Never commit sensitive data to Git

Your `.env.local` file contains sensitive API keys and should **NEVER** be committed to version control.

### Before Pushing to GitHub

1. **Verify .gitignore includes:**
   ```
   .env
   .env*.local
   .env.development
   .env.production
   ```

2. **Check for exposed secrets:**
   ```bash
   git status
   # Make sure .env.local is NOT listed
   ```

3. **If you accidentally committed secrets:**
   ```bash
   # Remove from Git history
   git rm --cached .env.local
   git commit -m "Remove sensitive files"
   
   # IMPORTANT: Rotate your API key immediately at https://firecrawl.dev/app
   ```

### Environment Variables Setup

#### Local Development
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your actual API key to `.env.local`:
   ```bash
   FIRECRAWL_API_KEY=fc-your-actual-api-key-here
   ```

#### Production Deployment

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add `FIRECRAWL_API_KEY` with your key
3. Select Production, Preview, and Development environments
4. Save and redeploy

**Netlify:**
1. Site Settings → Environment Variables
2. Add `FIRECRAWL_API_KEY`
3. Save and trigger new deployment

**Railway:**
1. Project → Variables
2. Add `FIRECRAWL_API_KEY`
3. Deploy

**Other Platforms:**
- Add environment variables through their dashboard/CLI
- Never hardcode keys in source code

## Security Checklist

### Before Git Push
- [ ] `.env.local` is in `.gitignore`
- [ ] No hardcoded API keys in source code
- [ ] `.env.example` contains only placeholder values
- [ ] Verified with `git status` that no secrets are staged

### Code Security
- [ ] API keys loaded from environment variables only
- [ ] No console.log of sensitive data in production
- [ ] Error messages don't expose API keys or internal details
- [ ] Input validation on all user inputs
- [ ] API routes properly secured

### API Key Security
- [ ] API key has appropriate rate limits
- [ ] API key restricted to specific domains (if possible)
- [ ] Monitor API usage regularly
- [ ] Rotate keys periodically
- [ ] Have backup/emergency key ready

## What to Do If API Key Is Leaked

1. **Immediately revoke the compromised key** at https://firecrawl.dev/app
2. **Generate a new API key**
3. **Update environment variables** in all deployments
4. **Review API usage logs** for unauthorized access
5. **Update git history** if key was committed:
   ```bash
   # Use git filter-branch or BFG Repo-Cleaner
   # Contact GitHub support to clear cache if needed
   ```

## Monitoring

- Regularly check API usage at https://firecrawl.dev/app
- Set up alerts for unusual activity
- Review deployment logs for errors
- Monitor credit consumption

## Best Practices

✅ **DO:**
- Use environment variables for all secrets
- Keep `.env.local` backed up securely (password manager, encrypted storage)
- Use different API keys for dev/staging/production
- Document required environment variables in `.env.example`
- Add comments explaining what each variable does

❌ **DON'T:**
- Commit `.env.local` or any file with real secrets
- Share API keys in chat, email, or screenshots
- Hardcode API keys in source code
- Use production keys in development
- Store keys in client-side code

## Additional Resources

- [Firecrawl Security Docs](https://docs.firecrawl.dev)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Git Secret Management](https://git-secret.io/)

---

**Remember:** Security is not optional. Protect your API keys like passwords!
