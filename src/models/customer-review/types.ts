import { MediaAsset } from '../offering/types';

export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

/**
 * Represents the data structure for a customer review from the API.
 */
export type CustomerReviewType = {
  id: string;
  offeringId: string;
  authorId: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  status: ReviewStatus;
  media?: MediaAsset[]; // Optional images or videos submitted with the review
  createdAt: Date;
  updatedAt?: Date;
}
