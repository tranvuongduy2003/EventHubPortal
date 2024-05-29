import { EPaymentStatus } from "@/enums";
import { IPayment } from "@/interfaces";
import { paymentsService } from "@/services";
import { UpdatePaymentPayload } from "@/types";
import { Button, Form, Input, Modal, Select, notification } from "antd";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export interface IUpdatePaymentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  payment: IPayment;
  refetch?: (() => Promise<void>) | null;
}

export function UpdatePaymentModal({
  isModalOpen,
  setIsModalOpen,
  payment,
  refetch,
}: IUpdatePaymentModalProps) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form] = Form.useForm<UpdatePaymentPayload>();

  const handleInitializeForm = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    handleInitializeForm.current = async () => {
      form.setFieldsValue({
        customerEmail: payment.customerEmail,
        customerName: payment.customerName,
        customerPhone: payment.customerPhone,
        status: payment.status,
      });
    };
    handleInitializeForm.current();
    () => {
      handleInitializeForm.current = null;
    };
  }, [form, payment]);

  async function handleUpdatePayment() {
    setIsLoading(true);
    try {
      await form.validateFields();

      const values = form.getFieldsValue();

      await paymentsService.updatePayment(payment.id, values);

      refetch && refetch();

      notification.success({
        message: "Update payment successfully!",
      });
      setIsLoading(false);
      setIsModalOpen(false);
    } catch (error: any) {
      console.log("🚀 ~ handleUpdatePayment ~ error:", error);
      notification.error({
        message: "Failed to update payment",
      });
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Update payment"
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
        <Form.Item
          name="customerName"
          label={<span className="font-medium">Customer Name</span>}
          rules={[
            { required: true, message: "Customer Name is required" },
            {
              max: 100,
              message: "Customer Name must be less than 100 characters",
            },
          ]}
        >
          <Input placeholder="Enter customer name" />
        </Form.Item>
        <Form.Item
          name="customerEmail"
          label={<span className="font-medium">Customer Email</span>}
          rules={[
            { required: true, message: "Customer Email is required" },
            { type: "email", message: "Invalid format" },
            {
              max: 100,
              message: "Customer Email must be less than 100 characters",
            },
          ]}
        >
          <Input type="email" placeholder="Enter customer email" />
        </Form.Item>
        <Form.Item
          name="customerPhone"
          label={<span className="font-medium">Customer Phone</span>}
          rules={[
            { required: true, message: "Customer Phone is required" },
            {
              max: 100,
              message: "Customer Phone must be less than 100 characters",
            },
          ]}
        >
          <Input placeholder="Enter customer phone" />
        </Form.Item>
        <Form.Item
          name="status"
          label={<span className="font-medium">Status</span>}
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select
            options={[
              { value: EPaymentStatus.FAILED, label: "Failed" },
              { value: EPaymentStatus.PAID, label: "Paid" },
              { value: EPaymentStatus.PENDING, label: "Pending" },
              { value: EPaymentStatus.REJECTED, label: "Rejected" },
            ]}
            onChange={(value) => form.setFieldValue("status", value)}
          />
        </Form.Item>
        <div className="flex justify-end gap-3">
          <Button onClick={() => setIsModalOpen(false)}>
            {t("payment.modal.btn_cancle")}
          </Button>
          <Button
            htmlType="submit"
            onClick={() => handleUpdatePayment()}
            type="primary"
            loading={isLoading}
          >
            {t("payment.modal.btn_update")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
