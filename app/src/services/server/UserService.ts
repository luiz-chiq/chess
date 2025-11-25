type User = {
  id: string;
  username: string;
  password: string;
};

const users: Map<string, User> = new Map();

users.set('admin', {
  id: '1',
  username: 'admin',
  password: '123',
});

export const UserService = {
  validateCredentials(
    username: string,
    password: string
  ): User | null {
    const user = users.get(username);

    if (user && user.password === password) {
      return user;
    }
    return null;
  },

  create(username: string, password: string): User | null {
    if (users.has(username)) {
      return null;
    }

    const newUser: User = {
      id: String(users.size + 1),
      username,
      password,
    };
    users.set(username, newUser);

    return newUser;
  },

  sanitizeUser(user: User) {
    return { id: user.id, username: user.username };
  },
};
