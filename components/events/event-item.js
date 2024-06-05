import classes from './event-item.module.css';
import Button from '../common/button.js';

export default function EventItem({ id, title, image, date, location }) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const formattedAddress = location.replace(', ', '\n')
    return (
        <li className={classes.item}>
            <img src={`/${image}`} alt={title} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <time>{formattedDate}</time>
                    </div>
                    <div className={classes.address}>
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button
                        link={{
                            pathname: '/events/[id]',
                            query: { id: id }
                        }}
                    >
                        Explore Event
                    </Button>
                </div>
            </div>
        </li>
    );
}