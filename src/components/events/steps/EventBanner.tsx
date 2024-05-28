import { CreateEventPayload } from "@/types";
import { MediaDropPlaceholder } from "@/components/common";
import { notification } from "antd";
import { UseFormSetValue } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { useTranslation } from "react-i18next";

interface IEventBannerProps {
  coverImage: any;
  subImage: any[];
  setActive: (value: number) => void;
  setValue: UseFormSetValue<CreateEventPayload>;
}
export function EventBanner({
  setActive,
  setValue,
  coverImage,
  subImage,
}: IEventBannerProps) {
  const { t } = useTranslation();

  const converCoverImageToBase64 = (e: any) => {
    const image = e.target.files[0];

    setValue("coverImage", image);
  };

  const convertSubImageToBase64 = (e: any, index: number) => {
    const newSubImage: any = [...subImage];
    newSubImage[index] = e.target.files[0];
    setValue("eventSubImages", newSubImage);
  };

  const handleNextStep = () => {
    if (coverImage && subImage.some((image) => image)) {
      setActive(2);
    } else {
      notification.error({ message: "Please choose image for event" });
    }
  };

  return (
    <div className="relative min-h-screen px-40 pt-10 pb-20 space-y-10">
      <h1 className="text-2xl font-semibold text-header">
        {t("create_event.banner.cover_image")}
      </h1>
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-4/5 h-[300px] flex items-center justify-center text-white rounded-xl media-dropzone  2xl:col-span-2">
          <img
            loading="lazy"
            className={`absolute h-full w-full rounded-[8px] outline-none opacity-${
              coverImage ? "1" : "0"
            }`}
            src={coverImage ? URL.createObjectURL(coverImage) : ""}
          />
          <input
            aria-label=""
            title=""
            accept="image/*"
            type="file"
            className="h-full w-full bg-transparent rounded-xl hover:cursor-pointer z-[999] outline-none opacity-0"
            onChange={converCoverImageToBase64}
            alt="No avtar"
            onClick={(event: any) => (event.target.value = null)}
          />
          {!coverImage ? (
            <div className="absolute">
              <MediaDropPlaceholder text="CoverImage" />
            </div>
          ) : (
            <div className="absolute z-[1000] hover:cursor-pointer right-4 bottom-4">
              <BiTrash
                size={32}
                onClick={() => {
                  URL.revokeObjectURL(coverImage);
                  setValue("coverImage", "");
                }}
                color={coverImage ? "white" : "#333"}
              />
            </div>
          )}
        </div>

        <h1 className="text-2xl font-semibold text-header ">
          {t("create_event.banner.subs_image")}
        </h1>
        <div className="flex items-center gap-8">
          {[0, 1, 2, 3].map((_, index) => (
            <div
              key={`subimage-${index}`}
              className="relative w-[200px] border-[2px] h-[100[px]] media-dropzone"
            >
              <img
                loading="lazy"
                className={`absolute h-full w-full rounded-[6px] outline-none opacity-${
                  subImage[index] ? "1" : "0"
                }`}
                src={
                  subImage[index] ? URL.createObjectURL(subImage[index]) : ""
                }
                alt=""
              />
              <input
                title=""
                accept="image/*"
                type="file"
                className={`h-full w-full bg-transparent rounded-xl hover:cursor-pointer z-[999] outline-none opacity-0`}
                onChange={(e) => convertSubImageToBase64(e, index)}
                alt="No avtar"
                onClick={(event: any) => (event.target.value = null)}
              />
              {!subImage[index] ? (
                <div className="absolute">
                  <MediaDropPlaceholder text="CoverImage" />
                </div>
              ) : (
                <div className="absolute z-[1000] hover:cursor-pointer right-4 bottom-4">
                  <BiTrash
                    size={32}
                    onClick={() => {
                      const newsubImage: any = [...subImage];
                      newsubImage[index] = "";
                      setValue("eventSubImages", newsubImage);
                    }}
                    color={subImage[index] ? "white" : "#333"}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute flex items-center gap-4 right-8">
        <button
          className="btn bg-textGray hover:text-white"
          onClick={() => {
            setActive(0);
          }}
        >
          {t("create_event.button_back")}
        </button>
        <button className=" btn btn--primary" onClick={handleNextStep}>
          {t("create_event.button_continue")}
        </button>
      </div>
    </div>
  );
}
