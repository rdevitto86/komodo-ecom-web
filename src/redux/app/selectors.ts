import type { AppState } from './slice';

// Application
export const selectApp = (state: AppState) => state;
export const selectIsOnline = (state: AppState) => state.isOnline;
export const selectVersion = (state: AppState) => state.version;
export const selectLastUpdated = (state: AppState) => state.lastUpdated;

// Config
export const selectConfig = (state: AppState) => state.config;
export const selectDebugMode = (state: AppState) => state.config.debugMode;
export const selectApiUrl = (state: AppState) => state.config.apiUrl;

// Environment
export const selectEnvironment = (state: AppState) => state.config.environment;
export const selectIsProduction = (state: AppState): boolean => state.config.environment === 'production';
export const selectIsQA = (state: AppState): boolean => state.config.environment === 'qa';
export const selectIsDevelopment = (state: AppState): boolean => state.config.environment === 'development';

// Features
export const selectFeatures = (state: AppState) => state.features;
export const isFeatureEnabled = (state: AppState, feature: string): boolean => state.features[feature] ?? false;
export const selectFeatureFlag = (feature: string) => (state: AppState): boolean => state.features[feature] ?? false;
export const selectEnabledFeatures = (state: AppState): string[] => {
  return Object.entries(state.features)
    .filter(([_, enabled]) => enabled)
    .map(([feature]) => feature);
};
export const selectDisabledFeatures = (state: AppState): string[] => {
  return Object.entries(state.features)
    .filter(([_, enabled]) => !enabled)
    .map(([feature]) => feature);
};

// Metrics
export const selectPerformance = (state: AppState) => state.performance;
export const selectAppStatus = (state: AppState) => ({
  version: state.version,
  isOnline: state.isOnline,
  environment: state.config.environment,
  debugMode: state.config.debugMode,
  lastUpdated: new Date(state.lastUpdated).toISOString(),
  featureCount: Object.keys(state.features).length,
  enabledFeatureCount: Object.values(state.features).filter(Boolean).length,
});
export const selectPerformanceMetrics = (state: AppState) => {
  const perf = state.performance;
  return {
    loadTime: perf.loadTime,
    lastNavigationTime: perf.lastNavigationTime,
    hasLoadTime: perf.loadTime !== null,
    hasNavigationTime: perf.lastNavigationTime !== null,
    loadTimeFormatted: perf.loadTime ? `${perf.loadTime}ms` : 'N/A',
  };
};
