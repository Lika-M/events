import { connectDB, insertDocument } from "../../api/db-util.js";

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const email = req.body.email;

        if (!email || !email.includes('@') || !email.includes('.')) {
            console.log("Invalid email address:", email);
            return res.status(422).json({ message: 'Invalid email address.' });
        }

        let client;

        try {
            client = await connectDB();
        } catch (error) {
            res.status(500).json({ message: 'Connecting to the DB failed.' });
            return;
        }

        try {
            const result = await insertDocument(client, 'newsletter', { email: email });
            await client.close();
            res.status(201).json({ email: email, message: 'Signed up.', result: result});

        } catch (error) {
            res.status(500).json({ message: 'Inserting data to the DB failed.' });
            return;
        }

    } else {
        res.status(405).json({ message: 'We only support POST requests.' });
    }

}

