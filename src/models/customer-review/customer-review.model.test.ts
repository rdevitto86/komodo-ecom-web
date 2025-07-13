import { describe, it, expect } from 'vitest';
import CustomerReview from './customer-review.model';
import { CustomerReviewType } from './types';

describe('CustomerReview', () => {
  const mockReviewData: CustomerReviewType = {
    id: 'rev-123',
    offeringId: 'prod-456',
    authorId: 'user-789',
    authorName: 'Jane Doe',
    rating: 4.5,
    title: 'Great Product!',
    comment: 'I really enjoyed using this product. Highly recommended.',
    isVerifiedPurchase: true,
    status: 'APPROVED',
    createdAt: new Date('2023-10-27T10:00:00Z'),
    updatedAt: new Date('2023-10-28T11:00:00Z'),
    media: [{
      url: 'https://example.com/image.jpg',
      type: 'IMG',
      altText: 'A picture of the product in use',
    }],
  };

  describe('constructor', () => {
    it('should correctly initialize all properties from the input data', () => {
      const review = new CustomerReview(mockReviewData);

      expect(review.id).toBe(mockReviewData.id);
      expect(review.authorName).toBe(mockReviewData.authorName);
      expect(review.rating).toBe(mockReviewData.rating);
      expect(review.title).toBe(mockReviewData.title);
      expect(review.comment).toBe(mockReviewData.comment);
      expect(review.isVerifiedPurchase).toBe(true);
      expect(review.status).toBe('APPROVED');
      expect(review.createdAt).toEqual(new Date('2023-10-27T10:00:00Z'));
      expect(review.updatedAt).toEqual(new Date('2023-10-28T11:00:00Z'));
      expect(review.media).toHaveLength(1);
      expect(review.media[0].url).toBe('https://example.com/image.jpg');
    });

    it('should default status to PENDING if not provided', () => {
      const data = { ...mockReviewData };
      // @ts-expect-error test
      delete data.status;
      const review = new CustomerReview(data);
      expect(review.status).toBe('PENDING');
    });

    it('should default media to an empty array if not provided', () => {
      const data = { ...mockReviewData, media: undefined };
      const review = new CustomerReview(data);
      expect(review.media).toEqual([]);
    });

    it('should handle undefined updatedAt', () => {
      const data = { ...mockReviewData, updatedAt: undefined };
      const review = new CustomerReview(data);
      expect(review.updatedAt).toBeUndefined();
    });

    it('should convert date strings to Date objects', () => {
      const dataWithStrings = {
        ...mockReviewData,
        createdAt: '2023-10-27T10:00:00Z',
        updatedAt: '2023-10-28T11:00:00Z',
      } as unknown as CustomerReviewType;

      const review = new CustomerReview(dataWithStrings);
      expect(review.createdAt).toBeInstanceOf(Date);
      expect(review.updatedAt).toBeInstanceOf(Date);
      expect(review.createdAt.toISOString()).toBe('2023-10-27T10:00:00.000Z');
    });
  });

  describe('formatDate', () => {
    it('should format the creation date with default options', () => {
      const review = new CustomerReview(mockReviewData);
      // Note: The exact output depends on the test runner's timezone.
      // We check for the presence of month, day, and year.
      const formattedDate = review.formatDate('en-US');
      expect(formattedDate).toContain('October');
      expect(formattedDate).toContain('27');
      expect(formattedDate).toContain('2023');
    });

    it('should format the creation date with custom options', () => {
      const review = new CustomerReview(mockReviewData);
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const formattedDate = review.formatDate('en-US', options);
      expect(formattedDate).toBe('10/27/2023');
    });
  });

  describe('formatRating', () => {
    it('should format the rating to two decimal places', () => {
      const review = new CustomerReview(mockReviewData);
      expect(review.formatRating()).toBe('4.50');

      review.rating = 5;
      expect(review.formatRating()).toBe('5.00');
    });
  });
});
