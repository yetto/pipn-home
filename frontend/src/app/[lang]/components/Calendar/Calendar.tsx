import { Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { newSchedules } from "../../utils/functions";
import { useEffect, useState } from "react";
import s from "./Calendar.module.css";

const Calendar = (group: any) => {
  const [days, setDays] = useState<any>("");
  const [hours, setHours] = useState<any>("");
  const formater = newSchedules(group.group.schedules) as any;

  useEffect(() => {
    if (!formater) return;
    const formaterPosition = formater[0];
    setDays(formaterPosition?.compiladoDias);
    setHours(formaterPosition?.horario);
  }, [formater]);

  return (
    <div className={s.root}>
      <div>
        <Text as="div" size="2" weight="bold">
          {format(new Date(group.group.startDate), "dd/MM/yyyy")}
        </Text>
        <Text as="div" color="gray" size="2">
          {days}
        </Text>
        <Text as="div" color="gray" size="2">
          {hours}
        </Text>
      </div>
    </div>
  );
};

export default Calendar;
