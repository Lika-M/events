// import { getFeaturedEvents } from '../service/events.js';
import { getFeaturedEvents } from '../api/api-util.js';
import EventList from '../components/events/event-list.js';

export default function HomePage({events}) {
    return (
        <div>
            <EventList items={events}/>
        </div>
    )
}

export async function getStaticProps(){
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            events: featuredEvents
        },
        //at most once every 10 min
        revalidate: 600
    }
}