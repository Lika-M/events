import Head from 'next/head';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from 'swr';

import EventList from "../../../components/events/event-list.js";
import SearchTitle from "../../../components/events/search-title.js";
import Button from "../../../components/common/button.js";
import ErrorAlert from "../../../components/common/error-alert.js";
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

    let headContent = (
        <Head>
            <title>Events</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <meta name="description" content="Find events"></meta>
        </Head>
    );

    if (isLoading) {
        return (<p className="center">Loading...</p>);
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
            {headContent}
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
            {headContent}
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
    headContent = (
        <Head>
            <title>{`Events ${selectedMonth}/${selectedYear}`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <meta name="description" content={`All incredible events for ${selectedYear}/${selectedMonth}`}></meta>
        </Head>
    );

    return (
        <>
            {headContent}
            <SearchTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    );
}
