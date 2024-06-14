import Image from 'next/image.js';

import Button from '../common/button.js';
import DateIcon from '../icons/date-icon.js';
import AddressIcon from '../icons/address-icon.js';
import ArrowRightIcon from '../icons/arrow-right-icon.js';
import classes from './event-item.module.css';

export default function EventItem({ id, title, image, date, location }) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const formattedAddress = location.replace(', ', '\n')
    return (
        <li className={classes.item}>
            <Image src={`/${image}`} alt={title} width={250} height={160}/>
            {/* <img src={`/${image}`} alt={title} /> */}
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{formattedDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
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
                        <span> Explore Event</span>
                        <span className={classes.icon}><ArrowRightIcon/></span>
                    </Button>
                </div>
            </div>
        </li>
    );
}