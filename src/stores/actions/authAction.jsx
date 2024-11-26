export const login = (data) => {
  return {
    type: "LOGIN",
    payload: {
      check: data.check,
      uid: data.uid,
      expiry: data.expiry,
      token: data.token,
      role: data.role,
    },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
