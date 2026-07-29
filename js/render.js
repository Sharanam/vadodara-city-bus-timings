import { buildDirections, computeVisibleTimes } from "./schedule.js";
import { formatClock, getISTNowMinutes } from "./time.js";

function renderTimeChip(entry) {
  const chip = document.createElement("span");
  chip.className = `time-chip time-chip--${entry.status}`;
  chip.textContent = formatClock(entry.minutes);
  if (entry.tripLabel) chip.title = entry.tripLabel;
  if (entry.status === "current") chip.title = "Likely still en route";
  return chip;
}

function renderDirection(direction, nowMinutes, showPreviousBuses) {
  const wrapper = document.createElement("div");
  wrapper.className = "direction";

  const label = document.createElement("div");
  label.className = "direction__label";
  label.textContent = `${direction.from} → ${direction.to}`;
  wrapper.appendChild(label);

  const visible = computeVisibleTimes(direction.times, nowMinutes, showPreviousBuses);

  if (visible.length === 0) {
    const empty = document.createElement("p");
    empty.className = "direction__empty";
    empty.textContent = "No more buses today";
    wrapper.appendChild(empty);
    return wrapper;
  }

  const list = document.createElement("div");
  list.className = "time-list";
  visible.forEach((entry) => list.appendChild(renderTimeChip(entry)));
  wrapper.appendChild(list);

  return wrapper;
}

function renderRouteCard(route, nowMinutes, showPreviousBuses) {
  const card = document.createElement("article");
  card.className = "route-card";

  const heading = document.createElement("div");
  heading.className = "route-card__heading";

  const number = document.createElement("h2");
  number.className = "route-card__number";
  number.textContent = `Route ${route.number}`;
  heading.appendChild(number);

  const destination = document.createElement("span");
  destination.textContent = route.stops[1];
  heading.appendChild(destination);

  if (route.note) {
    const note = document.createElement("span");
    note.className = "route-card__note";
    note.textContent = `(${route.note})`;
    heading.appendChild(note);
  }

  card.appendChild(heading);

  buildDirections(route).forEach((direction) => {
    card.appendChild(renderDirection(direction, nowMinutes, showPreviousBuses));
  });

  return card;
}

export function renderRoutes(container, routes, prefs) {
  const nowMinutes = getISTNowMinutes();
  container.innerHTML = "";
  routes.forEach((route) => {
    container.appendChild(renderRouteCard(route, nowMinutes, prefs.showPreviousBuses));
  });
}
