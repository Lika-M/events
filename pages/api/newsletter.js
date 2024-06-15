import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email;

        if (!email || !email.includes('@') || !email.includes('.')) {
            return res.status(422).json({ message: 'Invalid email.address.' })
        }

        const userData = {
            id: (Math.random() * 1000000).toFixed(0),
            email: email
        }

        const filePath = path.join(cwd(), 'data', 'feedback.json');
        const storedData = fs.readFileSync(filePath);

        const data = JSON.parse(storedData);
        data.push(userData);

        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(201).json({ email: email, message: 'Signed up.' });

    } else {

    }
}
