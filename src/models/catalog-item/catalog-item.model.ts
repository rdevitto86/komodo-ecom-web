import {
  MediaAsset,
  OfferingBase,
  OfferingStatus,
  OfferingType,
  PriceDetails
} from './types';

export * from './types';

export default class Offering<T extends OfferingType> implements OfferingBase {
  id: string; // Unique identifier for the offering.
  type: 'PRODUCT' | 'SERVICE';
  title: string;
  slug: string; // URL-friendly version of the title, e.g., "my-awesome-product"
  shortDescription?: string;
  description: string;
  status: OfferingStatus;

  details: T; // sub-data for the offering

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

  constructor(data: T) {
    this.id = data.id;
    this.type = data.type;
    this.title = data.title;
    this.slug = data.slug;
    this.shortDescription = data.shortDescription;
    this.description = data.description;
    this.status = data.status;
    this.details = data;
    this.pricing = data.pricing;
    this.brand = data.brand;
    this.vendor = data.vendor;
    this.media = data.media || [];
    this.categories = data.categories = [];
    this.tags = data.tags || [];
    this.creationDate = data.creationDate || new Date();
    this.lastUpdateDate = data.lastUpdateDate || new Date();
    this.metaTitle = data.metaTitle;
    this.metaDescription = data.metaDescription;
  }

  formatPricing() {
    return `${this.pricing.currencySymbol}${this.pricing.basePrice}`;
  }

  formatShipping() {
    if (this.type !== 'PRODUCT') return '';
    return '';
  }

  formatAvailability() {
    if (this.type !== 'SERVICE') return '';
    return '';
  }
}
