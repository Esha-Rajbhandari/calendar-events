import Modal from "@/ui/Dialog";
import InputField from "@/ui/Input";
import { useForm } from "react-hook-form";
import { Event } from "react-big-calendar";
import { Button } from "@/shadcn/ui/button";
import { SlotTime } from "@/features/calendar/types";
import { mapEventsData } from "@/utils";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import {
  addEvents,
  deleteEvent,
  updateEvents,
} from "@/features/calendar/service";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shadcn/ui/form";
import DatePicker from "@/ui/DatePicker";
import LoginContext from "@/context/login/LoginContext";
import Dropdown from "@/ui/Select";
import TeamMemberDropdown from "../TeamMemberDropdown";

interface AddEventProps {
  open: boolean;
  resetForm: () => void;
  initialValue?: Event & { isHoliday?: boolean; description?: string };
  slotTime?: SlotTime;
  onOpenChange: (isOpen: boolean) => void;
  setEvents: Dispatch<SetStateAction<Event[]>>;
}

const AddEvent = (props: AddEventProps) => {
  const { open, onOpenChange, setEvents, slotTime, initialValue, resetForm } =
    props;

  const form = useForm();
  const { user } = useContext(LoginContext);

  useEffect(() => {
    if (!!initialValue) {
      form.reset({
        eventName: initialValue.title,
        id: initialValue.resource,
        eventDescription: initialValue.description,
        eventDateRange: { from: initialValue.start, to: initialValue.end },
      });
    }

    () => form.reset();
  }, [initialValue]);

  const onAddEvent = async (data: any) => {
    const { eventName, eventDescription, eventDateRange, eventParticipants } =
      data;

    const calendarEvent = {
      created_by: user.email,
      event_name: eventName,
      created_at: new Date(),
      description: eventDescription,
      event_end_time: eventDateRange?.to,
      event_start_time: eventDateRange?.from,
      participants: eventParticipants.map((ep: any) => ep.value),
    };

    try {
      const data = await addEvents([calendarEvent]);

      const mappedData = mapEventsData(data);

      setEvents((prevEvents) => [...prevEvents, ...mappedData]);
    } catch (err) {
      console.error(err);
    }

    resetForm();
  };

  const onUpdateEvent = async (data: any) => {
    const { eventName, id, eventDescription, eventDateRange } = data;

    const calendarEvent = {
      created_by: user.email,
      event_name: eventName,
      updated_at: new Date(),
      description: eventDescription,
      event_end_time: eventDateRange.to,
      event_start_time: eventDateRange.from,
    };

    try {
      if (!!initialValue?.title && eventName === initialValue.title) {
        return;
      }

      const data = await updateEvents(calendarEvent, id);

      const mappedData = mapEventsData(data);

      setEvents((prevEvents) => {
        const filteredEvent = prevEvents.filter(
          (event) => event.title !== initialValue?.title
        );

        return [...filteredEvent, ...mappedData];
      });
    } catch (err) {
      console.error(err);
    } finally {
      resetForm();
    }
  };

  const handleDelete = async () => {
    try {
      const [data] = await deleteEvent(initialValue?.resource);

      setEvents((prevEvents) =>
        prevEvents.filter((ev) => ev.resource !== data?.id)
      );
    } catch (err) {
      console.error(err);
    }

    resetForm();
  };

  return (
    <Modal
      title={"Add an event to your calendar."}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <InputField placeholder="Event name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDescription"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <InputField placeholder="Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            defaultValue={{
              from: slotTime?.start,
              to: slotTime?.end,
            }}
            name="eventDateRange"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Select date range</FormLabel>
                <FormControl>
                  <DatePicker field={field} placeholder="Select date range" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventParticipants"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Select participants</FormLabel>
                <FormControl>
                  <TeamMemberDropdown field={field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-row">
            <Button
              variant={"default"}
              onClick={
                !!initialValue
                  ? form.handleSubmit(onUpdateEvent)
                  : form.handleSubmit(onAddEvent)
              }
            >
              {!initialValue ? "Add Event" : "Update Event"}
            </Button>
            <Button variant={"outline"} className="ml-2" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEvent;
