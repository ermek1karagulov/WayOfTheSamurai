import { ProfileType } from "../types/Types";
import { instance, ResponseType } from "./api.ts";

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/` + userId).then((res) => res.data);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId).then((res) => res.data);
  },
  updateStatus(status: string) {
    return instance
      .put<ResponseType>(`profile/status/`, { status })
      .then((res) => res.data);
  },
  saveProfile(profile: ProfileType) {
    return instance
      .put<ResponseType>(`profile`, profile)
      .then((res) => res.data);
  },
};
