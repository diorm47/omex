const timer = "05-13-34-12";

const [days, hours, minutes, seconds] = timer.split("-").map(Number);
let totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;

function updateTimer() {
  if (totalSeconds <= 0) return;
  totalSeconds--;

  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const timerValues = document.querySelectorAll(".timer_value p");
  timerValues[0].textContent = d.toString().padStart(2, "0");
  timerValues[1].textContent = h.toString().padStart(2, "0");
  timerValues[2].textContent = m.toString().padStart(2, "0");
  timerValues[3].textContent = s.toString().padStart(2, "0");
}

setInterval(updateTimer, 1000);
updateTimer();
