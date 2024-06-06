import { useRouter } from "next/router";

import { findEventsByDate } from "../../../service/events.js";
import EventList from "../../../components/events/event-list.js";

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
        return (<p className="center">Invalid filter!</p>);
    }

    const events = findEventsByDate(year, month);

    if (!events || events.length === 0) {
        return (<p className="center">No events found for the chosen filter.</p>);
    }
    return (<EventList items={events} />);
}