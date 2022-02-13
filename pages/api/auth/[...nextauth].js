import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const client = await clientPromise;
        const users = await client.db().collection('users');
        const result = await users.findOne({
          email: credentials.email,
        });

        if (!result) {
          throw new Error('No user found with the email');
        }

        const checkPassword = await compare(
          credentials.password,
          result.password,
        );

        if (!checkPassword) {
          throw new Error('Password doesnt match');
        }
        return result;
      },
    }),
  ],
});
