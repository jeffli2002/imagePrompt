# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `bun run dev:web` - Start the development server (excluding Stripe webhook)
- `bun run dev` - Start all services in parallel
- `bun install` - Install dependencies

### Database
- `bun db:push` - Push database schema changes (requires POSTGRES_URL in .env.local)
- Database operations run from `packages/db/` using Prisma for schema and Kysely for queries

### Build & Quality
- `bun run build` - Build all packages
- `bun run lint` - Run ESLint checks
- `bun run lint:fix` - Fix ESLint issues
- `bun run format` - Check code formatting
- `bun run format:fix` - Fix formatting issues
- `bun run typecheck` - Run TypeScript type checking

### Testing
Check package.json files in individual packages for specific test commands.

### Generators
- `bun run gen` - Generate new packages/components using Turbo generators

## Architecture

### Monorepo Structure (Turborepo)
- **apps/nextjs** - Main Next.js 14 application with App Router
- **apps/auth-proxy** - Authentication proxy service
- **packages/api** - tRPC API layer with routers for auth, customer, k8s, stripe
- **packages/auth** - Authentication utilities supporting Clerk and NextAuth
- **packages/db** - Database layer using Prisma (schema) + Kysely (queries)
- **packages/stripe** - Stripe integration and webhook handling
- **packages/ui** - Shared UI components built with shadcn/ui
- **packages/common** - Shared utilities, email templates, configurations
- **tooling/** - ESLint, Prettier, TypeScript, and Tailwind configurations

### Key Technologies
- **Framework**: Next.js 14 with App Router
- **Authentication**: Clerk (default) or NextAuth
- **Database**: PostgreSQL with Prisma + Kysely
- **API**: tRPC for type-safe APIs
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Payments**: Stripe integration
- **Email**: React Email + Resend
- **i18n**: Built-in Next.js internationalization

### API Layer (tRPC)
Located in `packages/api/src/router/`:
- **auth.ts** - User authentication endpoints
- **customer.ts** - Customer management
- **stripe.ts** - Subscription and payment handling
- **k8s.ts** - Kubernetes cluster management
- **health_check.ts** - API health monitoring

### Database Schema
Managed in `packages/db/prisma/schema.prisma`:
- User authentication (User, Account, Session)
- Subscription management
- Customer data
- Vercel PostgreSQL integration ready

### Authentication
Supports dual auth systems:
- **Clerk** (default after June 1, 2025): Configure with CLERK_* env vars
- **NextAuth**: Available in feature-nextauth branch

### Environment Variables
Required variables (copy `.env.example` to `.env.local`):
- `POSTGRES_URL` - Database connection
- `NEXT_PUBLIC_APP_URL`, `NEXTAUTH_URL` - App URLs
- `CLERK_*` or NextAuth credentials
- `STRIPE_*` - Payment processing
- `RESEND_*` - Email service
- `ADMIN_EMAIL` - Admin access emails

### i18n Support
Configured in `src/config/i18n-config.ts`:
- Supported languages: en, zh, ja, ko
- Dictionaries in `src/config/dictionaries/`
- URL-based locale routing: `/[lang]/...`

### UI Components
Using shadcn/ui pattern in `packages/ui/src/`:
- Components follow shadcn conventions
- Tailwind CSS for styling
- Framer Motion for animations
- Icons from Lucide

### Admin Dashboard
Alpha feature at `/admin/dashboard`:
- Requires email in ADMIN_EMAIL env var
- Static pages currently, headless CMS integration planned