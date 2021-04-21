/**
 * @interface
 * @description defines an interface of the UserReview object
 */
export interface UserReviewJSON {
    reviewerName: string | null;
    rating: number | null;
    comments?: string | null;
}

/**
 * @class
 * @version 1.0
 * @description defines a new Catalog Item Review model
 */
export class UserReview {
    /**
     * @public
     * @property {String | Null} reviewName
     * @description name of reviewer
     */
    public reviewerName: string | null = null;

    /**
     * @public
     * @property {Number | Null} rating
     * @description catalog item id
     */
    public rating: number | null = null;

    /**
     * @publicå
     * @property {String | Null} comments
     * @description catalog item id
     */
    public comments: string | null = null;

    /**
     * @constructor
     * @param {UserReviewJSON} [props] user review object
     */
    constructor(props?: UserReviewJSON) {
        if (isUserReview(props)) {
            const { reviewerName, rating, comments } = props;

            this.reviewerName = reviewerName;

            if (typeof rating === 'number') {
                this.rating = rating;
            }
            if (typeof comments === 'string') {
                this.comments = comments;
            }
        }
    }
}

/**
 * @constant
 * @function isUserReview
 * @description checks if an item is a UserReview type object
 * @param {Any} obj object to reference
 * @returns {Boolean} true/false
 */
 export const isUserReview = (obj: any): obj is UserReviewJSON => (
    'reviewerName' in obj && 'rating' in obj
);
