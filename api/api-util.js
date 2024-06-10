const URL = 'https://next13-events-default-rtdb.europe-west1.firebasedatabase.app/events.json';

export async function getAllEvents() {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const data = await response.json();

        const events = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value
        }));

        return events;

    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

export async function getFeaturedEvents() {
    try {
        const allEvents = await getAllEvents();
        return allEvents.filter((event) => event.isFeatured);
    } catch (error) {
        console.error('Error fetching featured events:', error);
        return [];
    }
}

export async function getEventById(id) {
    try {
        const allEvents = await getAllEvents();
        return allEvents.find(event => event.id === id) || null;
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        return null;
    }
}

