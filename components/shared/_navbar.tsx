import Image from 'next/image';
import logo from '../../public/images/logo-small.png';
import { ChevronLeftIcon, MenuIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';

type Props = {
  title?: string;
  showMenu: boolean;
};

export default function Navbar({ title, showMenu }: Props) {
  const router = useRouter();
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const links = [
    {
      title: 'Home',
      href: '/home',
    },
    {
      title: 'Furniture',
      href: '/home',
    },
    {
      title: 'Arsitektur',
      href: '/home',
    },
    {
      title: 'Interior',
      href: '/home',
    },
    {
      title: 'Material',
      href: '/home',
    },
    {
      title: 'Pertukangan',
      href: '/home',
    },
    {
      title: 'Accesories',
      href: '/home',
    },
    {
      title: 'Profile',
      href: '/home',
    },
    {
      title: 'Seller',
      href: '/home',
    },
    {
      title: 'Log out',
      href: '/home',
    },
  ];

  return (
    <nav className='flex justify-between bg-primary items-center px-2'>
      <div className='flex text-white items-center'>
        {showMenu ? (
          <MenuIcon
            onClick={() => setSideNavOpen(true)}
            className='cursor-pointer w-6 h-6 mr-2'
          />
        ) : (
          <ChevronLeftIcon
            onClick={() => router.back()}
            className='cursor-pointer w-6 h-6 mr-2'
          />
        )}
        <span className='text-xl font-semibold'>{title}</span>
      </div>

      <div>
        <Image src={logo} alt='logo' width={55} height={50}></Image>
      </div>

      <div
        className={`absolute top-0 left-0 min-h-screen w-full transition-all duration-500 ${
          sideNavOpen ? '' : '-translate-x-full'
        }`}
        style={{ background: 'rgba(0,0,0,0.5)' }}>
        <div
          className={`bg-gray-200 min-h-screen p-3 w-1/2 rounded-tr-xl rounded-br-xl`}>
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
                  <button className='w-full bg-white  border border-gray-500 rounded-xl py-2'>
                    <Link href={link.href}>{link.title}</Link>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
