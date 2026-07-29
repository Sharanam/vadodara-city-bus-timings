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
