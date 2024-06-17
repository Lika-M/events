import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://Lika-M:t0cDyE1rfD2w1U20@cluster0.wnmsq4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export async function connectDB() {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return await client.connect();
}

export async function insertDocument(client, collectionName, document) {
    const db = client.db('events');
    let collection = await db.collection(collectionName);
    const result = await collection.insertOne(document);
    return result;
}