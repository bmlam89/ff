import { create } from 'zustand';
import { authService } from "../services/auth";

export const useAuth = create((set) => ({
    isLoading: true,
    hasYahooAuth: false,

    setYahooAuthStatus: async () => {
        set({ isLoading: true });
        const response = await authService.getYahooAuthStatus();
        set({
            hasYahooAuth: response.data.isAuthenticated,
            isLoading: false
        });
    },

    beginYahooAuth: () => window.location.href = '/auth/yahoo/login'
    
}));