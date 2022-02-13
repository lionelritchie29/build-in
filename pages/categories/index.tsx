import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/shared/_layout';
import dummy from '../../data/categories.json';
import { Category } from '../../models/Category';
import profileIcon from '../../public/images/profile.png';
import homeIcon from '../../public/images/home.png';
import chatIcon from '../../public/images/chat.png';
import BottomNav from '../../components/shared/_BottomNav';

export default function Categories() {
  const categories: Category[] = dummy.categories;

  const bottomLinks = [
    {
      title: '',
      image: profileIcon,
      href: '/home',
    },
    {
      title: '',
      image: homeIcon,
      href: '/home',
    },
    {
      title: '',
      image: chatIcon,
      href: '/home',
    },
  ];

  return (
    <Layout title='Bu!ld-In' showMenu={true}>
      <ul className='grid grid-cols-2 gap-x-8 gap-y-16 px-2 py-8'>
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link href='/home' passHref={true}>
              <div className='flex flex-col justify-center'>
                <Image
                  width={125}
                  height={110}
                  src={`/images/${cat.image}`}
                  alt={cat.title}
                />
                <span className='block text-center font-semibold text-xl'>
                  {cat.title}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <BottomNav links={bottomLinks} />
    </Layout>
  );
}
