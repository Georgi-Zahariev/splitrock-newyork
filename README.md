# SplitRock - Professional Landscaping & Outdoor Construction

A modern, responsive one-page marketing website for SplitRock, a landscaping and outdoor construction company based in New York. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Design**: Clean, professional design with a premium feel
- **Fully Responsive**: Mobile-first approach with responsive design for all devices
- **Modular Components**: Separated contact section components for flexible layout management
- **Interactive Quote System**: Quote button with expandable form functionality
- **Smooth Scrolling**: Automatic scroll-to-section navigation
- **Contact Management**: Dedicated contact people display with professional cards
- **Form Handling**: Comprehensive quote request form with validation
- **Responsive Layout**: Optimized for desktop and mobile viewing

## 🏗️ Tech Stack

- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript
- **Runtime**: React 19.1.0
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Image Optimization**: Next.js Image component

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, or pnpm

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


## 🎨 Component Architecture

The website features a modular component architecture with the following key components:

### Core Components

1. **Navbar** (`Navbar.tsx`)
   - Responsive navigation with smooth scrolling
   - Active section highlighting
   - Mobile-friendly hamburger menu

2. **ContactPeople** (`ContactPeople.tsx`)
   - Individual contact person cards
   - Professional profiles with contact information
   - Hover effects and responsive design

3. **QuoteButton** (`QuoteButton.tsx`)
   - Reusable call-to-action button
   - Triggers quote form visibility
   - Enhanced padding and styling

4. **QuoteForm** (`QuoteForm.tsx`)
   - Comprehensive quote request form
   - Left-aligned layout with consistent padding
   - Form validation and user-friendly inputs
   - Show/hide functionality with smooth transitions

### Main Sections

- **Hero Section** - Company introduction and main call-to-action
- **Services Section** - Landscaping and outdoor construction services
- **About Section** - Company background and expertise
- **Contact Section** - Modular contact components integration

## 🔧 Customization

### Component Modifications

**ContactPeople Component**: 
- Update contact person information directly in `ContactPeople.tsx`
- Modify card styling, spacing, and layout
- Add or remove contact persons as needed

**QuoteForm Component**:
- Customize form fields and validation in `QuoteForm.tsx`
- Adjust layout alignment (currently left-aligned with padding)
- Modify form styling and responsive behavior

**QuoteButton Component**:
- Update button text and styling in `QuoteButton.tsx`
- Adjust padding and hover effects
- Customize click behavior and animations

### Styling Customization

- **Colors**: Update the color palette in `tailwind.config.ts`
- **Fonts**: Change fonts in `src/app/layout.tsx`
- **Layout**: Modify spacing and alignment in individual components
- **Responsive Design**: Adjust breakpoints and mobile layouts

### Content Updates

Update content directly in the main `page.tsx` file:
- Hero section text and images
- Services descriptions
- Company information
- Contact details


## 🧪 Development Commands

```bash
# Development server (with Turbopack)
npm run dev
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ for SplitRock Landscaping & Outdoor Construction
