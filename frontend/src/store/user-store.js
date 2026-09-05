import { create } from "zustand";

export const userDetails = create((set) => ({

    user: null,
    setUser: (data) => set({ user: data }),
    clearUserData: () => set({ user: null })
}))

export default userDetails;