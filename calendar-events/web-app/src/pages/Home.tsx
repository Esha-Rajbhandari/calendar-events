import React from "react";
import moment from "moment";

import { Event, SlotInfo, Views, momentLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import Header from "@/components/Header";
import TimeZone from "@/components/TimeZone";
import { isPresentOrFutureDate } from "@/utils";
import useEventsQuery from "@/hooks/useEventsQuery";
import { SlotTime } from "@/features/calendar/types";
import useHolidayQuery from "@/hooks/useHolidayQuery";
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

  const { loading: isHolidaysLoading } = useHolidayQuery({
    onSuccess: setEvents,
  });
  const { loading: isEventsLoading } = useEventsQuery({ onSuccess: setEvents });

  const { defaultDate, views } = React.useMemo(() => {
    moment.tz.setDefault(timezone);

    return {
      defaultDate: new Date(),
      views: Object.keys(Views).map((k) => Views[k as keyof typeof Views]),
    };
  }, [timezone]);

  if (isHolidaysLoading || isEventsLoading) {
    return <></>;
  }

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const { start, end } = slotInfo;
    const isValidStartDate = isPresentOrFutureDate(start);

    if (!isValidStartDate) {
      window.alert("Past date cannot be selected");
    }

    setShowAddEventForm(isValidStartDate);
    setSlotTime({ start: start, end });
  };

  const handleSelectEvent = (event: Event & { isHoliday?: boolean }) => {
    if (event.isHoliday) {
      return;
    }

    setShowAddEventForm(true);
    setSelectedEvent(event);
  };

  const resetForm = () => {
    setSelectedEvent(undefined);
    setShowAddEventForm(false);
  };

  const eventStyleGetter = (event: Event & { isHoliday?: boolean }) => {
    const backgroundColor = event.isHoliday ? "red" : "#3174ad";

    return { style: { backgroundColor } };
  };

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center pt-16">
        <TimeZone
          setTimezone={setTimezone}
          timezone={timezone}
          className="mb-4"
        />
        <CalendarWrapper
          selectable
          popup
          views={views}
          events={events}
          defaultView="month"
          localizer={localizer}
          defaultDate={defaultDate}
          style={{ height: "600px" }}
          eventPropGetter={eventStyleGetter}
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
      </div>
    </>
  );
};

export default Home;
