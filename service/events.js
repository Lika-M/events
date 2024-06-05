import { DUMMY_EVENTS } from '../dummy-data.js';

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}
