import { GetItems, ResponseType, instance } from "./api.ts";

export const userAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetItems>(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data);
  },
  follow(userId: number) {
    return instance
      .post<ResponseType>(`follow/${userId}`)
      .then((res) => res.data);
  },
  unFollow(userId: number) {
    return instance
      .delete(`follow/${userId}`)
      .then((res) => res.data) as Promise<ResponseType>;
  },
};
