import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

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
      const user = await db.collection('users').findOne({
        _id: new ObjectId(id),
      });

      if (!user) {
        res.status(200).json({
          message: 'User not found',
          data: null,
          success: false,
        });
        // client.close();
        return;
      }

      res.status(201).json({
        message: 'User found',
        data: user,
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
