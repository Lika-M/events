import { useRouter } from "next/router";

import { getEventById } from "../../service/events.js";
import EventSummary from "../../components/event-detail/event-summary.js";
import EventLogistics from "../../components/event-detail/event-logistics.js";
import EventContent from "../../components/event-detail/event-content.js";
import ErrorAlert from "../../components/common/error-alert.js";
import Button from "../../components/common/button.js";

export default function EventDetailPage() {
    const router = useRouter();
    const eventId = router.query.id;

    const event = getEventById(eventId);

    if (!event) {
        return (
            <>
                <ErrorAlert>
                    <p>No event found.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
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