import { formatRelativeTime, getISTNowMinutes } from "./time.js";

// The tooltip text is computed fresh on every hover/focus rather than baked
// in at render time, so it stays accurate between periodic re-renders.
export function attachLiveTooltip(element, minutesSinceMidnight) {
  element.tabIndex = 0;

  const tooltip = document.createElement("span");
  tooltip.className = "time-chip__tooltip";
  tooltip.setAttribute("role", "tooltip");
  element.appendChild(tooltip);

  const update = () => {
    tooltip.textContent = formatRelativeTime(minutesSinceMidnight, getISTNowMinutes());
  };

  element.addEventListener("mouseenter", update);
  element.addEventListener("focus", update);
}
