import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/shared/_layout';
import { capitalizeFirstLetter } from '../../lib/helper';
import { User } from '../../models/User';
import { UsersService } from '../../services/UsersService';

type Props = {
  user: User;
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function ProfilePage({ user }: Props) {
  const router = useRouter();
  const dob = user.dob.split('-');

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

      <ul className='mt-4 space-y-2'>
        <li className='flex'>
          <span className='block font-medium'>Nama: </span>
          <span className='block ml-1'>{user.name}</span>
        </li>

        <li className='flex'>
          <span className='block font-medium'>No HP: </span>
          <span className='block ml-1'>{user.phone}</span>
        </li>

        <li className='flex'>
          <span className='block font-medium'>Tanggal Lahir: </span>
          <span className='block ml-1'>{`${dob[2]} ${
            monthNames[parseInt(dob[1]) - 1]
          } ${dob[0]}`}</span>
        </li>

        <li className='flex'>
          <span className='block font-medium'>Gender: </span>
          <span className='block ml-1'>
            {capitalizeFirstLetter(user.gender)}
          </span>
        </li>

        <li className='flex'>
          <span className='block font-medium'>Email: </span>
          <span className='block ml-1'>{user.email}</span>
        </li>
      </ul>

      <div className='mt-4'>
        <Link href={`${router.asPath}/update`} passHref={true}>
          <button
            type='button'
            className='w-full justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2'>
            Update Profile
          </button>
        </Link>
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

  const usersService = new UsersService();
  const id = (session.user as User)._id;
  const result = await usersService.get(id);

  if (!result.success) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: { session, user: { ...result.data, password: '' } },
  };
}
