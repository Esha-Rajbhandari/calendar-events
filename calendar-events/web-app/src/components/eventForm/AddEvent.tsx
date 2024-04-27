import Modal from "@/ui/Dialog";
import InputField from "@/ui/Input";
import { useForm } from "react-hook-form";
import { Event } from "react-big-calendar";
import { Button } from "@/shadcn/ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SlotTime } from "@/features/calendar/types";

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
      form.reset({ eventName: initialValue.title });
    }

    () => form.reset();
  }, [initialValue]);

  const onAddEvent = (data: any) => {
    const { eventName } = data;

    const calendarEvent: Event = {
      title: eventName,
      end: slotTime?.end,
      start: slotTime?.start,
    };

    setEvents((prevEvents) => [...prevEvents, calendarEvent]);
    resetForm();
  };

  const onUpdateEvent = (data: any) => {
    const { eventName } = data;

    const calendarEvent: Event = {
      title: eventName,
      end: slotTime?.end,
      start: slotTime?.start,
    };

    setEvents((prevEvents) => {
      const filteredEvent = prevEvents.filter(
        (event) => event.title !== initialValue?.title
      );

      return [...filteredEvent, calendarEvent];
    });

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
