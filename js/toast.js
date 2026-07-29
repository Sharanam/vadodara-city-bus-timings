// Only one toast is ever shown at a time; a new one replaces whatever is visible.
let activeToast = null;
let hideTimeoutId = null;

export function showToast(message, durationMs = 2000) {
  if (activeToast) {
    clearTimeout(hideTimeoutId);
    activeToast.remove();
    activeToast = null;
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.appendChild(toast);
  activeToast = toast;

  hideTimeoutId = setTimeout(() => {
    toast.remove();
    if (activeToast === toast) activeToast = null;
  }, durationMs);
}
