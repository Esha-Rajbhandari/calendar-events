import React from "react";
import moment from "moment";

import { Event, SlotInfo, Views, momentLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import TimeZone from "@/components/TimeZone";
import { SlotTime } from "@/features/calendar/types";
import AddEvent from "@/components/eventForm/AddEvent";
import CalendarWrapper from "@/features/calendar/CalendarWrapper";

const Home = () => {
  const localizer = momentLocalizer(moment);
  const defaultTimezone = moment.tz.guess();

  const [events, setEvents] = React.useState<Event[]>([]);
  const [slotTime, setSlotTime] = React.useState<SlotTime>();
  const [timezone, setTimezone] = React.useState(defaultTimezone);
  const [selectedEvent, setSelectedEvent] = React.useState<Event>();
  const [showAddEventForm, setShowAddEventForm] =
    React.useState<boolean>(false);

  const { defaultDate, views } = React.useMemo(() => {
    moment.tz.setDefault(timezone);

    return {
      defaultDate: new Date(),
      views: Object.keys(Views).map((k) => Views[k as keyof typeof Views]),
    };
  }, [timezone]);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const { start, end } = slotInfo;

    setShowAddEventForm(true);
    setSlotTime({ start, end });
  };

  const handleSelectEvent = (event: Event) => {
    setShowAddEventForm(true);
    setSelectedEvent(event);
  };

  const resetForm = () => {
    setSelectedEvent(undefined);
    setShowAddEventForm(false);
  };

  return (
    <>
      <TimeZone setTimezone={setTimezone} timezone={timezone} />
      <CalendarWrapper
        selectable
        popup
        views={views}
        events={events}
        defaultView="month"
        localizer={localizer}
        defaultDate={defaultDate}
        style={{ height: "100vh" }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />

      {showAddEventForm && (
        <AddEvent
          slotTime={slotTime}
          resetForm={resetForm}
          setEvents={setEvents}
          open={showAddEventForm}
          initialValue={selectedEvent}
          onOpenChange={setShowAddEventForm}
        />
      )}
    </>
  );
};

export default Home;
