import axios from "axios";

export const authService = {
  async login({user, password}: {user: string; password: string}) {
    return axios.post("/api/auth/login", { user, password });
  },
};
