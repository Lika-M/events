import { useRef } from 'react';

import classes from './newsletter-registration.module.css';

export default function NewsletterRegistration() {
    const emailInput = useRef();

    function registrationHandler(event) {
        event.preventDefault();

        const userEmail = emailInput.current.value;
        // client-side validation

        fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userEmail })
        })
            .then(res => res.json())
            .then(data => console.log(data.email))
            .catch(err => console.log(err));



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
