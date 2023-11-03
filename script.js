const dateInput = document.getElementById('dateInput');
const datepicker = document.getElementById('datepicker');

// Function to show the datepicker
function showDatePicker() {
  datepicker.style.display = 'block';
}

// Function to hide the datepicker
function hideDatePicker() {
  datepicker.style.display = 'none';
}

// Add an event listener to open the datepicker when clicking the input field
dateInput.addEventListener('click', showDatePicker);

// Add an event listener to close the datepicker when clicking outside of it
document.addEventListener('click', function (event) {
  if (event.target !== dateInput && event.target !== datepicker) {
    hideDatePicker();
  }
});

// Create a table for the calendar
const table = document.createElement('table');
table.classList.add('calendar');

// Create the table header with day names
const thead = document.createElement('thead');
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
for (const day of daysOfWeek) {
  const th = document.createElement('th');
  th.innerText = day;
  thead.appendChild(th);
}
table.appendChild(thead);

// Create the table body with the dates
const tbody = document.createElement('tbody');

let selectedDate = new Date();

// Function to update the calendar
function updateCalendar() {
  // Clear the current calendar
  tbody.innerHTML = '';

  // Set the calendar to the selected month
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  selectedDate = new Date(year, month, 1);

  // Update the "monthName" element with the current month's name
  const monthNameElement = document.getElementById('monthName');
  const monthName = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(selectedDate);
  monthNameElement.innerText = monthName;

  // Update the "yearName" element with the current year
  const yearNameElement = document.getElementById('yearName');
  yearNameElement.innerText = year;

  // Calculate the number of days in the selected month
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Calculate the day of the week for the first day of the month
  const firstDayOfWeek = selectedDate.getDay();

  // Create calendar cells
  let dayCounter = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDayOfWeek) {
        // Empty cells before the first day of the month
        cell.innerText = '';
      } else if (dayCounter <= lastDay) {
        cell.innerText = dayCounter;
        cell.addEventListener('click', function () {
          // Set the selected day of the month correctly
          selectedDate.setDate(cell.innerText);
          updateSelectedDate(selectedDate);
        });
        dayCounter++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
}

// Function to update the selected date in the input field
function updateSelectedDate(selectedDate) {
  // Convert the selected date to UTC.
  selectedDate = new Date(selectedDate.toUTCString());

  selectedDate.setDate(selectedDate.getDate() + 1);

  // Update the input field with the UTC date.
  dateInput.value = selectedDate.toISOString().split('T')[0];
  hideDatePicker();
}

// Create buttons for navigating to the previous and next month
const prevMonthButton = document.createElement('button');
prevMonthButton.innerText = '<';
prevMonthButton.addEventListener('click', function (event) {
  event.stopPropagation();
  selectedDate.setMonth(selectedDate.getMonth() - 1);
  selectedDate.setDate(1);
  updateCalendar();
});

const nextMonthButton = document.createElement('button');
nextMonthButton.innerText = '>';
nextMonthButton.addEventListener('click', function (event) {
  event.stopPropagation();
  selectedDate.setMonth(selectedDate.getMonth() + 1);
  selectedDate.setDate(1);
  updateCalendar();
});

// Append the buttons to the datepicker
datepicker.appendChild(prevMonthButton);
datepicker.appendChild(nextMonthButton);

// Update the calendar when showing the datepicker
updateCalendar();
table.appendChild(tbody);
datepicker.appendChild(table);
