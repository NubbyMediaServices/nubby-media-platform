export type PortfolioCategory =
  | "All"
  | "Weddings"
  | "Live Events"
  | "Portraits"
  | "Branding";

export interface PortfolioItem {
  id: number;
  title: string;
  category: Exclude<PortfolioCategory, "All">;
  description: string;
  imageUrl?: string;
  featured?: boolean;
}

export const portfolioCategories: PortfolioCategory[] = [
  "All",
  "Weddings",
  "Live Events",
  "Portraits",
  "Branding",
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Luxury Wedding Gallery",
    category: "Weddings",
    description:
      "A refined wedding collection focused on emotion, ceremony details, and timeless storytelling.",
    featured: true,
  },
  {
    id: 2,
    title: "Live Concert Coverage",
    category: "Live Events",
    description:
      "High-energy event photography built for performers, venues, and promotional media.",
    featured: true,
  },
  {
    id: 3,
    title: "Studio Portrait Session",
    category: "Portraits",
    description:
      "Clean portrait work for professionals, creatives, couples, and personal branding.",
    featured: true,
  },
  {
    id: 4,
    title: "Private Brand Activation",
    category: "Branding",
    description:
      "Branded event photography designed for campaigns, launches, and social media delivery.",
  },
  {
    id: 5,
    title: "Reception Detail Collection",
    category: "Weddings",
    description:
      "Focused coverage of decor, venue styling, candid moments, and guest experience.",
  },
  {
    id: 6,
    title: "Nightlife Event Set",
    category: "Live Events",
    description:
      "Low-light event photography with a polished, high-contrast editorial feel.",
  },
];

export const featuredPortfolioItems = portfolioItems.filter(
  (item) => item.featured
);