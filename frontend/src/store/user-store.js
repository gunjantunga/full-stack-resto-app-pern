import { create } from "zustand";
import { persist } from "zustand/middleware";

const userDetails = create(
    persist(
        (set) => ({
            user: null,
            setUser: (userData) => set({ user: userData }),
            clearUser: () => set({ user: null })
        }),
        {
            name: "user-storage",
        }
    )
);

export default userDetails;