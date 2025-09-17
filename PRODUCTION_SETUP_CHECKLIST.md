# Production Setup Checklist

## Before Deploying to Vercel

### 1. Generate NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```
Copy the output and use it as your NEXTAUTH_SECRET value.

### 2. Set Up GitHub OAuth App
1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - Application name: Your app name
   - Homepage URL: `https://your-production-domain.com`
   - Authorization callback URL: `https://your-production-domain.com/api/auth/callback/github`
4. Save the Client ID and Client Secret

### 3. Set Up Resend Email
1. Sign up at https://resend.com
2. Verify your domain
3. Get your API key from the dashboard
4. Set RESEND_FROM to an email address on your verified domain

### 4. Set Up Stripe
1. Create a Stripe account (if you don't have one)
2. Get your live API key from https://dashboard.stripe.com/apikeys
3. Create products and pricing in Stripe Dashboard
4. Set up webhook endpoint:
   - URL: `https://your-production-domain.com/api/webhooks/stripe`
   - Events to listen for: All payment and subscription events
   - Copy the signing secret

### 5. Database Setup
- Consider using Vercel Postgres for easy integration
- Or use Supabase, Neon, or any PostgreSQL provider
- Make sure to use connection pooling for production

### 6. Update URLs
Replace all instances of:
- `your-production-domain.com` with your actual domain
- `your-admin-email@domain.com` with your admin email

## Adding to Vercel

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add each variable from `.env.production`
4. Select "Production" environment
5. Save all variables

## Post-Deployment Checklist

- [ ] Test GitHub login
- [ ] Test email login (magic links)
- [ ] Verify emails are being sent
- [ ] Test Stripe webhook (create a test payment)
- [ ] Check that admin access works
- [ ] Verify database connections are stable

## Security Notes

- Never commit `.env.production` to git
- Rotate NEXTAUTH_SECRET periodically
- Use different API keys for development and production
- Enable 2FA on all service accounts (GitHub, Stripe, etc.)