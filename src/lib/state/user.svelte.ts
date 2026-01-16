export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  currency: string;
}

export interface Orders {

}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'GUEST' | 'CUSTOMER';
  address?: Address[];
  payments?: string[];
  preferences?: UserPreferences;
  orders?: Orders[];
  createdAt: Date;
  meta?: Record<string, any>;
}

class UserState {
  #data = $state({
    profile: null as UserProfile | null,
    isAuthorized: false,
  })
  
  get profile() { return this.#data.profile; }
  get isAuthorized() { return this.#data.isAuthorized; }

  login() {
    // TODO: Implement login logic
  }

  logout() {
    // TODO: Implement logout logic
  }
}

export const userState = new UserState();