import { defineStore } from "pinia";

const useAppStore = defineStore("app", {
  state: () => ({ collapsed: true }),
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    toggle() {
      console.log(3333, this.collapsed);
      this.collapsed = !this.collapsed;
    },
  },
});

export default useAppStore;
