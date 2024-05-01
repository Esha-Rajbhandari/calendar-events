import { Calendar, CalendarProps } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

const CalendarWrapper = (props: CalendarProps) => {
  const {
    views,
    style,
    popup,
    events,
    localizer,
    selectable,
    onSelectSlot,
    eventPropGetter,
    onSelectEvent,
    defaultView = "month",
    defaultDate = new Date(),
  } = props;

  return (
    <Calendar
      popup={popup}
      views={views}
      style={style}
      events={events}
      selectable={selectable}
      localizer={localizer}
      defaultView={defaultView}
      defaultDate={defaultDate}
      onSelectSlot={onSelectSlot}
      eventPropGetter={eventPropGetter}
      onSelectEvent={onSelectEvent}
    />
  );
};

export default CalendarWrapper;
