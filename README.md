# SplitRock New York

A modern, one-page marketing website for SplitRock, a landscaping and outdoor construction company based in New York. Features an interactive quote request form with email notifications.

## 🌐 What It Does

- **Showcases Services**: Professional presentation of landscaping and outdoor construction offerings
- **Quote Request Form**: Interactive form allowing customers to request quotes for specific services
- **Email Notifications**: Automated emails to business team and customer confirmations
- **Department Routing**: Quotes automatically routed to the right team (landscaping or construction)
- **Spam Protection**: Built-in honeypot and rate limiting to prevent abuse

## 🛠️ Technologies

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling

### Features
- **Resend** - Transactional email service
- **Zod** - Form validation
- **React Hook Form** - Form state management
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your [Resend API key](https://resend.com/api-keys) and email addresses.

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

## 📧 Email Setup

Requires a [Resend](https://resend.com) account (free tier available):

1. Sign up and get API key
2. Verify your domain (for production)
3. Add configuration to `.env.local`

See `.env.example` for required variables.

## 📄 License

MIT License - see LICENSE file for details.
