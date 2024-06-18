import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://Lika-M:ZXXPK3X8JdZOOaUb@atlascluster.tcca3nt.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'
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

export async function readDocument(client, collectionName){
    const db =client.db('events');
    const collection = await db.collection(collectionName)
    .find()
    .toArray();
    return collection;
}



