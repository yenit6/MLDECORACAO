const calendarEl = document.getElementById("calendar");
const monthDisplay = document.getElementById("month-display");
const dayOutput = document.getElementById("day-output");
const monthOutput = document.getElementById("month-output");
const yearOutput = document.getElementById("year-output");

const partyDateEl = document.getElementById("party-date");
const pickupDateEl = document.getElementById("pickup-date");
const returnDateEl = document.getElementById("return-date");

const confirmButton = document.querySelector(".confirm");
const yearSelect = document.getElementById("year-select");

const monthNames = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

let currentDate = new Date();

function populateYearSelect(start = 2025, end = 2030) {
  for (let y = start; y <= end; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }

  yearSelect.value = currentDate.getFullYear();

  yearSelect.addEventListener("change", () => {
    currentDate.setFullYear(parseInt(yearSelect.value));
    renderCalendar();
  });
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthDisplay.textContent = monthNames[month];
  yearSelect.value = year;

  const lastDay = new Date(year, month + 1, 0).getDate();

  calendarEl.innerHTML = "";

  for (let day = 1; day <= lastDay; day++) {
    const dayEl = document.createElement("div");
    dayEl.textContent = day;
    dayEl.classList.add("calendar-day");

    dayEl.addEventListener("click", () => selectDate(year, month, day));

    calendarEl.appendChild(dayEl);
  }
}

function selectDate(year, month, day) {
  const selectedDate = new Date(year, month, day);

  dayOutput.textContent = `Dia: ${day}`;
  monthOutput.textContent = `Mês: ${monthNames[month]}`;
  yearOutput.textContent = `Ano: ${year}`;

  const pickupDate = new Date(selectedDate);
  pickupDate.setDate(selectedDate.getDate() - 1);

  const returnDate = new Date(selectedDate);
  returnDate.setDate(selectedDate.getDate() + 1);

  partyDateEl.textContent = `Data da Festa: ${formatDate(selectedDate)}`;
  pickupDateEl.textContent = `Data de Retirada: ${formatDate(pickupDate)}`;
  returnDateEl.textContent = `Data de Devolução: ${formatDate(returnDate)}`;

  confirmButton.disabled = false;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function changeMonth(delta) {
  currentDate.setMonth(currentDate.getMonth() + delta);
  renderCalendar();
}

// Inicialização
populateYearSelect();
renderCalendar();



//Menu Oculta e visivel 
const menu = document.getElementById("dropdown-menu");
const botaoMenu = document.getElementById("button-all");


botaoMenu.addEventListener("click", () => {
    menu.classList.toggle("ativo");
    menu.classList.toggle("menucult");
});