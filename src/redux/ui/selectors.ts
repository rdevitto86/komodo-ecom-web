import type { RootState } from '../global';

// Base
export const selectUI = (state: RootState) => state.ui;
export const selectIsLoading = (state: RootState) => state.ui.isLoading;
export const selectModals = (state: RootState) => state.ui.modals;
export const selectSidebar = (state: RootState) => state.ui.sidebar;
export const selectNotifications = (state: RootState) => state.ui.notifications;
export const selectToast = (state: RootState) => state.ui.toast;

// Computed
export const selectHasActiveModals = (state: RootState): boolean => {
  return Object.values(state.ui.modals).some(isOpen => isOpen);
};

export const selectActiveModalIds = (state: RootState): string[] => {
  return Object.entries(state.ui.modals)
    .filter(([_, isOpen]) => isOpen)
    .map(([modalId]) => modalId);
};

export const selectSidebarState = (state: RootState) => ({
  isOpen: state.ui.sidebar.isOpen,
  activeTab: state.ui.sidebar.activeTab,
  hasActiveTab: !!state.ui.sidebar.activeTab,
});

export const selectUIState = (state: RootState) => ({
  isLoading: state.ui.isLoading,
  hasActiveModals: Object.values(state.ui.modals).some(isOpen => isOpen),
  notificationCount: state.ui.notifications.length,
  hasToast: !!state.ui.toast,
  sidebarOpen: state.ui.sidebar.isOpen,
});

// Utils
export const getModalState = (state: RootState, modalId: string): boolean => state.ui.modals[modalId] ?? false;
export const selectModalState = (modalId: string) => (state: RootState): boolean => state.ui.modals[modalId] ?? false;
export const selectNotificationCount = (state: RootState): number => state.ui.notifications.length;
export const selectUnreadNotifications = (state: RootState) => state.ui.notifications.filter(n => Date.now() - n.timestamp < 300000);
export const selectRecentNotifications = (state: RootState) => state.ui.notifications
  .slice(-5) // Last 5 notifications
  .reverse(); // Most recent first

export const selectNotificationsByType = (type: 'success' | 'error' | 'warning' | 'info') => 
  (state: RootState) => { return state.ui.notifications.filter(n => n.type === type); };
