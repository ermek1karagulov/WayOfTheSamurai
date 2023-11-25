import axios from "axios";
import { ProfileType } from "../types/Types";
import { type } from "os";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "fd15e76d-0219-425e-9cfd-966d3eb5fed8",
  },
});

export const userAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => {
        return res.data;
      });
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },
  unFollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
  getProfile(userId: number) {
    // console.warn("Obselete method. Please profileAPI object. ");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status/`, { status });
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile);
  },
};

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

type MeResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: number;
  messages: Array<string>;
};

type LoginMeResponseType = {
  data: { userId: number };
  resultCode: number;
  messages: Array<string>;
};

export const authAPI = {
  async me() {
    return instance.get<MeResponseType>(`auth/me`).then((res) => res.data);
  },
  async login(email: string, password: string | number, rememberMe = false) {
    return instance
      .post<LoginMeResponseType>(`auth/login`, {
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
