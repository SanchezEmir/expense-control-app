import { create } from "zustand"
import { supabase } from "../index"

export const useAuthStore = create(( set ) => ({
    isAuth: false,
    signInWithGoogle: async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google"
            });

            if (error) throw new Error(error);
            set({ isAuth: true });

            return data;

        } catch (error) {
            console.log(error);
        }
    },
    signOut: async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) throw new Error(error);
            set({ isAuth: false });

        } catch (error) {
            console.log(error);
        }
    }
}))