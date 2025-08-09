// import { createSelector } from '@reduxjs/toolkit';
// import type { RootState } from '../store';
// import type { UserState } from './slice';

// // Base slice selector
// export const selectUserState = (state: RootState): UserState => state.user;

// // Auth
// export const selectIsAuthenticated = createSelector(
//   selectUserState,
//   (u) => (u as any).isAuthenticated ?? (u as any).status === 'authenticated'
// );

// // Profile (memoized to avoid rerenders)
// export const selectUserProfile = createSelector(selectUserState, (u) => ({
//   id: u.id,
//   name: u.name,
//   email: u.email,
// }));
// export const selectUserDisplayName = createSelector(selectUserState, (u) => u.name || u.email || 'Anonymous User');
// export const selectIsUserProfileComplete = createSelector(selectUserState, (u) => Boolean(u.id && u.name && u.email));

// // Preferences
// export const selectUserPreferences = createSelector(selectUserState, (u) => u.preferences);
// export const selectTheme = createSelector(selectUserPreferences, (p) => p.theme);
// export const selectLanguage = createSelector(selectUserPreferences, (p) => p.language);
// export const selectNotificationSettings = createSelector(selectUserPreferences, (p) => p.notifications);
