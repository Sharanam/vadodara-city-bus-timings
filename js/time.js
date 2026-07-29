// Route data stores times as 24-hour "HH:MM" strings in IST.

export function toMinutesSinceMidnight(raw) {
  const [hour, minute] = raw.split(":").map(Number);
  return hour * 60 + minute;
}

export function formatClock(minutesSinceMidnight) {
  const hour24 = Math.floor(minutesSinceMidnight / 60);
  const minute = minutesSinceMidnight % 60;
  const suffix = hour24 < 12 ? "AM" : "PM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function formatRelativeTime(minutesSinceMidnight, nowMinutes) {
  const diff = minutesSinceMidnight - nowMinutes;
  if (diff === 0) return "Departing now";

  const distance = Math.abs(diff);
  const hours = Math.floor(distance / 60);
  const minutes = distance % 60;
  const parts = [];
  if (hours) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);

  return diff > 0 ? `In ${parts.join(" ")}` : `${parts.join(" ")} ago`;
}

export function getISTNowMinutes() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const hour = Number(parts.find((p) => p.type === "hour").value);
  const minute = Number(parts.find((p) => p.type === "minute").value);
  return hour * 60 + minute;
}
