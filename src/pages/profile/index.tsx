import { EGender } from "@/enums";
import { usersService } from "@/services";
import { useAuthStore } from "@/stores";
import { CreateUserPayload } from "@/types";
import { fileExtensions } from "@/utils";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Spin,
  Typography,
  message,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Upload, { RcFile, UploadChangeParam } from "antd/es/upload";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";

export function ProfilePage() {
  const { profile, setProfile } = useAuthStore((state) => state);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);

  const [form] = Form.useForm<CreateUserPayload>();
  const avatar = Form.useWatch("avatar", form);

  const handleInitUpdateUserForm = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    handleInitUpdateUserForm.current = async () => {
      setIsFetchLoading(true);
      try {
        if (!profile) return;
        const avatar = profile.avatar
          ? await fileExtensions.urlToUploadFile(profile.avatar)
          : null;
        form.setFieldsValue({
          avatar: avatar,
          bio: profile.bio,
          dob: profile.dob ? dayjs(profile.dob) : dayjs(),
          email: profile.email,
          fullName: profile.fullName,
          gender: profile.gender,
          phoneNumber: profile.phoneNumber,
          userName: profile.userName,
        });
        setIsFetchLoading(false);
      } catch (error) {
        console.log(error);
        setIsFetchLoading(false);
      }
    };
    handleInitUpdateUserForm.current();
    return () => {
      handleInitUpdateUserForm.current = null;
    };
  }, [profile, form]);

  async function onChangeAvatar(param: UploadChangeParam) {
    const { file } = param;
    form.setFieldValue("avatar", file);
  }

  const beforeUploadFile = (file: RcFile) => {
    const errs = fileExtensions.validator(file);
    errs.map((msg) => message.error(msg));

    return errs && errs.length > 0 ? false : true;
  };

  async function handleUpdateUser() {
    setIsLoading(true);
    try {
      await form.validateFields();

      const values = form.getFieldsValue();
      const {
        email,
        phoneNumber,
        dob,
        fullName,
        password,
        userName,
        gender,
        bio,
        avatar,
      } = values;

      const payloadForm = new FormData();

      for (const [key, value] of Object.entries({
        email,
        phoneNumber,
        fullName,
        password,
        userName,
        gender,
        bio,
      })) {
        if (value && value !== "") payloadForm.append(key, value);
      }
      if (dob) payloadForm.append("dob", dob.format("YYYY-MM-DD"));
      if (avatar) payloadForm.append("avatar", avatar.originFileObj!);

      var { data } = await usersService.updateUser(profile!.id, payloadForm);
      setProfile(data);

      notification.success({
        message: "Update new user successfully!",
      });
      setIsLoading(false);
    } catch (error: any) {
      console.log("🚀 ~ handleUpdateUser ~ error:", error);
      notification.error({
        message: "Failed to update user",
      });
      setIsLoading(false);
    }
  }

  return (
    <Space size="large" direction="vertical" style={{ width: "100%" }}>
      <div>
        <Typography.Title level={2}>Users Management</Typography.Title>
        <div>
          <Typography.Title
            level={3}
            className="!text-gray-500"
            style={{ marginTop: 0 }}
          ></Typography.Title>
          <Typography.Title
            level={3}
            className="!text-gray-500"
            style={{ marginTop: 0 }}
          >
            Update user
          </Typography.Title>
        </div>
      </div>

      {isFetchLoading ? (
        <div className="flex items-center justify-center w-full">
          <Spin spinning={isFetchLoading} size="large" />
        </div>
      ) : (
        <Form
          form={form}
          size="large"
          autoComplete="off"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <div className="flex gap-8">
            <div className="w-1/3">
              <Form.Item
                name="avatar"
                required={false}
                label={<span className="font-medium">Avatar</span>}
              >
                <div className="flex items-center justify-center">
                  <Upload
                    beforeUpload={beforeUploadFile}
                    onChange={onChangeAvatar}
                    listType="picture-card"
                    className="avatar-upload"
                    multiple={false}
                    showUploadList={false}
                  >
                    {avatar ? (
                      <div className="w-full h-full">
                        <img
                          src={
                            avatar.originFileObj
                              ? URL.createObjectURL(avatar.originFileObj)
                              : ""
                          }
                          alt="icon"
                          className="object-cover w-full h-full"
                          onLoad={(url) =>
                            URL.revokeObjectURL(url.currentTarget.currentSrc)
                          }
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <AiOutlineUpload />
                        <Typography.Text>Upload avatar image</Typography.Text>
                      </div>
                    )}
                  </Upload>
                </div>
              </Form.Item>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-x-8">
                <Form.Item
                  name="userName"
                  label={<span className="font-medium">Username</span>}
                >
                  <Input placeholder="Enter username" />
                </Form.Item>
                <Form.Item
                  name="fullName"
                  label={<span className="font-medium">Fullname</span>}
                  rules={[
                    { required: true, message: "Fullname is required" },
                    {
                      max: 50,
                      message: "Fullname must be less than 50 characters",
                    },
                  ]}
                >
                  <Input placeholder="Enter user fullname" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label={<span className="font-medium">Email</span>}
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Invalid format" },
                  ]}
                >
                  <Input type="email" placeholder="Enter user email" />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label={<span className="font-medium">Phone Address</span>}
                  rules={[
                    { required: true, message: "Phone address is required" },
                  ]}
                >
                  <Input placeholder="Enter user phone address" />
                </Form.Item>
                <Form.Item
                  name="dob"
                  label={<span className="font-medium">Date of birth</span>}
                >
                  <DatePicker
                    placeholder="Select user date of birth"
                    className="w-full"
                    format={"DD/MM/YYYY"}
                    onChange={(date) => form.setFieldValue("dob", date)}
                    maxDate={dayjs(new Date())}
                  />
                </Form.Item>
                <Form.Item
                  name="gender"
                  label={<span className="font-medium">Gender</span>}
                >
                  <Select
                    placeholder="Select user gender"
                    options={[
                      { value: EGender.MALE, title: "Male" },
                      { value: EGender.FEMALE, title: "Female" },
                      { value: EGender.OTHER, title: "Other" },
                    ]}
                  />
                </Form.Item>
              </div>
              <Form.Item
                name="bio"
                label={<span className="font-medium">Biography</span>}
                rules={[
                  {
                    max: 1000,
                    message: "Biography must be less than 1000 characters",
                  },
                ]}
              >
                <TextArea
                  placeholder="Enter user biography"
                  autoSize={false}
                  rows={6}
                  maxLength={1000}
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              htmlType="submit"
              onClick={handleUpdateUser}
              type="primary"
              loading={isLoading}
            >
              Update
            </Button>
          </div>
        </Form>
      )}
    </Space>
  );
}
