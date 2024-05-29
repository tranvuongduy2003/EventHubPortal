import { EGender } from "@/enums";
import dayjs from "dayjs";

export type CreateUserPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  dob?: dayjs.Dayjs;
  userName?: string;
  gender?: EGender;
  bio?: string;
  avatar?: any;
};

export type UpdateUserPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  dob?: dayjs.Dayjs;
  userName?: string;
  gender?: EGender;
  bio?: string;
  avatar?: any;
};
