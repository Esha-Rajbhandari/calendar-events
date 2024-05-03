import connection from "../db.js";

const TABLE_NAME = "events";

export async function addEvents(events) {
  const data = await connection.batchInsert(TABLE_NAME, events).returning("*");

  return data;
}

export async function fetchAllEvents() {
  const data = await connection.select("*").from(TABLE_NAME);

  return data;
}

export async function fetchEventsByUser(userId: number) {
  const data = await connection
    .select("*")
    .from(TABLE_NAME)
    .where("created_by", userId)
    .orWhere("created_for", userId);

  return data;
}

export async function updateEvent(eventId: number, event) {
  const data = await connection(TABLE_NAME)
    .where("id", eventId)
    .update(event)
    .returning("*");

  return data;
}

export async function deleteEvent(eventId: number) {
  const data = await connection(TABLE_NAME)
    .where("id", eventId)
    .del()
    .returning("id");

  return data;
}
