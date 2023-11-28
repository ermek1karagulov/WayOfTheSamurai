import { ResponseType, ResultCodesEnum, instance } from "./api.ts";

type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};
type LoginMeResponseType = {
  userId: number;
};

export const authAPI = {
  async me() {
    return instance
      .get<ResponseType<MeResponseDataType>>(`auth/me`)
      .then((res) => res.data);
  },
  async login(email: string, password: string | number, rememberMe = false) {
    return instance
      .post<ResponseType<LoginMeResponseType, ResultCodesEnum>>(`auth/login`, {
        email,
        password,
        rememberMe,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
