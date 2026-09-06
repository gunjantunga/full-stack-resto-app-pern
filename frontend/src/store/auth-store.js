import { create } from "zustand";

const useAuthStore = create((set) => ({
    accessToken: null,
    isCheckingAuth: true, // Starts as true when the app first loads
    setAccessToken: (token) => set({ accessToken: token }),
    setCheckingAuth: (status) => set({ isCheckingAuth: status }),
    logout: () => set({ accessToken: null })
}));

export default useAuthStore;