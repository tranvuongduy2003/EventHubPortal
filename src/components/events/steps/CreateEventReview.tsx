import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Switch from "react-switch";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoLocationOutline, IoTicketOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { EventLocation } from "@/components/common";
import { useAuthStore } from "@/stores";
import { CreateEventPayload } from "@/types";
import { CircularProgress } from "@mui/material";
// eslint-disable-next-line no-redeclare
import { Image } from "antd";

interface ICreateEventReviewProps {
  watch: UseFormWatch<CreateEventPayload>;
  setValue: UseFormSetValue<CreateEventPayload>;
  setActive: (value: number) => void;
  disabled: boolean;
  create: boolean;
}
export function CreateEventReview({
  setActive,
  watch,
  setValue,
  disabled,
  create,
}: ICreateEventReviewProps) {
  const { t } = useTranslation();

  const user = useAuthStore((state) => state.profile);

  return (
    <div className="w-full px-40 mt-10">
      <div className="flex flex-col gap-6 border-[3px] border-textGray rounded-2xl p-10">
        <div className="h-[500px]">
          <Image
            src={
              watch().coverImage ? URL.createObjectURL(watch().coverImage) : ""
            }
            width={"100%"}
            height={"100%"}
            fallback="/event-poster.png"
            alt="event-poster"
            loading="lazy"
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <h1>{watch().name}</h1>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-header">
              {t("create_event.review.public")}:
            </p>
            <Switch
              onChange={() => {
                setValue("isPrivate", !watch().isPrivate);
              }}
              checked={!watch().isPrivate}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-full gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-3">
                <h4 className="text-header">
                  {t("create_event.review.datet_time_label")}
                </h4>
                <div className="flex items-center gap-1">
                  <FaRegCalendarAlt color="gray" size="24px" />

                  <p className="text-header">
                    {dayjs(watch().startTime)
                      .format("dddd, DD MMMM YYYY")
                      ?.toString()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <IoMdTime color="gray" size="24px" />

                  <p className="text-header">
                    {dayjs(watch().startTime)
                      .format("hh:mm A YYYY/MM/DD")
                      ?.toString()}{" "}
                    -{" "}
                    {dayjs(watch().endTime)
                      .format("hh:mm A YYYY/MM/DD")
                      ?.toString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="mb-4 text-xl font-bold text-black text-header">
                  {t("create_event.review.ticket_information")}
                </h3>
                <div className="flex items-center gap-2">
                  <IoTicketOutline />
                  <p className="text-header">
                    {t("create_event.ticket_type")}: {watch().eventPaymentType}/
                    {t("create_event.review.ticket_sub")}
                  </p>
                </div>
                {watch().ticketTypes.map((ticket, index) => (
                  <p
                    key={`ticket-${index}`}
                    className="flex justify-between w-full gap-2"
                  >
                    <span className="text-header">
                      {index + 1}.{" "}
                      <span className="font-bold">{ticket.name}:</span>
                    </span>
                    <span className="font-bold text-primary">
                      {ticket.price}.000 VND
                    </span>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-header">
                {t("create_event.review.location_title")}
              </h4>
              <div className="flex gap-1">
                <IoLocationOutline color="gray" size="24px" />
                <p className="max-w-[500px] text-header">{watch().location}</p>
              </div>
              {watch().location && (
                <EventLocation location={watch().location} />
              )}
            </div>
            <div className="flex flex-col gap-8">
              <div className="space-y-2">
                <h5>{t("create_event.review.organization_title")}</h5>
                <div className="flex items-center gap-3">
                  <Image
                    height={50}
                    width={50}
                    src={user?.avatar}
                    alt="user-avatar"
                    fallback="/empty-avatar.png"
                    className="object-cover rounded-full"
                  />
                  <p className="font-semibold text-header">
                    {user?.userName || user?.fullName}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <h5>{t("create_event.review.description_title")}</h5>
                <p className="text-header">{watch().description}</p>
                <h6>
                  {watch().reasons.length}{" "}
                  {t("create_event.review.reasons_event")}:
                </h6>
                {watch().reasons.map((reason, index) => (
                  <p key={`reason-${index}`} className="text-header">
                    {index + 1}. {reason}.
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center w-full gap-8">
              {watch().eventSubImages.map(
                (image: any, index: number) =>
                  image && (
                    <img
                      key={`subimage-${index}`}
                      loading="lazy"
                      className="h-[200px] w-[200px] rounded-lg"
                      src={image ? URL.createObjectURL(image) : ""}
                      alt=""
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end w-full gap-4 mt-10">
        <button
          className="btn bg-textGray hover:text-white"
          onClick={() => {
            setActive(2);
          }}
        >
          {t("create_event.button_back")}
        </button>
        <button
          disabled={disabled}
          type="submit"
          className="btn btn--primary w-[200px]"
        >
          {disabled ? (
            <CircularProgress size={24} />
          ) : create ? (
            t("create_event.review.button_create")
          ) : (
            t("create_event.review.button_update")
          )}
        </button>
      </div>
    </div>
  );
}
