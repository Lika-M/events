import Button from '../common/button';
import classes from './search-title.module.css';

export default function SearchTitle({date}) {
  const convertedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {convertedDate}</h1>
      <Button link='/events'>Show all events</Button>
    </section>
  );
}

