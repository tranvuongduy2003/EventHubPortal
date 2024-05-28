import { PASSWORD_REGEX } from "@/constants";
import { EGender } from "@/enums";
import { CreateUserPayload } from "@/types";
import { fileExtensions } from "@/utils";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Typography,
  message,
  notification,
} from "antd";
import Password from "antd/es/input/Password";
import TextArea from "antd/es/input/TextArea";
import Upload, { RcFile, UploadChangeParam } from "antd/es/upload";
import dayjs from "dayjs";
import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";

export function CreateUserPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form] = Form.useForm<CreateUserPayload>();
  const avatar = Form.useWatch("avatar", form);

  async function onChangeAvatar(param: UploadChangeParam) {
    const { file } = param;
    form.setFieldValue("avatar", file);
  }

  const beforeUploadFile = (file: RcFile) => {
    const errs = fileExtensions.validator(file);
    errs.map((msg) => message.error(msg));

    return errs && errs.length > 0 ? false : true;
  };

  async function handleCreateUser() {
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

      notification.success({
        message: "Create new user successfully!",
      });
      setIsLoading(false);
    } catch (error: any) {
      console.log("🚀 ~ handleCreateUser ~ error:", error);
      notification.error({
        message: "Failed to create user",
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
            Create new user
          </Typography.Title>
        </div>
      </div>

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
            <div className="grid grid-cols-2 gap-x-8">
              <Form.Item
                name="password"
                label={<span className="font-medium">Password</span>}
                rules={[
                  { required: true, message: "Password is required" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters",
                  },
                  {
                    pattern: PASSWORD_REGEX.upperCase,
                    message: "Password must be at least 1 uppercase letter",
                  },
                  {
                    pattern: PASSWORD_REGEX.lowerCase,
                    message: "Password must be at least 1 lowercase letter",
                  },
                  {
                    pattern: PASSWORD_REGEX.number,
                    message: "Password must be at least 1 number",
                  },
                  {
                    pattern: PASSWORD_REGEX.specialCharacter,
                    message: "Password must be at least 1 special character",
                  },
                ]}
              >
                <Password placeholder="Enter user password" visibilityToggle />
              </Form.Item>
              <Form.Item
                name="retypedPassword"
                label={<span className="font-medium">Re-enter password</span>}
                rules={[
                  { required: true, message: "Re-enter password is required" },
                  {
                    validator: (_, value) =>
                      value === form.getFieldValue("password")
                        ? Promise.resolve()
                        : Promise.reject(),
                    message: "Re-enter password is not match with password",
                  },
                ]}
              >
                <Password
                  placeholder="Re-enter user password"
                  visibilityToggle
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            htmlType="submit"
            onClick={handleCreateUser}
            type="primary"
            loading={isLoading}
          >
            Create
          </Button>
        </div>
      </Form>
    </Space>
  );
}
