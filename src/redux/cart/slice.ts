// import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// type AuthStatus = 'anonymous' | 'loading' | 'authenticated';

// export interface Preferences {
//   theme: 'light' | 'dark' | 'system';
//   language: string;
//   notifications: boolean;
// }

// export interface UserState {
//   status: AuthStatus;
//   id: string | null;
//   name: string | null;
//   email: string | null;
//   preferences: Preferences;
// }

// const initialState: UserState = {
//   status: 'anonymous',
//   id: null,
//   name: null,
//   email: null,
//   preferences: {
//     theme: 'system',
//     language: 'en',
//     notifications: true,
//   },
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setAuthLoading(state) {
//       state.status = 'loading';
//     },
//     setAuthenticated(
//       state,
//       action: PayloadAction<{ id: string; name?: string; email?: string }>
//     ) {
//       state.id = action.payload.id;
//       if (action.payload.name !== undefined) state.name = action.payload.name;
//       if (action.payload.email !== undefined) state.email = action.payload.email;
//       state.status = 'authenticated';
//     },
//     setAnonymous(state) {
//       state.status = 'anonymous';
//       state.id = null;
//       state.name = null;
//       state.email = null;
//     },
//     updateProfile(state, action: PayloadAction<{ name?: string; email?: string }>) {
//       if (action.payload.name !== undefined) state.name = action.payload.name;
//       if (action.payload.email !== undefined) state.email = action.payload.email;
//     },
//     updatePreferences(state, action: PayloadAction<Partial<Preferences>>) {
//       state.preferences = { ...state.preferences, ...action.payload };
//     },
//   },
// });

// export const userReducer = userSlice.reducer;
// export const userActions = userSlice.actions;
