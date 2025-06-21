import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface UIState {
  isLoading: boolean;
  modals: {
    [key: string]: boolean;
  };
  sidebar: {
    isOpen: boolean;
    activeTab: string | null;
  };
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: number;
  }>;
  toast: {
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null;
}

// State
const initialState: UIState = {
  isLoading: false,
  modals: {},
  sidebar: {
    isOpen: false,
    activeTab: null,
  },
  notifications: [],
  toast: null,
};

// Slice
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleModal: (state, action: PayloadAction<{ modalId: string; isOpen?: boolean }>) => {
      const { modalId, isOpen } = action.payload;
      state.modals[modalId] = isOpen !== undefined ? isOpen : !state.modals[modalId];
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key] = false;
      });
    },
    setSidebar: (state, action: PayloadAction<Partial<UIState['sidebar']>>) => {
      state.sidebar = { ...state.sidebar, ...action.payload };
    },
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id' | 'timestamp'>>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    showToast: (state, action: PayloadAction<{ message: string; type: UIState['toast']['type'] }>) => {
      state.toast = {
        isVisible: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideToast: (state) => {
      state.toast = null;
    },
  },
});

// Actions
export const {
  setLoading,
  toggleModal,
  openModal,
  closeModal,
  closeAllModals,
  setSidebar,
  toggleSidebar,
  addNotification,
  removeNotification,
  clearNotifications,
  showToast,
  hideToast,
} = uiSlice.actions;

export default uiSlice.reducer;
