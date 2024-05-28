import { CREATE_EVENT_STEPS } from "@/constants";
import { IDetailEvent } from "@/interfaces";
import { useAuthStore } from "@/stores";
import { CreateEventPayload, InitCreateEventPayload } from "@/types";
import { fileExtensions } from "@/utils";
import { Steps, notification } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiImport } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import readXlsxFile from "read-excel-file";
import {
  EventBanner,
  EventInfomation,
  CreateEventReview,
  CreateEventTicket,
} from "./steps";
import { eventsService } from "@/services";

export interface IModifyEventProps {
  create?: boolean;
  event?: IDetailEvent;
}

export function ModifyEvent({ create, event }: IModifyEventProps) {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.profile);

  const [active, setActive] = useState<number>(create ? -1 : 0);
  const [isCreateLoading, setIsCreateLoading] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  const { control, register, handleSubmit, watch, setValue, reset } =
    useForm<CreateEventPayload>({
      defaultValues: event
        ? { ...event, creatorId: user?.id }
        : { ...InitCreateEventPayload, creatorId: user?.id },
      mode: "onChange",
    });

  useEffect(() => {
    if (event) {
      const ConverToFile = async () => {
        try {
          const fileCoverImage = event.coverImage
            ? await fileExtensions.urlToFile(event?.coverImage)
            : "";
          const fileSubImageOne = event?.subImages[0]
            ? await fileExtensions.urlToFile(event?.subImages[0])
            : "";
          const fileSubImageTwo = event?.subImages[1]
            ? await fileExtensions.urlToFile(event?.subImages[1])
            : "";
          const fileSubImageThree = event?.subImages[2]
            ? await fileExtensions.urlToFile(event?.subImages[2])
            : "";
          const fileSubImageFour = event?.subImages[3]
            ? await fileExtensions.urlToFile(event?.subImages[3])
            : "";

          setValue("coverImage", fileCoverImage);
          setValue("eventSubImages", [
            fileSubImageOne,
            fileSubImageTwo,
            fileSubImageThree,
            fileSubImageFour,
          ]);
        } catch (e) {
          console.log(e);
        }
      };
      ConverToFile();
    }
  }, [event]);

  async function handleCreateEvent(data: FormData) {
    setIsCreateLoading(true);
    try {
      await eventsService.createEvent(data);
      setIsCreateLoading(false);
      notification.success({ message: "Create event successfully" });
    } catch (error) {
      setIsCreateLoading(false);
      throw error;
    }
  }

  async function handleUpdateEvent(id: string, data: FormData) {
    setIsUpdateLoading(true);
    try {
      await eventsService.updateEvent(id, data);
      setIsUpdateLoading(false);
      notification.success({ message: "Update event successfully" });
    } catch (error) {
      setIsUpdateLoading(false);
      throw error;
    }
  }

  const onSubmit: SubmitHandler<CreateEventPayload> = async (data: any) => {
    const formData = new FormData();

    for (let key in data) {
      if (
        key === "ticketTypes" ||
        key === "categoryIds" ||
        key === "eventSubImages" ||
        key === "reasons"
      ) {
        if (key === "ticketTypes") {
          data[key].forEach((item: any) =>
            formData.append(key, JSON.stringify(item))
          );
        } else {
          data[key].forEach((item: string) => formData.append(key, item));
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      if (create) {
        await handleCreateEvent(formData);
      } else {
        await handleUpdateEvent(data.id!, formData);
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: "Action failed!" });
    }
  };

  const handleFileImport = (e: any) => {
    e.preventDefault();
    readXlsxFile(e.target.files[0]).then((rows: any) => {
      setValue("name", rows[6][0].toString());
      setValue("categoryIds", JSON.parse(rows[3][1].toString()));
      setValue("eventCycleType", rows[6][2].toString());
      setValue("startTime", rows[6][3].toString());
      setValue("endTime", rows[6][4].toString());
      setValue("location", rows[6][5].toString());
      setValue("description", rows[6][6].toString());
      setValue("reasons", JSON.parse(rows[6][7].toString()));
      setValue("eventSubImages", JSON.parse(rows[6][8].toString()));
      setValue("eventPaymentType", rows[6][9].toString());
      setValue("ticketTypes", JSON.parse(rows[6][10].toString()));
    });
    setActive(0);
  };

  const handleDownloadFile = () => {
    const link = document.createElement("a");
    link.href = "/excel/example-event-import.xlsx";
    link.setAttribute("download", "example-event-import.xlsx");
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL("/excel/example-event-import.xlsx");
  };

  if (active === -1 && create) {
    return (
      <div>
        <div className="flex justify-center w-full gap-12 mt-40">
          <button
            onClick={() => {
              setActive(0);
              reset();
            }}
            className="w-[300px] h-[200px] border-[2px] border-solid border-textGray rounded-lg flex flex-col items-center justify-center gap-2 hover:cursor-pointer"
          >
            <IoCreate size={42} color="var(--header)" />
            <p className={`font-bold text-textGray`}>
              {t("create_event.option_one.title")}
            </p>
            <p className="px-4 text-center text-header">
              {t("create_event.option_one.description")}
            </p>
          </button>
          <div className="z-[9] relative w-[300px] h-[200px] border-[2px] border-solid border-textGray rounded-lg flex flex-col items-center justify-center gap-2 hover:cursor-pointer">
            <input
              className="h-full w-full opacity-0 z-[1] hover:cursor-pointer"
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => handleFileImport(e)}
            />
            <div className="absolute z-[0] h-full w-full rounded-lg flex flex-col items-center justify-center gap-2">
              <BiImport size={42} color="var(--header)" />
              <p className="font-bold text-justify text-textGray">
                {t("create_event.option_two.title")}
              </p>
              <p className="text-center text-header z-[10]">
                {t("create_event.option_two.description")}
              </p>
            </div>
            <button
              onClick={handleDownloadFile}
              className="text-primary hover:underline z-[2] pt-2"
            >
              {t("create_event.option_two.example_file")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full">
        <Steps
          current={active}
          items={CREATE_EVENT_STEPS.map((label: string) => ({
            title: <p className="text-header">{label}</p>,
          }))}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {active === 0 && (
          <EventInfomation
            register={register}
            setValue={setValue}
            watch={watch}
            control={control}
            setActive={(value) => {
              setActive(value);
            }}
            create={create!}
          />
        )}

        {active === 1 && (
          <EventBanner
            coverImage={watch().coverImage}
            subImage={watch().eventSubImages}
            setValue={setValue}
            setActive={(value) => {
              setActive(value);
            }}
          />
        )}

        {active === 2 && (
          <CreateEventTicket
            register={register}
            eventTicketType={watch().eventPaymentType}
            control={control}
            setValue={setValue}
            setActive={(value) => {
              setActive(value);
            }}
          />
        )}

        {active === 3 && (
          <CreateEventReview
            watch={watch}
            setValue={setValue}
            setActive={(value) => {
              setActive(value);
            }}
            disabled={create ? isCreateLoading : isUpdateLoading}
            create={create!}
          />
        )}
      </form>
    </div>
  );
}
