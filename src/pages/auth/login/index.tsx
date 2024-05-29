import { AuthContext } from "@/contexts";
import { useAppStore } from "@/stores";
import { LoginPayload } from "@/types";
// eslint-disable-next-line no-redeclare
import { Button, Form, Image, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext } from "react";

export function LoginPage() {
  const [form] = useForm<LoginPayload>();

  const { logIn } = useContext(AuthContext);

  const { isLoading } = useAppStore((state) => state);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-16">
      <div className="py-8 px-16 border-2 border-solid rounded-lg border-slate-300 w-[600px]">
        <div className="flex justify-center w-full mb-8">
          <Image
            src="/logo-text.png"
            alt="logo"
            preview={false}
            height={50}
            className="object-cover"
          />
        </div>
        <Form size="large" form={form} onFinish={logIn}>
          <Form.Item name="identity">
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              loading={isLoading}
              htmlType="submit"
              className="w-full border-0"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
