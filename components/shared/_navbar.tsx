import Image from 'next/image';
import logo from '../../public/images/logo-small.png';
import { ChevronLeftIcon, MenuIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import cartImg from '../../public/images/cart.png';
import customImg from '../../public/images/custom.png';
import filterImg from '../../public/images/filter.png';
import categories from '../../data/categories.json';

type Props = {
  title?: string;
  showMenu: boolean;
  showCart: boolean;
  custom?: 'architecture' | 'interior' | 'furniture' | '';
  showFilter: boolean;
  backLink?: string;
};

export default function Navbar({
  title,
  showMenu,
  showCart,
  custom,
  showFilter,
  backLink,
}: Props) {
  const router = useRouter();
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const links = [
    {
      title: 'Home',
      href: '/home',
    },
    {
      title: 'Furniture',
      href: '/categories/6',
    },
    {
      title: 'Arsitektur',
      href: '/categories/2',
    },
    {
      title: 'Interior',
      href: '/categories/4',
    },
    {
      title: 'Material',
      href: '/categories/5',
    },
    {
      title: 'Pertukangan',
      href: '/categories/3',
    },
    {
      title: 'Accesories',
      href: '/categories/1',
    },
    {
      title: 'Profile',
      href: '/profile',
    },
    {
      title: 'Seller',
      href: '/seller',
    },
    {
      title: 'Log out',
      href: '',
    },
  ];

  return (
    <nav className='flex justify-between bg-primary items-center px-2 z-50'>
      <div className='flex text-white items-center'>
        {showMenu ? (
          <MenuIcon
            onClick={() => setSideNavOpen(true)}
            className='cursor-pointer w-6 h-6 mr-2'
          />
        ) : (
          <ChevronLeftIcon
            onClick={() => {
              if (backLink) {
                router.push(backLink);
              } else {
                router.back();
              }
            }}
            className='cursor-pointer w-6 h-6 mr-2'
          />
        )}
        <span className='text-xl font-semibold'>{title}</span>
      </div>

      <div className='flex items-center'>
        {custom && (
          <div className='cursor-pointer'>
            <Link href={`/custom/${custom}`} passHref={true}>
              <div>
                <Image
                  src={customImg}
                  alt='Custom'
                  width={45}
                  height={40}></Image>
              </div>
            </Link>
          </div>
        )}
        {showCart && (
          <div className='cursor-pointer'>
            <Link href='/cart' passHref={true}>
              <div>
                <Image src={cartImg} alt='Cart' width={47} height={42}></Image>
              </div>
            </Link>
          </div>
        )}
        {showFilter && (
          <div className='cursor-pointer'>
            <Link href='/filter' passHref={true}>
              <div className='flex'>
                <Image
                  src={filterImg}
                  alt='Filter'
                  width={42}
                  height={42}></Image>
              </div>
            </Link>
          </div>
        )}
        <Image src={logo} alt='logo' width={55} height={50}></Image>
      </div>

      <div
        onClick={() => setSideNavOpen(false)}
        className={`z-20 absolute top-0 left-0 min-h-screen w-full transition-opacity duration-500 ${
          sideNavOpen ? 'opacity-100 w-full' : 'opacity-0 w-0'
        }`}
        style={{ background: 'rgba(0,0,0,0.8)' }}></div>

      <div
        className={`z-20 absolute top-0 left-0 min-h-screen w-1/2 transition-all duration-500 ${
          sideNavOpen ? '' : '-translate-x-full'
        }`}>
        <div
          className={`bg-gray-200 min-h-screen p-3 w-full rounded-tr-xl rounded-br-xl`}>
          <div>
            <ChevronLeftIcon
              onClick={() => setSideNavOpen(false)}
              className='cursor-pointer w-6 h-6 mr-2'
            />
          </div>
          <ul className='space-y-3 mt-6'>
            {links.map((link, idx) => (
              <li key={link.title}>
                {idx === links.length - 1 ? (
                  <button
                    onClick={() => {
                      toast.info('Signing out...');
                      signOut();
                    }}
                    className='w-full  border border-gray-500 rounded-xl py-2 bg-red-600 text-white'>
                    Log out
                  </button>
                ) : (
                  <Link href={link.href} passHref={true}>
                    <button className='w-full bg-white  border border-gray-500 rounded-xl py-2'>
                      {link.title}
                    </button>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
