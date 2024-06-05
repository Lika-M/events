import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import classes from './event-logistics.module.css';

export default function EventLogistics({ title, date, location, image }) {

  const convertedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const address = location.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <img src={`/${image}`} alt={title} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{convertedDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{address}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}


