import { getSession, useSession } from 'next-auth/react';
import Layout from '../components/shared/_layout';
import profileIcon from '../public/images/profile.png';
import categoryIcon from '../public/images/category.png';
import chatIcon from '../public/images/chat.png';
import BottomNav from '../components/shared/_BottomNav';

export default function Home() {
  const session = useSession();

  const bottomLinks = [
    {
      title: '',
      image: profileIcon,
      href: '/home',
    },
    {
      title: '',
      image: categoryIcon,
      href: '/categories',
    },
    {
      title: '',
      image: chatIcon,
      href: '/home',
    },
  ];

  return (
    <Layout showMenu={true} title='Bu!ld-In' showCart={true}>
      Welcome, {session.data.user.name}
      <BottomNav links={bottomLinks} />
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
  return {
    props: { session },
  };
}
