import type { UserState } from './slice';

// User
export const selectUser = (state: UserState) => state;

// User Authentication
export const selectIsAuthenticated = (state: UserState) => state.isAuthenticated;

// User Profile
export const selectUserProfile = (state: UserState) => ({
  id: state.id,
  name: state.name,
  email: state.email,
});
export const selectUserDisplayName = (state: UserState): string => state.name || state.email || 'Anonymous User';
export const selectIsUserProfileComplete = (state: UserState): boolean => !!(state.id && state.name && state.email);

// Personalization Settings
export const selectUserPreferences = (state: UserState) => state.preferences;
export const selectTheme = (state: UserState) => state.preferences.theme;
export const selectLanguage = (state: UserState) => state.preferences.language;
export const selectNotificationSettings = (state: UserState) => state.preferences.notifications;
