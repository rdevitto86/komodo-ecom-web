import Address from '../address/address.model';
import {
  UserRoles,
  UserStatus,
  ContactMethod,
  CustomerVerificationStatus,
  MarketingDetails,
  UserType,
} from './types';

export * from './types';

export default class User {
  id?: string; // userId, assigned in backend
  role: UserRoles;
  status: UserStatus;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  mailingAddress?: Address;
  billingAddress?: Address;
  preferredContact?: ContactMethod;
  verificationStatus?: CustomerVerificationStatus;

  entitlements: string[] = [];

  loyaltyId?: string;
  loyaltyPoints: number;
  orderHistoryIds: string[] = [];
  marketingDetails?: MarketingDetails;

  creationDate: Date;
  lastLoginDate?: Date;
  lastUpdateDate: Date;

  constructor(data: UserType) {
    this.id = data.id;
    this.role = data.role;
    this.status = data.status || 'PENDING';
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.mailingAddress = data.mailingAddress;
    this.billingAddress = data.billingAddress;
    this.preferredContact = data.contactMethod;
    this.loyaltyId = data.loyaltyId;
    this.loyaltyPoints = data.loyaltyPoints || 0;
    this.orderHistoryIds = data.orderHistoryIds;
    this.marketingDetails = data.marketingDetails;
    this.creationDate = data.creationDate || new Date();
    this.lastUpdateDate = data.lastUpdateDate || new Date();
    this.lastLoginDate = data.lastLoginDate;
    if (Array.isArray(data.entitlements)) this.entitlements = data.entitlements;
  }

  get fullName() { return `${this.firstName} ${this.lastName}`; }

  toJSON() { return { ...this }; }
}
