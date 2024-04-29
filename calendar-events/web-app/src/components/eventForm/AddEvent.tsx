import Modal from "@/ui/Dialog";
import InputField from "@/ui/Input";
import { useForm } from "react-hook-form";
import { Event } from "react-big-calendar";
import { Button } from "@/shadcn/ui/button";
import { SlotTime } from "@/features/calendar/types";
import { mapEventsData } from "@/features/calendar/utils";
import { Dispatch, SetStateAction, useEffect } from "react";
import { addEvents, updateEvents } from "@/features/calendar/service";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shadcn/ui/form";

interface AddEventProps {
  open: boolean;
  resetForm: () => void;
  initialValue?: Event;
  slotTime?: SlotTime;
  onOpenChange: (isOpen: boolean) => void;
  setEvents: Dispatch<SetStateAction<Event[]>>;
}

const AddEvent = (props: AddEventProps) => {
  const { open, onOpenChange, setEvents, slotTime, initialValue, resetForm } =
    props;

  const form = useForm();

  useEffect(() => {
    if (!!initialValue) {
      form.reset({ eventName: initialValue.title, id: initialValue.resource });
    }

    () => form.reset();
  }, [initialValue]);

  const onAddEvent = async (data: any) => {
    const { eventName } = data;

    const calendarEvent = {
      event_name: eventName,
      created_at: new Date(),
      event_end_time: slotTime?.end,
      event_start_time: slotTime?.start,
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
    const { eventName, id } = data;

    const calendarEvent = {
      event_name: eventName,
      updated_at: new Date(),
      event_end_time: slotTime?.end,
      event_start_time: slotTime?.start,
    };

    try {
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
        <form
          onSubmit={
            !!initialValue
              ? form.handleSubmit(onUpdateEvent)
              : form.handleSubmit(onAddEvent)
          }
          className="space-y-4"
        >
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

          <Button variant={"default"}>
            {!initialValue ? "Add Event" : "Update Event"}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default AddEvent;
