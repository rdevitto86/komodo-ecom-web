import { Currency, CurrencySymbols } from '../payment/types';

export type OfferingStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | 'DISCONTINUED';

/**
 * Defines properties of a media element for an offering
 */
export type MediaAsset = {
  url: string;
  type: 'IMG' | 'GIF' | 'VID' | '3D';
  sequenceNum?: number;
  altText: string;
};

/**
 * Defines the pricing structure for an offering.
 */
export type PriceDetails = {
  basePrice: number;
  salePrice?: number; // Optional discounted price
  currency: Currency;
  currencySymbol: CurrencySymbols;
}

/**
 * Base properties shared between all types of offerings (products and services).
 */
export type OfferingBase = {
  id: string; // Unique identifier for the offering.
  type: 'PRODUCT' | 'SERVICE';
  title: string;
  slug: string; // URL-friendly version of the title, e.g., "my-awesome-product"
  shortDescription?: string;
  description: string;
  status: OfferingStatus;

  details: ProductOffering | ServiceOffering; // sub-data for the offering

  pricing: PriceDetails;

  brand?: string; // Brand or manufacturer
  vendor?: string; // The seller of the offering, if different from the platform owner.

  media: MediaAsset[];
  categories: string[];
  tags: string[];

  creationDate: Date;
  lastUpdateDate: Date;

  // SEO related fields
  metaTitle?: string;
  metaDescription?: string;
}

/**
 * Represents a specific variation of a product, e.g., based on color or size.
 */
export type ProductVariant = {
  sku: string;
  name: string;
  attributes: Record<string, string>; // e.g., { "size": "Large", "color": "Blue" }
  priceModifier?: number; // e.g., +5.00 for Large size. Can be negative.
  stockQuantity: number;
  image?: MediaAsset; // Variant-specific image
}

/**
 * Physical dimensions of a product, crucial for shipping calculations.
 */
export type ProductDimensions = {
  weight: number;
  width: number;
  height: number;
  depth: number;
  unit: 'kg' | 'lb' | 'g' | 'oz' | 'cm' | 'in';
}

/**
 * Represents a tangible item that can be sold and shipped.
 */
export type ProductOffering = OfferingBase & {
  type: 'PRODUCT';
  sku: string; // Main SKU for the product. Variants might have their own.

  // Inventory Management
  stockQuantity: number;
  isAvailable: boolean;
  lowStockThreshold?: number;

  // Shipping Details
  dimensions?: ProductDimensions;
  shippingClass?: 'STANDARD' | 'FRAGILE' | 'OVERSIZED';

  // Product Variants
  hasVariants: boolean;
  variants?: ProductVariant[];

  // Ratings and Reviews
  averageRating?: number;
  reviewCount?: number;

  // Additional Details
  specifications?: Record<string, string>; // e.g. { "Material": "Cotton", "Origin": "Vietnam" }
  warrantyInfo?: string;
}

export enum ServiceLocationType {
  ON_SITE = 'ON_SITE', // Service is performed at the customer's location
  REMOTE = 'REMOTE', // Service is performed remotely (e.g., online)
  HYBRID = 'HYBRID', // Combination of on-site and remote
}

/**
 * Defines the availability for booking a service.
 */
export type ServiceAvailability = {
  scheduleText: string;
  blackoutDates?: Date[]; // Dates when the service is not available.
  bookingLeadTimeHours?: number; // Minimum hours in advance a booking must be made.
}

/**
 * Represents a service that can be offered, such as consulting, installation, or a class.
 */
export type ServiceOffering = OfferingBase & {
  type: 'SERVICE';
  jobType: 'HOURLY' | 'FIXED' | 'PROJECT';

  // Duration & Scheduling
  estimatedDurationMinutes?: number;
  availability?: ServiceAvailability;

  // Location Details
  locationType: ServiceLocationType;
  serviceArea?: string[]; // zip codes, city names, or 'nationwide' for on-site services.

  // Personnel Details
  requiredPersonnel?: number;
  personnelType?: string; // e.g., 'Senior Technician', 'Consultant'
}

export type OfferingType = ProductOffering | ServiceOffering;
