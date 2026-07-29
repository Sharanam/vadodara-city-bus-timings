import { formatRelativeTime, getISTNowMinutes } from "./time.js";
import { showToast } from "./toast.js";

// Devices without hover (touch/mobile) can't discover the CSS tooltip, so
// they get the same live-computed text as a tap-triggered toast instead.
const supportsHover = window.matchMedia("(hover: hover)").matches;

// The tooltip text is computed fresh on every hover/focus rather than baked
// in at render time, so it stays accurate between periodic re-renders.
export function attachLiveTooltip(element, minutesSinceMidnight) {
  element.tabIndex = 0;

  const tooltip = document.createElement("span");
  tooltip.className = "time-chip__tooltip";
  tooltip.setAttribute("role", "tooltip");
  element.appendChild(tooltip);

  const currentText = () => formatRelativeTime(minutesSinceMidnight, getISTNowMinutes());

  element.addEventListener("mouseenter", () => {
    tooltip.textContent = currentText();
  });
  element.addEventListener("focus", () => {
    tooltip.textContent = currentText();
  });

  if (!supportsHover) {
    element.addEventListener("click", () => showToast(currentText()));
  }
}
