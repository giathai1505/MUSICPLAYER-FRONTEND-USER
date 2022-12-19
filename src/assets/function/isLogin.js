export const isLogin = () => {
  return localStorage.getItem("userInfo") ? true : false;
};
