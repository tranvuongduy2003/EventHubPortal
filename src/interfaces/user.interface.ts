import { EGender, EUserStatus } from "@/enums";

export interface IUser {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  dob?: Date;
  fullName: string;
  gender?: EGender;
  bio?: string;
  avatar?: string;
  status: EUserStatus;
  numberOfFollowers?: number;
  numberOfFolloweds?: number;
  numberOfFavourites?: number;
  numberOfCreatedEvents?: number;
  roles: string[];
  followingIds: string[];
  createdAt: Date;
  updatedAt?: Date;
}
