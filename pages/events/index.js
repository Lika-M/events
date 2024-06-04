import Link from 'next/link';

export default function EventsPage() {

    const events = [
        { id: 1, name: 'First Event' },
        { id: 2, name: 'Second Event' },
        { id: 3, name: 'Third Event' }
    ]
    return (
        <>
            <h1>Events Page</h1>
            <ul>
                {events.map(e => (
                    <li key={e.id}>
                        <Link
                            href={{
                                pathname: '/events/[id]',
                                query: { id: e.id }
                            }}
                        >
                            First Event
                        </Link>
                    </li>
                ))}

            </ul >
        </>
    )
}