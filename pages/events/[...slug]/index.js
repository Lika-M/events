import { useRouter } from "next/router";

import { findEventsByDate } from "../../../service/events.js";
import EventList from "../../../components/events/event-list.js";
import SearchTitle from "../../../components/events/search-title.js";
import Button from "../../../components/common/button.js";
import ErrorAlert from "../../../components/common/error-alert.js";

export default function FilteredEventsPage() {
    const router = useRouter();
    const selectedData = router.query.slug;

    // first rendering
    if (!selectedData) {
        return (<p className="center">Loading...</p>);
    }
    const [year, month] = selectedData;
    const isInvalid = selectedData.length > 2
        || isNaN(Number(year))
        || isNaN(Number(month))
        || Number(year) > 2030
        || Number(month) < 1
        || Number(month) > 12;

    if (isInvalid) {
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter!</p>
                </ErrorAlert>
                <div className="center" >
                    <Button link="/events">Show All Events</Button>
                </div>
            </>
        );
    }

    const events = findEventsByDate(year, month);

    if (!events || events.length === 0) {
        return (
            <>
                <ErrorAlert>
                    <p>No events found for the chosen filter.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </>
        );
    }

    const date = new Date(Number(year), Number(month) - 1);

    return (
        <>
            <SearchTitle date={date} />
            <EventList items={events} />
        </>
    );
}