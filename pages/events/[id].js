import { useRouter } from "next/router";

export default function EventDetailPage() {
   const router = useRouter();
   const eventId = router.query.id;

    return (
        <>
            <h1>Event {eventId}</h1>
        </>

    );
}