import { connectDB, insertDocument, readDocument } from "../../../api/db-util.js";

export default async function handler(req, res) {

    const eventId = req.query.eventId;

    let client;

    try {
        client = await connectDB();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the DB failed.' });
        return;
    }

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (!email ||
            email.trim() === '' ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid comment.' });
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        }

        try {
            const result = await insertDocument(client, 'comments', newComment);
            console.log(result);

            newComment.id = result.insertedId;
            res.status(201).json({ message: 'Successful added comment.', comment: newComment })
        } catch (error) {
            return res.status(422).json({ message: 'Adding comment failed.' })
        } finally {
            await client.close();
        }
    }

    if (req.method === 'GET') {
        try {
            const result = await readDocument(client, 'comments');
            const allComments = result.sort((a, b) => b._id - a._id );
            console.log(allComments)
            res.status(200).json({ comments: allComments });
        } catch (error) {
            return res.status(422).json({ message: 'Getting comments failed.' })
        } finally {
            await client.close();
        }
    }
}
