/**
 * Defines an interface of the UserReview object
 */
 export interface UserReviewJSON {
    firstName: string;
    lastName?: string;
    rating: number;
    comments?: string;
}

/**
 * Checks if an item is a UserReview type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
 export function isUserReview(obj: any): obj is UserReviewJSON {
    return 'firstName' in obj && 'rating' in obj;
}
