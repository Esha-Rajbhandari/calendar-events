import * as eventService from "../../services/events/event.js";

export const addEvents = async (req, res, next) => {
  const { body: events } = req;

  return eventService
    .addEvents(events)
    .then((data) => res.send(data))
    .catch((err) => res.status(500))
    .finally(() => next());
};

export const fetchAllEvents = async (req, res, next) => {
  const { email } = req.query;

  return eventService
    .fetchAllEvents(email)
    .then((data) => res.send(data))
    .catch((err) => res.status(500))
    .finally(() => next());
};

export const updateEvent = async (req, res, next) => {
  const { params, body } = req;
  const { id } = params;

  return eventService
    .updateEvent(id, body)
    .then((data) => res.send(data))
    .catch((err) => res.status(500))
    .finally(() => next());
};

export const deleteEvent = async (req, res, next) => {
  const { id } = req.params;

  return eventService
    .deleteEvent(id)
    .then((data) => res.send(data))
    .catch((err) => res.status(500))
    .finally(() => next());
};
