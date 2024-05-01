import * as Events from "../../models/Events";
import * as notificationService from "../notifications/notification.service";

export const addEvents = async (events) => {
  try {
    const data = await Events.addEvents(events);

    notificationService.scheduleNotification(data);
    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};

export const fetchAllEvents = async () => {
  try {
    const data = await Events.fetchAllEvents();

    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};

export const updateEvent = async (eventId, event) => {
  try {
    const data = await Events.updateEvent(eventId, event);

    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const data = await Events.deleteEvent(eventId);

    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};
