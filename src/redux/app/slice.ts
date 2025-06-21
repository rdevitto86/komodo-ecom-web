import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  version: string;
  isOnline: boolean;
  lastUpdated: number;
  features: {
    [key: string]: boolean;
  };
  config: {
    apiUrl: string;
    environment: 'development' | 'staging' | 'production';
    debugMode: boolean;
  };
  performance: {
    loadTime: number | null;
    lastNavigationTime: number | null;
  };
}

// State 
const initialState: AppState = {
  version: '1.0.0',
  isOnline: navigator.onLine,
  lastUpdated: Date.now(),
  features: {},
  config: {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    environment: (process.env.NODE_ENV as AppState['config']['environment']) || 'development',
    debugMode: process.env.NODE_ENV === 'development',
  },
  performance: {
    loadTime: null,
    lastNavigationTime: null,
  },
};

// Slice 
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    updateLastUpdated: (state) => {
      state.lastUpdated = Date.now();
    },
    setFeatureFlag: (state, action: PayloadAction<{ feature: string; enabled: boolean }>) => {
      state.features[action.payload.feature] = action.payload.enabled;
    },
    setMultipleFeatureFlags: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.features = { ...state.features, ...action.payload };
    },
    setVersion: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
    },
    updateConfig: (state, action: PayloadAction<Partial<AppState['config']>>) => {
      state.config = { ...state.config, ...action.payload };
    },
    setLoadTime: (state, action: PayloadAction<number>) => {
      state.performance.loadTime = action.payload;
    },
    setNavigationTime: (state, action: PayloadAction<number>) => {
      state.performance.lastNavigationTime = action.payload;
    },
    resetPerformanceMetrics: (state) => {
      state.performance = {
        loadTime: null,
        lastNavigationTime: null,
      };
    },
    initializeApp: (state, action: PayloadAction<{
      version?: string;
      features?: Record<string, boolean>;
      config?: Partial<AppState['config']>;
    }>) => {
      if (action.payload.version) state.version = action.payload.version;
      if (action.payload.features) state.features = { ...state.features, ...action.payload.features };
      if (action.payload.config) state.config = { ...state.config, ...action.payload.config };
      state.lastUpdated = Date.now();
    },
  },
});

// Actions 
export const {
  setOnlineStatus,
  updateLastUpdated,
  setFeatureFlag,
  setMultipleFeatureFlags,
  setVersion,
  updateConfig,
  setLoadTime,
  setNavigationTime,
  resetPerformanceMetrics,
  initializeApp,
} = appSlice.actions;

export default appSlice.reducer;
