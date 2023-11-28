import axios from "axios";
import { UserType } from "../types/Types";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "fd15e76d-0219-425e-9cfd-966d3eb5fed8",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export type GetItems = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
