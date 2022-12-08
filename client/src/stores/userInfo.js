import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("userInfo", {
  state: () => ({
    userNick: "",
    loggedIn: false,
    accessToken: "",
    refreshToken: "",
  }),
  actions: {
    setInfo(nick, isLoggedIn, accessToken, refreshToken) {
      this.userNick = nick;
      this.loggedIn = isLoggedIn;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },
  },
  getters: {
    getInfo(state) {
      return [
        state.userNick,
        state.loggedIn,
        state.accessToken,
        state.refreshToken,
      ];
    },
  },
  persist: true,
});
