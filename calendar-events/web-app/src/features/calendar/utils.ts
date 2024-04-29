import { Event } from "react-big-calendar";

export function mapEventsData(events: any[]) {
  const mappedData: Event[] = events.map((evt: any) => ({
    title: evt.event_name,
    start: new Date(evt.event_start_time),
    end: new Date(evt.event_end_time),
    resource: evt.id,
  }));

  return mappedData;
}

export function interpolate(str: string, value: any) {
  const chunk = str.split("/");

  const interpolatedChunk = chunk.reduce((acc, ch) => {
    if (ch.startsWith(":")) {
      const key = ch.substring(1);

      return [...acc, value[key]];
    }

    return [...acc, ch];
  }, [] as string[]);

  const result = interpolatedChunk.join("/");

  return result;
}
