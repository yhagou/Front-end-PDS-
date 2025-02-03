export const userStorage = {
  getUser: () => {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
  },
  setUser: (user) => {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
  },
  removeUser: () => {
    localStorage.removeItem("user");
  },
};
