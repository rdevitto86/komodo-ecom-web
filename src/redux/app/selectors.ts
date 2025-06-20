import type { RootState } from '../global';

// ===== BASE =====
export const selectApp = (state: RootState) => state.app;
export const selectIsOnline = (state: RootState) => state.app.isOnline;
export const selectFeatures = (state: RootState) => state.app.features;
export const selectVersion = (state: RootState) => state.app.version;
export const selectConfig = (state: RootState) => state.app.config;
export const selectPerformance = (state: RootState) => state.app.performance;
export const selectLastUpdated = (state: RootState) => state.app.lastUpdated;

// ===== CONFIG =====
export const selectEnvironment = (state: RootState) => state.app.config.environment;
export const selectDebugMode = (state: RootState) => state.app.config.debugMode;
export const selectApiUrl = (state: RootState) => state.app.config.apiUrl;

// ===== UTILITY =====
export const isFeatureEnabled = (state: RootState, feature: string): boolean => state.app.features[feature] ?? false;
export const selectFeatureFlag = (feature: string) => (state: RootState): boolean => state.app.features[feature] ?? false;
export const selectIsProduction = (state: RootState): boolean => state.app.config.environment === 'production';
export const selectIsDevelopment = (state: RootState): boolean => state.app.config.environment === 'development';
export const selectIsStaging = (state: RootState): boolean => state.app.config.environment === 'staging';

// ===== COMPUTED =====
export const selectAppHealth = (state: RootState) => ({
  isOnline: state.app.isOnline,
  version: state.app.version,
  lastUpdated: state.app.lastUpdated,
  performance: state.app.performance,
  environment: state.app.config.environment,
});

export const selectEnabledFeatures = (state: RootState): string[] => {
  return Object.entries(state.app.features)
    .filter(([_, enabled]) => enabled)
    .map(([feature]) => feature);
};

export const selectDisabledFeatures = (state: RootState): string[] => {
  return Object.entries(state.app.features)
    .filter(([_, enabled]) => !enabled)
    .map(([feature]) => feature);
};

export const selectAppStatus = (state: RootState) => ({
  version: state.app.version,
  isOnline: state.app.isOnline,
  environment: state.app.config.environment,
  debugMode: state.app.config.debugMode,
  lastUpdated: new Date(state.app.lastUpdated).toISOString(),
  featureCount: Object.keys(state.app.features).length,
  enabledFeatureCount: Object.values(state.app.features).filter(Boolean).length,
});

export const selectPerformanceMetrics = (state: RootState) => {
  const perf = state.app.performance;
  return {
    loadTime: perf.loadTime,
    lastNavigationTime: perf.lastNavigationTime,
    hasLoadTime: perf.loadTime !== null,
    hasNavigationTime: perf.lastNavigationTime !== null,
    loadTimeFormatted: perf.loadTime ? `${perf.loadTime}ms` : 'N/A',
  };
};