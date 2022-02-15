import { ObjectId } from 'mongodb';
import clientPromise from '../../../../lib/mongodb';
import { RegisterPayload } from '../../../../models/payload/RegisterPayload';
import { hash } from 'bcryptjs';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query;
    const { name, email, password, dob, phone, gender }: RegisterPayload =
      req.body;

    if (!id) {
      res.status(200).json({
        message: 'Id is undefined or null',
        data: null,
        success: false,
      });
      return;
    }

    const client = await clientPromise;
    const db = client.db();

    try {
      const query = { _id: new ObjectId(id) };
      const newValues = {
        $set: {
          name,
          email,
          dob,
          phone,
          gender,
        },
      };

      if (password) {
        newValues.$set['password'] = await hash(password, 12);
      }

      const result = await db.collection('users').updateOne(query, newValues);

      if (!result.modifiedCount) {
        res.status(200).json({
          message: 'Update failed',
          data: null,
          success: false,
        });
        // client.close();
        return;
      }

      res.status(201).json({
        message: 'User updated',
        data: null,
        success: true,
      });
      return;
    } catch (error) {
      res.status(200).json({
        message: error.message,
        data: null,
        success: true,
      });
      return;
    }
  } else {
    //Response for other than POST method
    res
      .status(500)
      .json({ message: 'Route not valid', data: null, success: false });
  }
}

export default handler;
