import { EEventPaymentType } from "@/enums";
import { CreateEventPayload, InitCreateEventTicketPayload } from "@/types";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CiCircleRemove } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoPricetagOutline, IoTicketOutline } from "react-icons/io5";

interface ICreateEventTicketProps {
  register: UseFormRegister<CreateEventPayload>;
  eventTicketType: EEventPaymentType;
  setValue: UseFormSetValue<CreateEventPayload>;
  control: Control<CreateEventPayload, any>;
  setActive: (value: number) => void;
}

export function CreateEventTicket({
  setActive,
  control,
  register,
  eventTicketType,
  setValue,
}: ICreateEventTicketProps) {
  const { t } = useTranslation();

  const {
    fields: tickets,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "ticketTypes",
  });

  const handleNextStep = () => {
    setActive(3);
  };

  return (
    <div className="relative min-h-screen px-40 pt-10 pb-20 space-y-10">
      <div className="space-y-4">
        <p className="text-xl font-bold tracking-wider text-header">
          {t("create_event.ticket.title")}
        </p>
        <div className="flex items-center gap-8">
          <div
            onClick={() => setValue("eventPaymentType", EEventPaymentType.PAID)}
            className={`border-[2px] border-solid ${
              eventTicketType === EEventPaymentType.PAID
                ? "border-primary"
                : "border-textGray"
            } rounded-lg py-4 px-12 flex flex-col items-center justify-center hover:cursor-pointer`}
          >
            <IoTicketOutline
              size={42}
              color={
                eventTicketType === EEventPaymentType.PAID ? "#3D56F0" : "#333"
              }
            />
            <p
              className={`font-bold  text-${
                eventTicketType === EEventPaymentType.PAID
                  ? "primary"
                  : "textGray"
              }`}
            >
              {t("create_event.ticket.option_one.label")}
            </p>
            <p className="text-header">
              {t("create_event.ticket.option_one.description")}
            </p>
          </div>
          <div
            onClick={() => setValue("eventPaymentType", EEventPaymentType.FREE)}
            className={`border-[2px] border-solid ${
              eventTicketType === EEventPaymentType.FREE
                ? "border-primary"
                : "border-textGray"
            } rounded-lg py-4 px-12 flex flex-col items-center justify-center hover:cursor-pointer`}
          >
            <img
              loading="lazy"
              src="/free.png"
              alt="free"
              className="w-[42px]"
            />
            <p
              className={`font-bold text-${
                eventTicketType === EEventPaymentType.FREE
                  ? "primary"
                  : "textGray"
              }`}
            >
              {t("create_event.ticket.option_two.label")}
            </p>
            <p className="text-header">
              {t("create_event.ticket.option_two.description")}
            </p>
          </div>
        </div>
      </div>
      {eventTicketType === EEventPaymentType.PAID && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold tracking-wider text-header">
              {t("create_event.ticket.ticket_title")}
            </p>
            <IoMdAddCircleOutline
              size={30}
              className="hover:cursor-pointer text-header"
              onClick={() => {
                append(InitCreateEventTicketPayload);
              }}
            />
          </div>
          {tickets.map((ticket, index) => (
            <div className="flex items-center gap-8" key={ticket.id}>
              <FormControl>
                <FormLabel
                  sx={{
                    fontWeight: "bold",
                    mb: "4px",
                  }}
                >
                  <p className="text-header">
                    {t("create_event.ticket.ticket_name")}
                  </p>
                </FormLabel>
                <div className="text-header">
                  <TextField
                    {...register(`ticketTypes.${index}.name`)}
                    sx={{
                      width: "300px",
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
                    id="outlined-basic"
                    label="Enter the name of the ticket"
                    size="small"
                  />
                </div>
              </FormControl>
              <FormControl>
                <FormLabel sx={{ fontWeight: "bold", mb: "4px" }}>
                  <p className="text-header">
                    {t("create_event.ticket.ticket_quantity")}
                  </p>
                </FormLabel>
                <TextField
                  type="number"
                  {...register(`ticketTypes.${index}.quantity`)}
                  sx={{
                    width: "300px",
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
                  id="outlined-basic"
                  size="small"
                />
              </FormControl>
              <FormControl>
                <FormLabel sx={{ fontWeight: "bold", mb: "4px" }}>
                  <p className="text-header">
                    {t("create_event.ticket.ticket_price")}
                  </p>
                </FormLabel>
                <TextField
                  type="number"
                  {...register(`ticketTypes.${index}.price`)}
                  defaultValue="0.00"
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
                        <IoPricetagOutline color="var(--header)" />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <button>
                <CiCircleRemove
                  color="var(--header)"
                  size={32}
                  onClick={() => remove(index)}
                />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="absolute flex items-center gap-4 right-8">
        <button
          className="btn bg-textGray hover:text-white"
          onClick={() => {
            setActive(1);
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
