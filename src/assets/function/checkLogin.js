export const checkLogin = () => {
  let accessToken = localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken"))
    : null;

  if (accessToken) return true;

  return false;
};
