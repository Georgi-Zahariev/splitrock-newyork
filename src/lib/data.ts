// Data configuration for SplitRock Landscaping website

export interface NavItem {
  href: string;
  label: string;
}

// Navigation items
export const navItems: NavItem[] = [
  { href: '#home', label: 'Home' },
  { href: '#landscaping', label: 'Landscaping' },
  { href: '#outdoor', label: 'Outdoor Construction' },
  { href: '#contact', label: 'Contact' },
];

// Company information
export const companyInfo = {
  name: 'SplitRock',
  tagline: 'Landscaping & Outdoor Construction',
  phone: '(555) 123-4567',
  email: 'info@splitrockny.com',
  address: '123 Main Street, Albany, NY 12345',
};
