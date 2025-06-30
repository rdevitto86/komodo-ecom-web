import { AddressType } from '../address/address.model';

interface AdminPermissions {
  canViewAllOrders: boolean;
  canEditProducts: boolean;
  canManageUsers: boolean;
}

export interface UserType {
  // --- Common Properties ---
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending'; // User account status
  creationDate: Date;
  lastLoginDate?: Date;
  lastUpdateDate: Date;
  address?: AddressType;

  userType: 'CUSTOMER' | 'ADMIN' | 'SUPPORT';

  // --- Customer-Specific Properties (optional, present if userType is 'CUSTOMER') ---
  loyaltyPoints?: number;
  purchaseHistoryIds?: string[];
  marketingOptIn?: boolean;
  preferredContactMethod?: 'Email' | 'Phone' | 'SMS';

  // --- Admin-Specific Properties (optional, present if userType is 'ADMIN') ---
  adminRoles?: ('SuperAdmin' | 'ContentManager' | 'OrderProcessor' | 'Developer')[];
  permissions?: AdminPermissions; // Granular permissions
  department?: string;

  // --- Customer Support-Specific Properties (optional, present if userType is 'SUPPORT') ---
  supportTeam?: string; // E.g., 'Level 1', 'Technical Support'
  assignedTicketIds?: string[]; // IDs of tickets currently assigned
  shiftEndTime?: Date; // For real-time availability
  specializations?: string[]; // E.g., ['Billing', 'Technical', 'Returns']
}

export default class User implements UserType {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  phoneNumber?: string;
  status!: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
  creationDate: Date;
  lastLoginDate?: Date;
  lastUpdateDate: Date;
  address?: AddressType;
  userType!: 'CUSTOMER' | 'ADMIN' | 'SUPPORT';
  loyaltyPoints?: number;
  purchaseHistoryIds?: string[];
  marketingOptIn?: boolean;
  preferredContactMethod?: 'Email' | 'Phone' | 'SMS';
  adminRoles?: ('SuperAdmin' | 'ContentManager' | 'OrderProcessor' | 'Developer')[];
  permissions?: AdminPermissions;
  department?: string;
  supportTeam?: string;
  assignedTicketIds?: string[];
  shiftEndTime?: Date;
  specializations?: string[];

  constructor(data: UserType) {
    Object.assign(this, data);

    this.creationDate = new Date(data.creationDate);
    this.lastUpdateDate = new Date(data.lastUpdateDate);
    if (data.lastLoginDate) {
      this.lastLoginDate = new Date(data.lastLoginDate);
    }
    if (this.shiftEndTime) {
      this.shiftEndTime = new Date(this.shiftEndTime);
    }
  }

  getFullName() { return `${this.firstName} ${this.lastName}`; }

  toJSON() { return { ...this }; }
}
