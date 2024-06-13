import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from 'swr';

import EventList from "../../../components/events/event-list.js";
import SearchTitle from "../../../components/events/search-title.js";
import Button from "../../../components/common/button.js";
import ErrorAlert from "../../../components/common/error-alert.js";
import HeadContent from "../../../components/common/headContent";
import { URL, fetcher } from "../../../api/api-util.js";

export default function FilteredEventsPage() {
    const [events, setEvents] = useState([]);
    const router = useRouter();

    const { data, error, isLoading } = useSWR(URL, fetcher);

    useEffect(() => {
        if (data) {
            const allEvents = Object.entries(data).map(([key, value]) => ({
                id: key,
                ...value
            }));
            setEvents(allEvents);
        }
    }, [data]);

    if (isLoading) {
        return (
            <>
                <HeadContent title="Events" content="Find events" />
                <p className="center">Loading...</p>
            </>
        );
    }

    if (!router.query.slug) {
        return null;
    }

    const selectedData = router.query.slug;
    const [selectedYear, selectedMonth] = selectedData || [];

    if (!selectedYear || !selectedMonth) {
        return null;
    }

    const isInvalid =
        selectedData.length > 2 ||
        isNaN(Number(selectedYear)) ||
        isNaN(Number(selectedMonth)) ||
        Number(selectedYear) > 2030 ||
        Number(selectedMonth) < 1 ||
        Number(selectedMonth) > 12 ||
        error;

    if (isInvalid) {
        return (
            <>
                <HeadContent title="Events" content="Find events" />
                <ErrorAlert>
                    <p>Invalid filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = events.filter(event => {
        let [year, month] = event.date.split('-');

        if (month.startsWith('0')) {
            month = month[1];
        }
        return year === selectedYear && month === selectedMonth;
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <HeadContent title="Events" content="Find events" />
                <ErrorAlert>
                    <p>No events found for the chosen filter.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </>
        );
    }

    const date = new Date(Number(selectedYear), Number(selectedMonth) - 1);

    return (
        <>
            <HeadContent
                title={`Events ${selectedMonth}/${selectedYear}`}
                content={`All incredible events for ${selectedYear}/${selectedMonth}`}
            />
            <SearchTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    );
}
