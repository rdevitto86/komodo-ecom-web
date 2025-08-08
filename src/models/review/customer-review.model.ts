import { MediaAsset } from '../catalog-item/types';
import { CustomerReviewType, ReviewStatus } from './types';

export * from './types';

export default class CustomerReview implements CustomerReviewType {
  id: string;
  offeringId: string;
  authorId: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  status: ReviewStatus;
  media: MediaAsset[];
  createdAt: Date;
  updatedAt?: Date;

  constructor(data: CustomerReviewType) {
    this.id = data.id;
    this.offeringId = data.offeringId;
    this.authorId = data.authorId;
    this.authorName = data.authorName;
    this.rating = data.rating;
    this.title = data.title;
    this.comment = data.comment;
    this.isVerifiedPurchase = data.isVerifiedPurchase;
    this.status = data.status || 'PENDING';
    this.media = data.media || [];
    this.createdAt = new Date(data.createdAt);
    if (data.updatedAt) this.updatedAt = new Date(data.updatedAt);
  }

  formatDate(locale: string = 'en-US', options?: Intl.DateTimeFormatOptions) {
    const defaultOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return this.createdAt.toLocaleDateString(locale, options || defaultOptions);
  }

  formatRating() {
    return this.rating.toFixed(2);
  }
}
