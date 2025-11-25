import { create } from 'zustand';

interface UserState {
  username: string;
  token: string;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
}

export const useUser = create<UserState>()((set) => ({
  username: '',
  token: '',
  setToken: (token: string) =>
    set(() => ({
      token,
    })),
  setUsername: (username: string) =>
    set(() => ({
      username,
    })),
}));
