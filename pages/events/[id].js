import Head from 'next/head';

import { getEventById, getFeaturedEvents } from "../../api/api-util.js";
import EventSummary from "../../components/event-detail/event-summary.js";
import EventLogistics from "../../components/event-detail/event-logistics.js";
import EventContent from "../../components/event-detail/event-content.js";


export default function EventDetailPage({ event }) {
    let headContent = (
        <Head>
            <title>Events</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <meta name="description" content="Find a lot of great events that alow you to evolve."></meta>
        </Head>
    );
    if (!event) {
        headContent = (
            <Head>
                <title>Not found</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta name="description" content="Find events"></meta>
            </Head>);

        return (
            <>
            {headContent}
                <div className="center">
                    <p>No event found.</p>
                </div>
            </>
        );
    }

    headContent = (
        <Head>
            <title>{event.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <meta name="description" content={event.description}></meta>
        </Head>
    );

    return (
        <>
            {headContent}
            <EventSummary title={event.title} />
            <EventLogistics {...event} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>

    );
}

export async function getStaticProps(context) {
    const id = context.params.id;
    const event = await getEventById(id);

    return {
        props: {
            event
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const allEvents = await getFeaturedEvents();

    const paths = allEvents.map(ev => (
        { params: { id: ev.id } }
    ));

    return {
        paths,
        fallback: 'blocking'
    }
}