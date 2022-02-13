import { getSession, useSession } from 'next-auth/react';
import Layout from '../components/shared/_layout';

export default function Home() {
  const session = useSession();
  console.log(session);

  return <Layout title='Home'>Welcome, {session.data.user.name}</Layout>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
