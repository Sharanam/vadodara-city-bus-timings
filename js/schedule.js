import { toMinutesSinceMidnight } from "./time.js";

export function buildDirections(route) {
  return route.stops.map((from, columnIndex) => {
    const to = route.stops[1 - columnIndex];
    const times = route.trips
      .flatMap((trip) =>
        trip.schedule.map((row) => {
          const raw = row[columnIndex];
          return { raw, minutes: toMinutesSinceMidnight(raw), tripLabel: trip.label };
        })
      )
      .sort((a, b) => a.minutes - b.minutes);

    return { from, to, times };
  });
}

// Keep every upcoming time, plus the single most recent past time (still
// presumed en route). Earlier past times are dropped unless requested.
export function computeVisibleTimes(times, nowMinutes, showPreviousBuses) {
  let lastPastIndex = -1;
  times.forEach((entry, index) => {
    if (entry.minutes < nowMinutes) lastPastIndex = index;
  });

  return times
    .map((entry, index) => {
      let status = "upcoming";
      if (index < lastPastIndex) status = "past";
      else if (index === lastPastIndex) status = "current";
      return { ...entry, status };
    })
    .filter((entry) => showPreviousBuses || entry.status !== "past");
}
