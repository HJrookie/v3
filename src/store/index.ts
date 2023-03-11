import { defineStore } from "pinia";
import useUserStore from "./user";
export default function useStore() {
  return {
    user: useUserStore(),
  };
}

