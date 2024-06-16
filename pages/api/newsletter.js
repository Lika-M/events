import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://Lika-M:t0cDyE1rfD2w1U20@cluster0.wnmsq4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';




export default async function handler(req, res) {
    console.log("Request received");

    if (req.method === 'POST') {
    
        const email = req.body.email;

        if (!email || !email.includes('@') || !email.includes('.')) {
            console.log("Invalid email address:", email);
            return res.status(422).json({ message: 'Invalid email address.' });
        }

        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        try {
            await client.connect();

            const db = client.db('events'); 
            const collection = db.collection('newsletter');
            
            const result = await collection.insertOne({ email: email });
            res.status(201).json({ email: email, message: 'Signed up.', result: result });

        } catch (error) {
           
            res.status(500).json({ message: 'Storing email failed!' });
        } finally {

            await client.close();
        }
    } else {
       
        res.status(405).json({ message: 'We only support POST requests.' });
    }
}

