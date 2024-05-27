import { EUserStatus } from "@/enums";
import { IUser } from "@/interfaces";
// eslint-disable-next-line no-redeclare
import { Image } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

// interface UsersTableHookProps {}

export function useUsersTable() {
  const columns: ColumnsType<IUser | AnyObject> = [
    {
      title: "Personal Information",
      dataIndex: "userName",
      key: "userName",
      colSpan: 1,
      render: (userName: string, user) => (
        <div className="flex items-center gap-4">
          <div>
            <Image
              src={user.avatar}
              alt="user-avatar"
              className="object-cover rounded-lg"
              width={80}
              height={80}
              fallback="/empty-avatar.png"
            />
          </div>
          <div>
            <p>
              Name: <span className="font-medium">{userName}</span>
            </p>
            <p>
              Email: <span className="font-medium">{user.email}</span>
            </p>
            <p>
              Phone Number:{" "}
              <span className="font-medium">{user.phoneNumber}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
      key: "dob",
      colSpan: 1,
      render: (dob: Date) => <p>{dayjs(dob).format("DD/MM/YYYY")}</p>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      colSpan: 1,
      render: (gender: string) => (
        <p className="capitalize">{gender?.toLowerCase()}</p>
      ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      colSpan: 1,
      render: (roles: string[]) => (
        <p className="capitalize">{roles?.join(", ")}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      colSpan: 1,
      render: (status: string) =>
        status === EUserStatus.INACTIVE ? (
          <div className="px-3 py-2 font-medium text-center text-white capitalize bg-red-600 rounded-full">
            {EUserStatus.INACTIVE.toLowerCase()}
          </div>
        ) : (
          <div className="px-3 py-2 font-medium text-center text-white capitalize bg-green-600 rounded-full">
            {EUserStatus.ACTIVE.toLowerCase()}
          </div>
        ),
    },
    {
      title: "Followers",
      dataIndex: "numberOfFollowers",
      key: "numberOfFollowers",
      colSpan: 1,
      render: (numberOfFollowers: number) => (
        <p className="capitalize">{numberOfFollowers}</p>
      ),
    },
    {
      title: "Followeds",
      dataIndex: "numberOfFolloweds",
      key: "numberOfFolloweds",
      colSpan: 1,
      render: (numberOfFolloweds: number) => (
        <p className="capitalize">{numberOfFolloweds}</p>
      ),
    },
    {
      title: "Favourites Event",
      dataIndex: "numberOfFavourites",
      key: "numberOfFavourites",
      colSpan: 1,
      render: (numberOfFolloweds: number) => (
        <p className="capitalize">{numberOfFolloweds}</p>
      ),
    },
    {
      title: "Created Events",
      dataIndex: "numberOfCreatedEvents",
      key: "numberOfCreatedEvents",
      colSpan: 1,
      render: (numberOfCreatedEvents: number) => (
        <p className="capitalize">{numberOfCreatedEvents}</p>
      ),
    },
  ];

  return [columns];
}
