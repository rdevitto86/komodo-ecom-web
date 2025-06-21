
import type { RootState } from '../global';

// Base Selectors
export const selectUser = (state: RootState) => state.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectUserPreferences = (state: RootState) => state.user.preferences;

// Derived Selectors
export const selectUserProfile = (state: RootState) => ({
  id: state.user.id,
  name: state.user.name,
  email: state.user.email,
});

export const selectTheme = (state: RootState) => state.user.preferences.theme;
export const selectLanguage = (state: RootState) => state.user.preferences.language;
export const selectNotificationSettings = (state: RootState) => state.user.preferences.notifications;

// Computed Selectors
export const selectUserDisplayName = (state: RootState): string => {
  const user = state.user;
  return user.name || user.email || 'Anonymous User';
};

export const selectIsUserProfileComplete = (state: RootState): boolean => {
  const user = state.user;
  return !!(user.id && user.name && user.email);
};
