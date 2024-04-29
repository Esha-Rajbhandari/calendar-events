import * as eventService from "../../services/events/event.service";

export const addEvents = async (req, res, next) => {
  const { body: events } = req;

  return eventService
    .addEvents(events)
    .then((data) => res.send(data))
    .catch((err) => res.status(500))
    .finally(() => next());
};

export const fetchAllEvents = async (req, res, next) => {
  return eventService
    .fetchAllEvents()
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
