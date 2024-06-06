import { useRouter } from 'next/router.js';

import { getAllEvents } from '../../service/events.js';
import EventList from '../../components/events/event-list.js';
import EventsSearch from '../../components/events/events-search.js';

export default function EventsPage() {
    const router = useRouter();
    const events = getAllEvents();

    function searchEventHandler(year, month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath);
    }

    return (
        <>
            <EventsSearch onSearch={searchEventHandler} />
            <EventList items={events} />
        </>
    );
}