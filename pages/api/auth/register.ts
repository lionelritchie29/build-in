import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === 'POST') {
    //Getting email and password from body
    const { email, password } = req.body;
    const client = await clientPromise;
    const db = client.db();

    const checkExisting = await db
      .collection('users')
      .findOne({ email: email });

    if (checkExisting) {
      res.status(422).json({ message: 'User already exists' });
      client.close();
      return;
    }

    const status = await db.collection('users').insertOne({
      email,
      password: await hash(password, 12),
    });

    res.status(201).json({ message: 'User created', ...status });
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: 'Route not valid' });
  }
}

export default handler;
