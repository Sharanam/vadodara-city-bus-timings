import { buildDirections, computeVisibleTimes } from "./schedule.js";
import { formatClock, getISTNowMinutes } from "./time.js";
import { attachLiveTooltip } from "./tooltip.js";

function renderTimeChip(entry) {
  const chip = document.createElement("span");
  chip.className = `time-chip time-chip--${entry.status}`;
  chip.textContent = formatClock(entry.minutes);
  attachLiveTooltip(chip, entry.minutes);
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

function renderStarToggle(route, isFavourite, onToggleFavourite) {
  const star = document.createElement("button");
  star.type = "button";
  star.className = "star-toggle";
  star.classList.toggle("star-toggle--active", isFavourite);
  star.setAttribute("aria-pressed", String(isFavourite));
  star.setAttribute("aria-label", isFavourite ? "Remove from favourites" : "Add to favourites");
  star.textContent = isFavourite ? "★" : "☆";
  star.addEventListener("click", () => onToggleFavourite(route.id));
  return star;
}

function renderRouteCard(route, nowMinutes, prefs, onToggleFavourite) {
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

  heading.appendChild(renderStarToggle(route, prefs.favouriteRouteIds.has(route.id), onToggleFavourite));

  card.appendChild(heading);

  buildDirections(route).forEach((direction) => {
    card.appendChild(renderDirection(direction, nowMinutes, prefs.showPreviousBuses));
  });

  return card;
}

export function renderRoutes(container, routes, prefs, { onToggleFavourite }) {
  const nowMinutes = getISTNowMinutes();
  const visibleRoutes = prefs.showOnlyFavourites
    ? routes.filter((route) => prefs.favouriteRouteIds.has(route.id))
    : routes;

  container.innerHTML = "";

  if (visibleRoutes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "direction__empty";
    empty.textContent = "No favourite routes yet — star a route to see it here.";
    container.appendChild(empty);
    return;
  }

  visibleRoutes.forEach((route) => {
    container.appendChild(renderRouteCard(route, nowMinutes, prefs, onToggleFavourite));
  });
}
