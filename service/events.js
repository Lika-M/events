import { DUMMY_EVENTS } from '../dummy-data.js';

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getEventById(id) {
  return DUMMY_EVENTS.find(event => event.id === id);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function findEventsByDate(selectedYear, selectedMonth) {
  const result = DUMMY_EVENTS.filter(event => {
    let [year, month] = event.date.split('-');
    
    if (month.startsWith('0')) {
      month = month[1];
    }
    return year === selectedYear && month === selectedMonth;
  });
  return result;
}
