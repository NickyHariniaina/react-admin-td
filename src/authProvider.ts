import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  login: ({ username }) => {
    localStorage.setItem("auth", username);
    return Promise.resolve();
  },

  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },

  checkAuth: () =>
    localStorage.getItem("auth")
      ? Promise.resolve()
      : Promise.reject({ message: "login.required" }),

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject({ message: "login.required" });
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const username = localStorage.getItem("auth");
    return Promise.resolve({
      id: username || "anonymous",
      fullName: username || "Anonymous",
    });
  },

  getPermissions: () => Promise.resolve(undefined),
};
