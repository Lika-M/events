import Link from "next/link";
import classes from './button.module.css';

export default function Button({ link, children }) {
    return (
        <Link href={link} className={classes.btn}>
            {children}
        </Link>
    );
}