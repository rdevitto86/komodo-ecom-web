import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { appReducer }  from './app/slice';
import { cartReducer } from './cart/slice';
import { userReducer } from './user/slice';

const rootReducer = combineReducers({
  app : appReducer,
  cart: cartReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: {
          ignoredPaths: ['app.runtime'],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
}
