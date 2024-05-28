import { EventLocation } from "@/components/common";
import { EEventCycleType } from "@/enums";
import { ICategory } from "@/interfaces";
import { useCategoriesStore } from "@/stores";
import { CreateEventPayload } from "@/types";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { notification } from "antd";
import { useEffect, useState } from "react";
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiSearch } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CategoryItem } from "@/components/categories/CategoryItem";

export interface IEventInfomationProps {
  create: boolean;
  register: UseFormRegister<CreateEventPayload>;
  setValue: UseFormSetValue<CreateEventPayload>;
  watch: UseFormWatch<CreateEventPayload>;
  control: Control<CreateEventPayload, any>;
  setActive: (value: number) => void;
}

export function EventInfomation({
  create,
  setActive,
  register,
  watch,
  control,
  setValue,
}: IEventInfomationProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { categories } = useCategoriesStore((state) => state);

  const [checkMap, setCheckMap] = useState<boolean>(false);
  const [enableCheckError, setEnableCheckError] = useState<boolean>(false);

  const {
    fields: reasons,
    append: appendReasons,
    remove: removeReasons,
  } = useFieldArray({
    control,
    name: "reasons",
  });

  const {
    fields: categoryIds,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "categoryIds",
  });

  const handleLocation = async () => {
    setCheckMap(true);
  };

  useEffect(() => {
    setCheckMap(false);
  }, [watch().location]);

  const handleNextStep = () => {
    setEnableCheckError(true);
    if (
      watch().name &&
      watch().categoryIds.length &&
      watch().eventCycleType &&
      watch().startTime &&
      watch().endTime &&
      watch().location &&
      watch().description
    ) {
      setActive(1);
    } else {
      notification.error({ message: "Please enter full information" });
    }
  };

  return (
    <div className="relative min-h-screen pt-10 pb-20 pl-24 space-y-10 fl ">
      <div className="flex items-end gap-2 ">
        <div className="h-[200px] w-[200px] flex flex-col gap-4 items-end justify-between">
          <p className="py-2 font-semibold text-md text-header">
            {t("create_event.information.event_detail.event_title")}{" "}
            <span className="text-textError">*</span>
          </p>
          <p className="py-2 font-semibold text-md text-header">
            {t("create_event.information.event_detail.event_category")}{" "}
            <span className="text-textError">*</span>
          </p>
          <p className="py-2 font-semibold text-md text-header">
            {t("create_event.information.event_detail.event_type.title")}{" "}
            <span className="text-textError">*</span>
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-semibold text-header">
            {t("create_event.information.event_detail.title")}
          </p>
          <div className="h-[200px] flex flex-col gap-4 w-[600px] justify-between">
            <FormControl sx={{ color: "text-header" }}>
              <TextField
                sx={{
                  "& label": { color: "var(--header)" },
                  "& .MuiOutlinedInput-input": {
                    color: "var(--header)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--header)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--header)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--header)",
                    },
                  },
                }}
                error={enableCheckError ? (watch().name ? false : true) : false}
                {...register("name", { required: true })}
                name="name"
                label={t(
                  "create_event.information.event_detail.event_title_placeholder"
                )}
                size="small"
                className="text-header"
              />
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="medium">
              <InputLabel
                error={
                  enableCheckError ? (categoryIds.length ? false : true) : false
                }
              >
                <p className="text-header">
                  {t(
                    "create_event.information.event_detail.event_category_placeholder"
                  )}
                </p>
              </InputLabel>

              <Select
                error={
                  enableCheckError ? (categoryIds.length ? false : true) : false
                }
                name="categories"
                label="Choose category"
                defaultValue=""
                sx={{
                  "& .MuiOutlinedInput-input": {
                    opacity: 0,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--header)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--header)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--header)",
                    },
                  },
                }}
                startAdornment={
                  <div className="flex items-center gap-3">
                    {watch().categoryIds?.map((category, index) => {
                      const categorySelect = categories.find(
                        (categoryStore) => categoryStore.id === category
                      );
                      return (
                        categorySelect && (
                          <div
                            key={`categories-select-${index}`}
                            className="relative flex items-center gap-2 p-2 bg-gray-200 rounded-xl"
                          >
                            <button
                              onClick={() => {
                                removeCategory(index);
                              }}
                              className="z-[1000] flex items-center justify-center absolute w-4 h-4 rounded-[4px] bg-rose-600 -top-1 -right-1"
                            >
                              <GrClose color="#fff" />
                            </button>
                            <div className="flex flex-row items-center gap-2">
                              <div
                                style={{
                                  backgroundColor: categorySelect?.color,
                                }}
                                className={`w-[30px] h-[30px] rounded-lg bg-[${categorySelect?.color}] flex items-center justify-center`}
                              >
                                <img
                                  loading="lazy"
                                  className="w-[20px] h-[20px]"
                                  src={categorySelect?.iconImage}
                                />
                              </div>
                            </div>
                            <div className="truncate">
                              {categorySelect?.name}
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                }
                onChange={(e) => {
                  appendCategory(e.target.value);
                }}
              >
                {categories?.map((category: ICategory, index: number) => (
                  <MenuItem
                    defaultValue=""
                    key={`category-${index}`}
                    value={category.id}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "8px",
                    }}
                  >
                    <CategoryItem category={category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <RadioGroup
                {...register("eventCycleType")}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={watch().eventCycleType}
                onChange={(e: any) => {
                  setValue("eventCycleType", e.target.value);
                }}
              >
                <FormControlLabel
                  value={EEventCycleType.SINGLE}
                  control={<Radio sx={{ color: "var(--header)" }} />}
                  label={t(
                    "create_event.information.event_detail.event_type.label_one"
                  )}
                  sx={{ color: "var(--header)" }}
                />
                <FormControlLabel
                  value={EEventCycleType.RECURRING}
                  control={<Radio sx={{ color: "var(--header)" }} />}
                  label={t(
                    "create_event.information.event_detail.event_type.label_two"
                  )}
                  sx={{ color: "var(--header)" }}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-2 ">
        <div className="w-[200px] h-[60px] flex flex-col gap-4 items-end justify-center">
          <p className="font-semibold text-md text-header">
            {t("create_event.information.event_datetime.seesion.title")}{" "}
            <span className="text-textError">*</span>
          </p>
        </div>
        <div className="flex flex-col gap-4 w-[600px]">
          <p className="text-2xl font-semibold text-header">
            {t("create_event.information.event_datetime.title")}
          </p>
          <div className="w-[600px] h-[60px] flex items-center justify-between flex-wrap gap-2">
            <FormControl>
              <FormLabel sx={{ fontWeight: "bold" }}>
                <p className="text-header">
                  {t(
                    "create_event.information.event_datetime.seesion.label_one"
                  )}
                </p>
              </FormLabel>
              <TextField
                {...register("startTime")}
                error={
                  enableCheckError ? (watch().startTime ? false : true) : false
                }
                sx={{
                  width: "250px",
                  "& .MuiOutlinedInput-input": {
                    color: "var(--header)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--header)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--header)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--header)",
                    },
                  },
                }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdDateRange color="var(--header)" />
                    </InputAdornment>
                  ),
                }}
                type="datetime-local"
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ fontWeight: "bold" }}>
                <p className="text-header">
                  {t(
                    "create_event.information.event_datetime.seesion.label_two"
                  )}
                </p>
              </FormLabel>
              <TextField
                sx={{
                  width: "250px",
                  "& .MuiOutlinedInput-input": {
                    color: "var(--header)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--header)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--header)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--header)",
                    },
                  },
                }}
                {...register("endTime")}
                error={
                  enableCheckError ? (watch().endTime ? false : true) : false
                }
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdDateRange color="var(--header)" />
                    </InputAdornment>
                  ),
                }}
                type="datetime-local"
              />
            </FormControl>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-[200px] flex pt-10">
          <p className="pl-12 font-semibold text-center text-md text-header">
            {t("create_event.information.location.label")}
          </p>
          <span className="text-textError">*</span>
        </div>
        <div className="h-50 flex flex-col gap-4 w-[600px]">
          <p className="text-2xl font-semibold text-header">
            {t("create_event.information.location.title")}
          </p>
          <FormControl>
            <TextField
              sx={{
                "& label": { color: "var(--header)" },
                "& .MuiOutlinedInput-input": {
                  color: "var(--header)",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--header)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--header)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--header)",
                  },
                },
              }}
              {...register("location")}
              error={
                enableCheckError ? (watch().location ? false : true) : false
              }
              id="outlined-basic"
              label={t("create_event.information.location.placeholder")}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className="hover:cursor-pointer"
                  >
                    <BiSearch
                      size={32}
                      onClick={handleLocation}
                      color="var(--header)"
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          {checkMap && <EventLocation location={watch().location} />}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-[200px] flex flex-col gap-4 items-end">
          <p className="pt-12 pl-6 font-semibold text-center text-md text-header">
            {t("create_event.information.description.label")}{" "}
            <span className="text-textError">*</span>
          </p>
        </div>
        <div className="h-50 flex flex-col gap-4 w-[600px]">
          <p className="text-2xl font-semibold text-header">
            {t("create_event.information.description.title")}
          </p>
          <FormControl>
            <TextField
              sx={{
                "& label": { color: "var(--header)" },
                "& .MuiOutlinedInput-input": {
                  color: "var(--header)",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--header)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--header)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--header)",
                  },
                },
              }}
              error={
                enableCheckError ? (watch().description ? false : true) : false
              }
              {...register("description")}
              multiline={true}
              rows={4}
              id="outlined-basic"
              label={t("create_event.information.description.placeholder")}
            />
          </FormControl>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-[200px] flex flex-col gap-4 items-end">
          <p className="pt-12 pl-6 font-semibold text-center text-md text-header">
            {t("create_event.information.reason.label")}
          </p>
        </div>
        <div className="h-50 flex flex-col gap-4 w-[600px]">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold text-header">
              {t("create_event.information.reason.title")}
            </p>
            <IoMdAddCircleOutline
              color="var(--header)"
              size={30}
              className="hover:cursor-pointer"
              onClick={() => {
                appendReasons("");
              }}
            />
          </div>

          {reasons?.map((field: any, index: any) => (
            <FormControl key={field.id} sx={{ color: "#fff" }}>
              <TextField
                sx={{
                  "& label": { color: "var(--header)" },
                  "& .MuiOutlinedInput-input": {
                    color: "var(--header)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--header)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--header)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--header)",
                    },
                  },
                }}
                {...register(`reasons.${index}`)}
                id="outlined-basic"
                label={`${t("create_event.information.reason.placeholder")} ${
                  index + 1
                }`}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className="hover:cursor-pointer"
                    >
                      <CiCircleRemove
                        color="var(--header)"
                        size={32}
                        onClick={() => {
                          removeReasons(index);
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          ))}
        </div>
      </div>

      <div className="absolute flex items-center gap-4 right-8">
        <button
          className="btn bg-textGray hover:text-white"
          onClick={() => {
            create ? setActive(-1) : navigate(-1);
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
