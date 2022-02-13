import { hash } from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';
import { RegisterPayload } from '../../../models/payload/RegisterPayload';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, dob, phone, gender }: RegisterPayload =
      req.body;
    const client = await clientPromise;
    const db = client.db();

    const checkExisting = await db
      .collection('users')
      .findOne({ email: email });

    if (checkExisting) {
      res.status(200).json({
        message: 'User with the email is already exists',
        data: null,
        success: false,
      });
      // client.close();
      return;
    }

    const status = await db.collection('users').insertOne({
      name,
      email,
      password: await hash(password, 12),
      phone,
      dob,
      gender,
    });

    res.status(201).json({
      message: 'User created',
      data: status.insertedId,
      success: true,
    });
    // client.close();
  } else {
    //Response for other than POST method
    res
      .status(500)
      .json({ message: 'Route not valid', data: null, success: false });
  }
}

export default handler;
