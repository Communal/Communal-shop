import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUser } from "@/app/api/user";

function decodeToken(token) {
  try {
    function fromBase64(str) {
      if (typeof atob !== "undefined") {
        return atob(str);
      } else if (typeof Buffer !== "undefined") {
        return Buffer.from(str, "base64").toString("utf-8");
      }
      throw new Error("No base64 decoding available");
    }
    const decoded = fromBase64(token);
    const [id, email] = decoded.split(":");
    return id && email ? { id, email } : null;
  } catch {
    return null;
  }
}

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      tokenExpired: false,
      userRole: null,
      balance: 0,
      hasHydrated: false,

      // Enhanced fetchUser with better error handling
      fetchUser: async () => {
        if (get().loading) return;

        set({ loading: true, error: null });

        try {
          const token =
            typeof window !== "undefined"
              ? localStorage.getItem("token")
              : null;

          if (!token) {
            set({ user: null });
            return;
          }

          const decoded = decodeToken(token);
          if (!decoded) {
            set({ error: "Invalid token", user: null });
            return;
          }

          const u = await getUser({ id: decoded.id, email: decoded.email });

          if (!u) {
            set({ error: "User not found", user: null });
            return;
          }

          // ENSURE USER HAS _id FIELD
          if (!u._id && !u.id) {
            throw new Error("User object missing ID");
          }

          set({
            user: {
              ...u,
              _id: u._id || u.id, // Normalize to _id
            },
            userRole: u.role,
            balance: parseFloat(u.balance?.$numberDecimal || 0),
          });
        } catch (err) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      // Normalize user object when setting
      setUser: (user) =>
        set({
          user: {
            ...user,
            _id: user._id || user.id,
            role: user?.role || null,
            balance: parseFloat(user?.balance?.$numberDecimal || 0),
          },
        }),

      clearUser: () =>
        set({
          user: null,
          tokenExpired: false,
          userRole: null,
          balance: 0,
        }),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "user-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        // Auto-fetch if token exists
        if (typeof window !== "undefined" && localStorage.getItem("token")) {
          state?.fetchUser();
        }
      },
    }
  )
);

// Helper function to ensure user is loaded
export const ensureUserLoaded = async () => {
  const state = useUserStore.getState();
  if (!state.user && !state.loading) {
    await state.fetchUser(true); // Force fetch
  }
  return useUserStore.getState().user;
};
