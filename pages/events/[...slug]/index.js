import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils/index.js";

import { findEventsByDate } from "../../../api/api-util.js";
import EventList from "../../../components/events/event-list.js";
import SearchTitle from "../../../components/events/search-title.js";
import Button from "../../../components/common/button.js";
import ErrorAlert from "../../../components/common/error-alert.js";

export default function FilteredEventsPage({ events, date, hasError }) {
    // const router = useRouter();

    // if (!events) {
    //     return (<p className="center">Loading...</p>);
    // }

    if (hasError) {
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

    return (
        <>
            <SearchTitle date={date} />
            <EventList items={events} />
        </>
    );
}

export async function getServerSideProps(context) {
    const selectedData = context.params.slug;
    const [year, month] = selectedData;

    const isInvalid = selectedData.length > 2
        || isNaN(Number(year))
        || isNaN(Number(month))
        || Number(year) > 2030
        || Number(month) < 1
        || Number(month) > 12;

    if (isInvalid) {
        return {
            // notFound: true,
            // redirect: {
            //     destination: '/error'
            // }

            props: {
                hasError: true
            }
        }
    }
    const events = await findEventsByDate(year, month);

    return {
        props: {
            events,
            date: {
                year: Number(year),
                month: Number(month)
            }
        }
    }
}