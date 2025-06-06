import { User, Users, LayoutDashboard } from 'lucide-react';

export const NavbarLandingLinks = [
  { id: 1, title: 'Home', href: 'hero' },
  { id: 2, title: 'Features', href: 'features' },
  { id: 3, title: 'Benefits', href: 'benefits' },
  { id: 4, title: 'FAQ', href: 'faq' },
];

export const SeekersNavbarLinks = [
  { id: '1', title: 'Find Jobs', href: '/jobs' },
  { id: '2', title: 'Search Employers', href: '/employers' },
];

export const SeekersNavbarActions = [
  { id: '1', href: '/profile', icon: User, tooltip: 'Profile' },
];

export const EmployersNavbarActions = [
  { id: '1', href: '/seekers', icon: Users, tooltip: 'Seekers' },
  { id: '2', href: '/dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
];
