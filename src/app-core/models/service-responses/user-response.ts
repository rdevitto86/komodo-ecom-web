import { Address } from '../address';
import { Company } from '../company';
import { Billing } from '../billing';

/**
 * @interface
 * @description - abstract class for user service responses
 */
export interface UserResponse {
    sessionToken?: string;
    type: UserType;
    nameInfo: UserNameInfo;
    contactInfo: UserContactInfo;
    addressInfo?: Address;
    companyInfo?: Company;
    billingInfo?: Billing;
}

/**
 * @interface
 * @description - abstract class for user service responses
 */
export interface UserType {
    name: string;
    value: number;
}

/**
 * @interface
 * @description - abstract class for user service responses
 */
export interface UserNameInfo {
    prefix: string;
    firstName: string;
    initial: string;
    lastName: string;
    suffix: string;
}

/**
 * @interface
 * @description - abstract class for user service responses
 */
export interface UserContactInfo {
    email: string;
    cell: string;
    contactPrimary: string;
    contactSecondary: string;
}
