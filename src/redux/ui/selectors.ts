import type { UIState } from './slice';

// UI
export const selectUI = (state: UIState) => state;
export const selectIsLoading = (state: UIState) => state.isLoading;
export const selectUIState = (state: UIState) => ({
  isLoading: state.isLoading,
  hasActiveModals: Object.values(state.modals).some(isOpen => isOpen),
  notificationCount: state.notifications.length,
  hasToast: !!state.toast,
  sidebarOpen: state.sidebar.isOpen,
});

// Modals
export const selectModals = (state: UIState) => state.modals;
export const getModalState = (state: UIState, modalId: string): boolean => state.modals[modalId] ?? false;
export const selectModalState = (modalId: string) => (state: UIState): boolean => state.modals[modalId] ?? false;
export const selectHasActiveModals = (state: UIState): boolean => Object.values(state.modals).some(isOpen => isOpen);
export const selectActiveModalIds = (state: UIState): string[] => {
  return Object.entries(state.modals)
    .filter(([_, isOpen]) => isOpen)
    .map(([modalId]) => modalId);
};

// Toast
export const selectToast = (state: UIState) => state.toast;

// Sidebar
export const selectSidebar = (state: UIState) => state.sidebar;
export const selectSidebarState = (state: UIState) => ({
  isOpen: state.sidebar.isOpen,
  activeTab: state.sidebar.activeTab,
  hasActiveTab: !!state.sidebar.activeTab,
});

// Notifications
export const selectNotifications = (state: UIState) => state.notifications;
export const selectNotificationCount = (state: UIState): number => state.notifications.length;
// export const selectUnreadNotifications = (state: UIState) => state.notifications.filter(n => Date.now() - n.timestamp < 300000);
export const selectRecentNotifications = (state: UIState) => state.notifications
  .slice(-5) // Last 5 notifications
  .reverse(); // Most recent first
export const selectNotificationsByType = (type: 'success' | 'error' | 'warning' | 'info') =>
  (state: UIState) => { return state.notifications.filter(n => n.type === type); };
