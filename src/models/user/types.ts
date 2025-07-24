import Address from '@models/address/address.model';

export type UserRoles = 'GUEST' | 'CUSTOMER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
export type CustomerVerificationStatus = 'VERIFIED' | 'UNVERIFIED';
export type ContactMethod = 'EMAIL' | 'PHONE' | 'SMS';

export type MarketingSettings = {
  optInEmail: boolean;
  optInSMS: boolean;
  optInPhone: boolean;
};

export type UserType = {
  id?: string; // userId
  role: UserRoles;
  status?: UserStatus;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  mailingAddress?: Address;
  billingAddress?: Address;
  contactMethod?: ContactMethod;
  verificationStatus?: CustomerVerificationStatus;

  entitlements: string[];

  loyaltyId?: string;
  loyaltyPoints?: number;
  orderHistoryIds?: string[];
  marketingSettings?: MarketingSettings;

  creationDate: Date;
  lastLoginDate?: Date;
  lastUpdateDate: Date;
}
