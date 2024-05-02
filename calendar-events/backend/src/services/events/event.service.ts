import * as Events from "../../models/Events";
import * as User from "../../models/Users";
import * as notificationService from "../notifications/notification.service";

export const addEvents = async (events) => {
  try {
    const user = await User.getUser(events[0].created_by);

    if (!user) {
      throw new Error("Cannot create resource. Unauthorized.");
    }

    const eventsPayload = events.map((evt) => ({
      ...evt,
      created_by: user.id,
    }));
    const data = await Events.addEvents(eventsPayload);

    notificationService.scheduleNotification(data);
    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};

export const fetchAllEvents = async (email: string) => {
  try {
    if (email) {
      return fetchEventsByUser(email);
    }

    const data = await Events.fetchAllEvents();

    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};

export const fetchEventsByUser = async (email: string) => {
  try {
    const user = await User.getUser(email);

    if (!user) {
      throw new Error("User does not exist!!");
    }

    const data = await Events.fetchEventsByUser(user.id);

    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};

export const updateEvent = async (eventId, event) => {
  try {
    const user = await User.getUser(event.created_by);

    if (!user) {
      throw new Error("Cannot create resource. Unauthorized.");
    }

    const eventsPayload = {
      ...event,
      created_by: user.id,
    };

    const data = await Events.updateEvent(eventId, eventsPayload);

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
