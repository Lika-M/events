import { getAllEvents } from '../../service/events.js';
import EventList from '../../components/events/event-list.js';
import EventsSearch from '../../components/events/events-search.js';

export default function EventsPage() {
    const events = getAllEvents();

    return (
        <>
            <EventsSearch />
            <EventList items={events} />
        </>
    );
}