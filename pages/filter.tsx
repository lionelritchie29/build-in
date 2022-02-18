import { SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Layout from '../components/shared/_layout';
import { formatter } from '../lib/helper';

export default function FilterPage() {
  const prices = [
    '0-75000',
    '300000-500000',
    '1250000-1500000',
    '100000-250000',
    '750000-1000000',
    '2000000-3000000',
  ];

  const locations = [
    'Jakarta',
    'Aceh',
    'Jogja',
    'Riau',
    'Kalimantan',
    'Bandung',
  ];

  const others = ['Customize', 'Pre Order', 'Ready Stock'];

  return (
    <Layout title='Filter'>
      <form>
        <div>
          <label className='block font-semibold text-lg'>Gaya</label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
            <input
              type='text'
              className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm p-2 border border-gray-300 rounded-md'
              placeholder='Search'
            />
          </div>
        </div>

        <div>
          <label className='block font-semibold text-lg mt-4'>Brand</label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
            <input
              type='text'
              className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm p-2 border border-gray-300 rounded-md'
              placeholder='Search'
            />
          </div>
        </div>

        <div>
          <label className='block font-semibold text-lg mt-4'>Harga</label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <ul className='grid grid-cols-1 gap-4 mb-4'>
              {prices.map((price) => {
                const data = price.split('-');
                return (
                  <li key={price} className='flex items-center relative'>
                    <input className='block w-6 h-6' type='checkbox' />
                    <span className='block ml-1 text-sm'>
                      {formatter.format(parseInt(data[0]))} -{' '}
                      {formatter.format(parseInt(data[1]))}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div>
          <label className='block font-semibold text-lg mt-4'>Lokasi</label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <ul className='grid grid-cols-2 gap-4 mb-4'>
              {locations.map((loc) => {
                return (
                  <li key={loc} className='flex items-center relative'>
                    <input className='block w-6 h-6' type='checkbox' />
                    <span className='block ml-1 text-sm'>{loc}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div>
          <label className='block font-semibold text-lg mt-4'>Warna</label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
            <input
              type='text'
              className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm p-2 border border-gray-300 rounded-md'
              placeholder='Search'
            />
          </div>
        </div>

        <div>
          <label className='block font-semibold text-lg mt-4'>Lainnya</label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <ul className='grid grid-cols-2 gap-4 mb-4'>
              {others.map((other) => {
                return (
                  <li key={other} className='flex items-center relative'>
                    <input className='block w-6 h-6' type='checkbox' />
                    <span className='block ml-1 text-sm'>{other}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className='mt-2'>
          <Link href='/home' passHref={true}>
            <button
              type='submit'
              className='bg-primary-light hover:bg-primary-dark inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2'>
              Search
            </button>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
