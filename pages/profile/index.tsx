import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import Layout from '../../components/shared/_layout';

export default function ProfilePage() {
  const session = useSession();

  console.log(session);
  return (
    <Layout title='Profile' showMenu={true}>
      <div className='mt-3'>
        <Image
          src='https://i.pravatar.cc/500/'
          alt='Profile Picture'
          width={500}
          height={500}
          className='rounded-lg'
        />
      </div>
    </Layout>
  );
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
  console.log(session);
  return {
    props: { session },
  };
}
