import { getEventById, getFeaturedEvents } from "../../api/api-util.js";
import EventSummary from "../../components/event-detail/event-summary.js";
import EventLogistics from "../../components/event-detail/event-logistics.js";
import EventContent from "../../components/event-detail/event-content.js";
import HeadContent from "../../components/common/headContent";
import Comments from "../../components/comments/comments.js";


export default function EventDetailPage({ event }) {

    if (!event) {
        return (
            <>
                <HeadContent title={'Not found'} content={'Find events'} />
                <div className="center">
                    <p>No event found.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <HeadContent title={event.title} content={event.description} />
            <EventSummary title={event.title} />
            <EventLogistics {...event} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
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