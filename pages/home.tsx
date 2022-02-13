import { getSession } from 'next-auth/react';
import Layout from '../components/shared/_layout';

export default function Home() {
  return <Layout title='Home'>Hehe</Layout>;
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
