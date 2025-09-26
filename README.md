# SplitRock - Professional Landscaping & Outdoor Construction

A modern, responsive one-page marketing website for SplitRock, a landscaping and outdoor construction company based in New York. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Design**: Clean, professional design with a premium feel
- **Fully Responsive**: Mobile-first approach with responsive design for all devices
- **Smooth Animations**: Framer Motion animations with scroll-triggered effects
- **Interactive Navigation**: Sticky navbar with active section highlighting
- **Image Gallery**: Lightbox gallery with category filtering
- **Contact Form**: Validated form with react-hook-form and Zod
- **SEO Optimized**: Comprehensive metadata and semantic HTML
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Georgi-Zahariev/splitrock-newyork.git
   cd splitrock-newyork
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts          # Contact form API endpoint
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx               # Root layout with metadata
│   │   └── page.tsx                 # Main landing page
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Section.tsx
│   │   │   └── index.ts
│   │   ├── Contact.tsx              # Contact form component
│   │   ├── CtaBanner.tsx            # Call-to-action banner
│   │   ├── Footer.tsx               # Site footer
│   │   ├── Gallery.tsx              # Project gallery with lightbox
│   │   ├── Hero.tsx                 # Hero section
│   │   ├── Navbar.tsx               # Navigation with scroll detection
│   │   ├── Process.tsx              # Process timeline
│   │   ├── Services.tsx             # Services showcase
│   │   └── Testimonials.tsx         # Customer testimonials
│   └── lib/
│       ├── data.ts                  # Static content and configuration
│       └── utils.ts                 # Utility functions
├── public/
│   └── images/                      # Placeholder for project images
├── tailwind.config.ts               # Tailwind configuration
├── next.config.ts                   # Next.js configuration
└── tsconfig.json                    # TypeScript configuration
```

## 🎨 Sections Overview

The website consists of 8 main sections:

1. **Hero** - Company introduction with compelling headline and CTA
2. **Services** - Four main service categories with hover effects
3. **Gallery** - Filterable project gallery with lightbox functionality
4. **Process** - 4-step process timeline (Consult → Design → Build → Care)
5. **Testimonials** - Customer reviews with star ratings
6. **CTA Banner** - Prominent call-to-action with contact information
7. **Contact** - Contact form with validation and business information
8. **Footer** - Company details, links, and social media

## 🔧 Customization

### Content Updates

Edit `/src/lib/data.ts` to update:
- Company information
- Services offered
- Gallery items
- Process steps
- Testimonials
- Contact details

### Styling

- **Colors**: Update the color palette in `tailwind.config.ts`
- **Fonts**: Change fonts in `src/app/layout.tsx`
- **Animations**: Modify Framer Motion animations in individual components

### Images

Replace placeholder images in the gallery by:
1. Adding images to `/public/images/`
2. Updating image references in `/src/lib/data.ts`

## 📬 Contact Form Setup

The contact form currently logs submissions to the console. To implement email sending:

1. **Choose an email service** (Resend, SendGrid, etc.)
2. **Install the service's SDK**
3. **Update `/src/app/api/contact/route.ts`** with your implementation
4. **Add environment variables** for API keys

Example with Resend:
```bash
npm install resend
```

Add to `.env.local`:
```
RESEND_API_KEY=your_api_key_here
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## 🔍 SEO & Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Meta Tags**: Comprehensive OpenGraph and Twitter Card tags
- **Image Optimization**: Next.js Image component with proper sizing
- **Semantic HTML**: Proper heading hierarchy and ARIA labels

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic markup
- **Focus Management**: Visible focus indicators
- **Skip Links**: Skip-to-content functionality
- **Color Contrast**: WCAG AA compliant contrast ratios

## 🧪 Development Commands

```bash
# Development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, contact:
- **Email**: info@splitrock-ny.com
- **Phone**: (518) 555-0123

---

Built with ❤️ for SplitRock Landscaping & Outdoor Construction
