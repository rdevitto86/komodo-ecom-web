interface PriceDetails {
  amount: number;
  currency: string;
  type: 'OneTime' | 'Recurring' | 'Hourly' | 'Custom';
  recurringInterval?: 'Day' | 'Week' | 'Month' | 'Year';
  recurringIntervalCount?: number;
  customPriceDescription?: string;
}

interface MediaAsset {
  url: string;
  altText: string;
  type: 'Image' | 'Video' | '3DModel';
  thumbnailUrl?: string;
  order?: number;
}

interface ServiceDuration {
  type: 'Hourly' | 'Fixed' | 'Project';
  value?: number;
  unit?: 'minutes' | 'hours' | 'days' | 'weeks' | 'months';
  description?: string;
}

export interface OfferingType {
  // --- Common Properties ---
  id: string;
  name: string;
  shortDescription?: string;
  description: string;
  slug: string;
  status: 'Draft' | 'Active' | 'Inactive' | 'Archived' | 'Discontinued';
  price: PriceDetails;
  media: MediaAsset[];
  categories: string[];
  tags: string[];
  creationDate: Date;
  lastUpdateDate: Date;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  type: 'PRODUCT' | 'SERVICE';

  // --- Product-Specific Properties (optional) ---
  sku?: string;
  manufacturer?: string;
  brand?: string;
  inventory?: {
    current: number;
    lowStockThreshold?: number;
    trackInventory: boolean;
  };
  physicalAttributes?: {
    weightKg?: number;
    dimensionsCm?: { length: number; width: number; height: number; };
    material?: string;
    color?: string;
  };
  digitalDownload?: {
    fileUrl: string;
    fileSizeMb?: number;
    fileType?: string;
    downloadLimit?: number;
    expirationDate?: Date;
  };
  warrantyInfo?: string;
  modelNumber?: string;
  compatibleOfferings?: string[];
  requiredServices?: string[];

  // --- Service-Specific Properties (optional) ---
  serviceCode?: string;
  duration?: ServiceDuration;
  bookingRequired?: boolean;
  schedulingOptions?: {
    availabilityCalendarId?: string;
    minNoticeHours?: number;
    maxBookingDuration?: number;
    isRecurringService?: boolean;
  };
  serviceArea?: {
    type: 'Local' | 'Remote' | 'Global' | 'OnSite';
    radiusKm?: number;
    supportedZipCodes?: string[];
    countryCodes?: string[];
  };
  serviceProviderDetails?: {
    teamId?: string;
    individualId?: string;
    providerType: 'Team' | 'Individual' | 'Company';
  };
  deliverables?: string[];
  customizationOptions?: string[];
  prerequisites?: string[];
  includedOfferings?: string[];
}
export default class Offering implements OfferingType {
  // --- Common Properties ---
  id!: string;
  name!: string;
  shortDescription?: string;
  description!: string;
  slug!: string;
  status!: 'Draft' | 'Active' | 'Inactive' | 'Archived' | 'Discontinued';
  price!: PriceDetails;
  media!: MediaAsset[];
  categories!: string[];
  tags!: string[];
  creationDate: Date;
  lastUpdateDate: Date;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  type!: 'PRODUCT' | 'SERVICE';

  // --- Product-Specific Properties (Optional) ---
  sku?: string;
  manufacturer?: string;
  brand?: string;
  inventory?: {
    current: number;
    lowStockThreshold?: number;
    trackInventory: boolean;
  };
  physicalAttributes?: {
    weightKg?: number;
    dimensionsCm?: { length: number; width: number; height: number; };
    material?: string;
    color?: string;
  };
  digitalDownload?: {
    fileUrl: string;
    fileSizeMb?: number;
    fileType?: string;
    downloadLimit?: number;
    expirationDate?: Date;
  };
  warrantyInfo?: string;
  modelNumber?: string;
  compatibleOfferings?: string[];
  requiredServices?: string[];

  // --- Service-Specific Properties (Optional) ---
  serviceCode?: string;
  duration?: ServiceDuration;
  bookingRequired?: boolean;
  schedulingOptions?: {
    availabilityCalendarId?: string;
    minNoticeHours?: number;
    maxBookingDuration?: number;
    isRecurringService?: boolean;
  };
  serviceArea?: {
    type: 'Local' | 'Remote' | 'Global' | 'OnSite';
    radiusKm?: number;
    supportedZipCodes?: string[];
    countryCodes?: string[];
  };
  serviceProviderDetails?: {
    teamId?: string;
    individualId?: string;
    providerType: 'Team' | 'Individual' | 'Company';
  };
  deliverables?: string[];
  customizationOptions?: string[];
  prerequisites?: string[];
  includedOfferings?: string[];

  constructor(data: OfferingType) {
    Object.assign(this, data);

    this.creationDate = new Date(data.creationDate);
    this.lastUpdateDate = new Date(data.lastUpdateDate);

    if (this.digitalDownload?.expirationDate) {
      this.digitalDownload.expirationDate = new Date(this.digitalDownload.expirationDate);
    }
  }

  getFormattedPrice() {
    const { amount, currency, type, recurringInterval } = this.price;
    const symbol = currency === 'USD' ? '$' : currency;

    let priceString = `${symbol}${amount.toFixed(2)}`;

    switch (type) {
      case 'Hourly':
        priceString += ' / hour';
        break;
      case 'Recurring':
        priceString += recurringInterval ? ` / ${recurringInterval.toLowerCase()}` : ' (recurring)';
        if (this.price.recurringIntervalCount && this.price.recurringIntervalCount > 1) {
          priceString = `${symbol}${amount.toFixed(2)} / every ${this.price.recurringIntervalCount} ${this.price.recurringInterval?.toLowerCase()}s`;
        }
        break;
      case 'Custom':
        priceString = this.price.customPriceDescription || 'Price Varies';
        break;
    }
    return priceString;
  }

  getFormattedServiceDuration() {
    if (this.type === 'SERVICE' && this.duration) {
      switch (this.duration.type) {
        case 'Hourly':
          return `${this.duration.value} ${this.duration.unit || 'hours'}`;
        case 'Fixed':
          return `${this.duration.value} ${this.duration.unit || 'time unit'}`;
        case 'Project':
          return this.duration.description || 'Project-based';
        default:
          return 'N/A';
      }
    }
    return null;
  }
}
