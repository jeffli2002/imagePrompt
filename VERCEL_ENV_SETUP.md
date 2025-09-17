# Vercel Environment Variables Setup

The following environment variables must be set in your Vercel project settings for the deployment to succeed:

## Required Environment Variables

### Authentication
- `NEXTAUTH_SECRET` - A random string used to encrypt JWT tokens. Generate with: `openssl rand -base64 32`
- `GITHUB_CLIENT_ID` - GitHub OAuth App Client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth App Client Secret

### Stripe (Payment Processing)
- `STRIPE_API_KEY` - Your Stripe secret key (starts with `sk_`)
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook endpoint secret (starts with `whsec_`)

### Application
- `NEXT_PUBLIC_APP_URL` - Your application URL (e.g., `https://your-app.vercel.app`)

### Database
- `POSTGRES_URL` - Your PostgreSQL connection string

### Email (Resend)
- `RESEND_API_KEY` - Your Resend API key for sending emails
- `RESEND_FROM` - The email address to send from (e.g., `noreply@yourdomain.com`)

### Admin Access
- `ADMIN_EMAIL` - Comma-separated list of admin email addresses

## How to Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable listed above
4. Select the appropriate environments (Production, Preview, Development)
5. Click "Save"

## Getting the Required Values

### GitHub OAuth App
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Set Authorization callback URL to: `https://your-app.vercel.app/api/auth/callback/github`
4. Copy the Client ID and generate a Client Secret

### Stripe
1. Sign up for a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Set up a webhook endpoint for `/api/webhooks/stripe`
4. Copy the webhook signing secret

### Resend
1. Sign up at https://resend.com
2. Get your API key from the dashboard
3. Verify your domain for sending emails

### PostgreSQL Database
1. You can use Vercel Postgres, Supabase, or any PostgreSQL provider
2. Copy the connection string

## Example Values (for testing only)

```env
NEXTAUTH_SECRET=your-generated-secret-here
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
POSTGRES_URL=postgresql://...
RESEND_API_KEY=re_...
RESEND_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@example.com
```

## Important Notes

- Never commit these values to your repository
- Use different values for production and development
- Ensure all required variables are set before deploying
- The build will fail if any required variables are missing