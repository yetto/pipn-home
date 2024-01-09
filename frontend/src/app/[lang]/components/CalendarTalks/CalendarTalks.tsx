import { Text } from "@radix-ui/themes";
import s from "./CalendarTalks.module.css";
import { formatHour } from "../../utils/functions";
import { UseFormWatch } from "react-hook-form";
import { clsx } from "clsx";
import { format } from "date-fns";
import Image from "next/image";

const days = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

interface ICalendarTalks {
  item: any;
  setValue: any;
  watch: UseFormWatch<any>;
}

const CalendarTalks = (props: ICalendarTalks) => {
  const { item, setValue, watch } = props;
  const { calendarId } = watch();
  const day = days[item.schedules[0].day];
  const startHour = formatHour(String(item.schedules[0].startHour));

  const handleOnSubmit = (id: string) => {
    setValue("calendarId", id);
  };

  const planBodyStyles = clsx({
    [s.root]: true,
    [s.calendarSelected]: calendarId === item._id,
  });

  return (
    <div
      className={planBodyStyles}
      onClick={() => handleOnSubmit(item._id)}
    >
      <div className="flex flex-row">
        <div className={s.leftContainerCalendar}>
          <Image
            src={
              "https://stg.cms.maspreparacion.com/uploads/png_transparent_calender_3d_icon_ecfaf598b5.png"
            }
            alt="calendar"
            width={40}
            height={40}
          />
        </div>
        <div className={s.rigthContainerCalendar}>
          <Text as="div" size="2" weight="bold">
            {day} {format(new Date(item.date), "dd")}, {startHour}
          </Text>
          <Text as="div" color="gray" size="2">
            {format(new Date(item.date), "(dd/MM/yy)")}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default CalendarTalks;
