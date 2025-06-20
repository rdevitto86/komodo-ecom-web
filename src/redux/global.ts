import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer, { UserState } from './user/slice';
import uiReducer, { UIState } from './ui/slice';
import appReducer, { AppState } from './app/slice';
export interface RootState {
  user: UserState;
  ui: UIState;
  app: AppState;
}

// ===== GLOBAL STORE =====
export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});



// ===== HOOKS =====
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
