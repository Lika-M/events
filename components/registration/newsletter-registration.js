import { useContext, useRef } from 'react';

import NotificationContext from '../../contexts/notification-context.js';
import classes from './newsletter-registration.module.css';

export default function NewsletterRegistration() {
    const emailInput = useRef();
    const notificationCtx = useContext(NotificationContext);

    function registrationHandler(event) {
        event.preventDefault();

        notificationCtx.showNotification({
            title: 'Signing up...',
            message: 'Registering for newsletter',
            status: 'pending'
        });

        const userEmail = emailInput.current.value;
        // client-side validation

        fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userEmail })
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(data => {
                        throw new Error(data.message || 'Something went wrong!');
                    });
                }
                return res.json();
            })
            .then(data => {
                console.log(data.email)
                notificationCtx.showNotification({
                    title: 'Registration completed',
                    message: 'Successfully registered for newsletter',
                    status: 'success'
                });
            })
            .catch(err => {
                notificationCtx.showNotification({
                    title: 'Error',
                    message: err.message,
                    status: 'error'
                });
            });



    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                        ref={emailInput}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}
