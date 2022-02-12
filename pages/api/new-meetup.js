import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://samar:samar@cluster0.edtms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(body);
    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup Created" });
  }
}

export default handler;
