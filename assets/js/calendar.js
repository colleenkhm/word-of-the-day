import "../assets/css/calendar.css";
import dayjs from "dayjs";
// weekdays array
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// loading current year
const INITIAL_YEAR = dayjs().format("YYYY");
// loading calendar on current month
const INITIAL_MONTH = dayjs().format("M");
const calendarDaysElement = document.getElementById("calendar-days");
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
// Select the calendar grid header element
const daysOfWeekElement = document.getElementById("days-of-week");
// Loop through the array of weekdays
WEEKDAYS.forEach(weekday => {
  // For each item in the array, make a list item element
  const weekDayElement = document.createElement("li");
  // Append a child element inside the list item...
  daysOfWeekElement.appendChild(weekDayElement);
  /// ...that contains the value in the array
  weekDayElement.innerText = weekday;
});
let currentMonthDays = createDaysForCurrentMonth(INITIAL_YEAR, INITIAL_MONTH)
let previousMonthDays = createDaysForPreviousMonth(INITIAL_YEAR, INITIAL_MONTH, currentMonthDays[0])
let nextMonthDays = createDaysForNextMonth(INITIAL_YEAR, INITIAL_MONTH)

let days = [...this.previousMonthDays, ...this.currentMonthDays, ...this.nextMonthDays]
const apiLink = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}"`;
var word = '';
var wordDisplayed = document.getElementById("word");
var definitionDisplayed = document.getElementById("definition");
var synonymsDisplayed = document.getElementById("related-words");

function getNumberOfDaysInMonth(year, month) {
    return dayjs(`${year}-${month}-01`).daysInMonth()
}

function createDaysForCurrentMonth(year, month) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
      return {
        date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true
      };
    });
}

function getWeekday(date) {
    return dayjs(date).weekday()
}

function createDaysForPreviousMonth(year, month) {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);
  
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");
    
    // Account for first day of the month on a Sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6
  
    const previousMonthLastMondayDayOfMonth = dayjs(
      currentMonthDays[0].date
    ).subtract(visibleNumberOfDaysFromPreviousMonth, "day").date();
  
    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {    
      return {
        date: dayjs(
          `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: previousMonthLastMondayDayOfMonth + index,
        isCurrentMonth: false
      };
    });
}

function createDaysForNextMonth(year, month) {
    const lastDayOfTheMonthWeekday = getWeekday(`${year}-${month}-${currentMonthDays.length}`)
  
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 7 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday
  
    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return {
        date: dayjs(`${year}-${Number(month) + 1}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: false
      }
    })
}

function appendDay(day, calendarDaysElement) {
    const dayElement = document.createElement("li");
    const dayElementClassList = dayElement.classList;
  
    // Generic calendar day class
    dayElementClassList.add("calendar-day");
  
    // Container for day of month number
    const dayOfMonthElement = document.createElement("span");
  
    // Content
    dayOfMonthElement.innerText = day.dayOfMonth;
  
    // Add an extra class to differentiate current month days from prev/next month days
    if (!day.isCurrentMonth) {
      dayElementClassList.add("calendar-day--not-current");
    }
  
    // Append the element to the container element
    dayElement.appendChild(dayOfMonthElement);
    calendarDaysElement.appendChild(dayElement);
  }


// function getDate(){

// }