import { Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { newSchedules } from "../../utils/functions";
import { useEffect, useState } from "react";
import s from "./Calendar.module.css";
import { UseFormWatch } from "react-hook-form";
import { clsx } from "clsx";
import Image from "next/image";

interface ICalendarTalks {
  item: any;
  setValue: any;
  watch: UseFormWatch<any>;
}

const Calendar = (props: ICalendarTalks) => {
  const { item, setValue, watch } = props;
  const { calendarId } = watch();
  const [days, setDays] = useState<any>("");
  const [hours, setHours] = useState<any>("");
  const formater = newSchedules(item.schedules) as any;

  useEffect(() => {
    if (!formater) return;
    const formaterPosition = formater[0];
    setDays(formaterPosition?.compiladoDias);
    setHours(formaterPosition?.horario);
  }, [formater]);

  const planBodyStyles = clsx({
    [s.root]: true,
    [s.calendarSelected]: calendarId === item._id,
  });

  const handleOnSubmit = (id: string) => {
    setValue("calendarId", id);
  };

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
            Inicio: {format(new Date(item.startDate), "dd/MM/yyyy")}
          </Text>
          <Text as="div" size="2" weight="bold">
            Grupo: {item.name}
          </Text>
          <Text as="div" color="gray" size="2">
            {hours}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
