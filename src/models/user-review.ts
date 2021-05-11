import { isUserReview, UserReviewJSON } from '../npm/kfs-ts/ecw/types/user-review';

/**
 * Defines a new Catalog Item Review model
 * @version 1.0.0
 */
export default class UserReview {
    /**
     * First name of reviewer
     */
    firstName: string | null = null;

    /**
     * Last name of reviewer
     */
    lastName: string | null = null;

    /**
     * Review Ratings
     */
    rating: number | null = null;

    /**
     * Review comments
     */
    comments: string | null = null;

    /**
     * @param {UserReviewJSON | UserReview} [props] user review object
     */
    constructor(props?: UserReviewJSON | UserReview) {
        if (isUserReview(props)) {
            const {
                firstName,
                lastName,
                rating,
                comments
            } = props;

            this.firstName = firstName;

            if (lastName) {
                this.lastName = lastName;
            }
            if (typeof rating === 'number') {
                this.rating = rating;
            }
            if (typeof comments === 'string') {
                this.comments = comments;
            }
        }
    }
}
