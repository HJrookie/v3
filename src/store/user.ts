import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

export default useUserStore;
