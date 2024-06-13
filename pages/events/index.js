import Head from 'next/head';
import { useRouter } from 'next/router.js';

import { getAllEvents } from '../../service/events.js';
import EventList from '../../components/events/event-list.js';
import EventsSearch from '../../components/events/events-search.js';

export default function EventsPage({ events }) {
    const router = useRouter();

    function searchEventHandler(year, month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath);
    }

    return (
        <>
            <Head>
                <title>Events</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta name="description" content="Find a lot of great events that alow you to evolve."></meta>
            </Head>
            <EventsSearch onSearch={searchEventHandler} />
            <EventList items={events} />
        </>
    );
}

export async function getStaticProps() {
    const allEvents = getAllEvents();

    return {
        props: {
            events: allEvents
        }
    }
}