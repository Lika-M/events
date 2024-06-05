import { useRouter } from "next/router";

import { getEventById } from "../../service/events.js";
import EventSummary from "../../components/event-detail/event-summary.js";
import EventLogistics from "../../components/event-detail/event-logistics.js";
import EventContent from "../../components/event-detail/event-content.js";

export default function EventDetailPage() {
    const router = useRouter();
    const eventId = router.query.id;

    const event = getEventById(eventId);

    if (!event) {
        return (<p>No event found</p>);
    }

    return (
        <>
            <EventSummary title={event.title} />
            <EventLogistics {...event}/>
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>

    );
}