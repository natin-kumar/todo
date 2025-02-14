import { create } from "zustand";

const useDarkModeStore = create((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useDarkModeStore;
