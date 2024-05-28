import { categoriesService } from "@/services";
import { CreateCategoryPayload } from "@/types";
import { fileExtensions } from "@/utils";
import {
  Button,
  ColorPicker,
  Form,
  Input,
  Modal,
  Typography,
  Upload,
  message,
  notification,
} from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineUpload } from "react-icons/ai";

export interface ICreateCategoryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  refetch?: (() => Promise<void>) | null;
}

export function CreateCategoryModal({
  isModalOpen,
  setIsModalOpen,
  refetch,
}: ICreateCategoryModalProps) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form] = Form.useForm<CreateCategoryPayload>();
  const iconImage = Form.useWatch("iconImage", form);

  async function onChangeIcon(param: UploadChangeParam) {
    const { file } = param;
    form.setFieldValue("iconImage", file);
  }

  const beforeUploadFile = (file: RcFile) => {
    const errs = fileExtensions.validator(file);
    errs.map((msg) => message.error(msg));

    return errs && errs.length > 0 ? false : true;
  };

  async function handleCreateCategory() {
    setIsLoading(true);
    try {
      await form.validateFields();

      const values = form.getFieldsValue();
      const { color, name } = values;

      const payloadForm = new FormData();

      for (const [key, value] of Object.entries({
        color,
        name,
      })) {
        payloadForm.append(key, value);
      }
      if (iconImage) payloadForm.append("iconImage", iconImage.originFileObj!);

      await categoriesService.createCategory(payloadForm);

      refetch && refetch();

      notification.success({
        message: "Create new category successfully!",
      });
      setIsLoading(false);
      setIsModalOpen(false);
    } catch (error: any) {
      console.log("🚀 ~ handleCreateCategory ~ error:", error);
      notification.error({
        message: "Failed to create category",
      });
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Create new category"
      onCancel={() => setIsModalOpen(false)}
      open={isModalOpen}
      footer={[null, null]}
      destroyOnClose={true}
      afterClose={form.resetFields}
    >
      <Form
        form={form}
        size="large"
        autoComplete="off"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <div className="flex items-center gap-4">
          <Form.Item
            name="name"
            label={<span className="font-medium">Name</span>}
            rules={[
              { required: true, message: "Name is required" },
              {
                max: 100,
                message: "Name must be less than 100 characters",
              },
            ]}
          >
            <Input placeholder="Enter your category name" />
          </Form.Item>
          <Form.Item
            name="color"
            label={<span className="font-medium">Color</span>}
            rules={[{ required: true, message: "Color is required" }]}
          >
            <ColorPicker
              showText
              defaultValue="#1677ff"
              onChange={(value) =>
                form.setFieldValue("color", value.toHexString())
              }
            />
          </Form.Item>
        </div>
        <Form.Item
          name="iconImage"
          required={false}
          label={<span className="font-medium">Icon</span>}
        >
          <div className="flex items-center justify-center">
            <Upload
              beforeUpload={beforeUploadFile}
              onChange={onChangeIcon}
              listType="picture-card"
              multiple={false}
              showUploadList={false}
            >
              {iconImage ? (
                <div className="w-full h-full">
                  <img
                    src={
                      iconImage.originFileObj
                        ? URL.createObjectURL(iconImage.originFileObj)
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
                  <Typography.Text>
                    {t("payment.modal.image_icon")}
                  </Typography.Text>
                </div>
              )}
            </Upload>
          </div>
        </Form.Item>
        <div className="flex justify-end gap-3">
          <Button onClick={() => setIsModalOpen(false)}>
            {t("payment.modal.btn_cancle")}
          </Button>
          <Button
            htmlType="submit"
            onClick={() => handleCreateCategory()}
            type="primary"
            loading={isLoading}
          >
            {t("payment.modal.btn_create")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
