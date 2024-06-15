import Head from 'next/head';

import { getFeaturedEvents } from '../api/api-util.js';
import EventList from '../components/events/event-list.js';
import NewsletterRegistration from '../components/registration/newsletter-registration.js';

export default function HomePage({ events }) {
    return (
        <>
            <Head>
                <title>New Events</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta name="description" content="Find a lot of great events that alow you to evolve."></meta>
            </Head>
            <NewsletterRegistration />
            <div>
                <EventList items={events} />
            </div>
        </>
    );
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            events: featuredEvents
        },
        revalidate: 600
    };
}