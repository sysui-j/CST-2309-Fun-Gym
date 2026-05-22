const monthYear = document.getElementById("month-year");
const calendarDates = document.getElementById("calendar-dates");
const countdownEl = document.getElementById("countdown");

const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

const recurringEvents = [5, 12, 18, 25];

let currentDate = new Date();

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

function normalizeToMidnight(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function renderCalendar(date) {
  calendarDates.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  monthYear.textContent = `${monthNames[month]} ${year}`;

  for (let i = 0; i < firstDayIndex; i++) {
    const empty = document.createElement("div");
    empty.classList.add("empty");
    calendarDates.appendChild(empty);
  }

  for (let day = 1; day <= lastDay; day++) {
    const dayEl = document.createElement("div");
    dayEl.textContent = day;

    if (recurringEvents.includes(day)) {
      dayEl.classList.add("event-day");
    }

    if (isCurrentMonth && day === today.getDate()) {
      dayEl.classList.add("today");
    }

    calendarDates.appendChild(dayEl);
  }
}

if (prevMonthBtn && nextMonthBtn) {
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });
}


function getNextEvent() {
  const now = new Date();
  const currentDay = now.getDate();

  const upcoming = recurringEvents
    .filter(d => d > currentDay)
    .sort((a, b) => a - b);

  if (upcoming.length > 0) {
    return new Date(now.getFullYear(), now.getMonth(), upcoming[0]);
  }

  const firstNext = [...recurringEvents].sort((a, b) => a - b)[0];
  return new Date(now.getFullYear(), now.getMonth() + 1, firstNext);
}

// Countdown
function updateCountdown() {
  const now = new Date();
  const eventDate = getNextEvent();

  const diff = eventDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "Event in progress 💪";
    return;
  }

  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const minutes = Math.floor((diff % HOUR) / MINUTE);
  const seconds = Math.floor((diff % MINUTE) / SECOND);

  countdownEl.textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s till next event`;
}

renderCalendar(currentDate);
updateCountdown();

setInterval(updateCountdown, 1000);

setInterval(() => renderCalendar(currentDate), 60000);