import { DUMMY_EVENTS } from '../dummy-data.js';

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}
export function getEventById(id){
  return DUMMY_EVENTS.find(event => event.id === id);
}

export function getAllEvents(){
  return DUMMY_EVENTS;
}
