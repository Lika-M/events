import { useRouter } from "next/router";

// import { getEventById } from "../../service/events.js";
import { getEventById, getFeaturedEvents } from "../../api/api-util.js";
import EventSummary from "../../components/event-detail/event-summary.js";
import EventLogistics from "../../components/event-detail/event-logistics.js";
import EventContent from "../../components/event-detail/event-content.js";
import ErrorAlert from "../../components/common/error-alert.js";
import Button from "../../components/common/button.js";

export default function EventDetailPage({ event }) {

    if (!event) {
        return (
            <>
                <div className="center">
                    <p>No event found.</p>
                </div>
            </>
        );
    }

    return (
        <>
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
        //no page view until the data is fetched
        fallback: 'blocking'
    }
}