import { ChevronDownIcon, StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Layout from '../components/shared/_layout';

export default function SellerPage() {
  return (
    <Layout title='Seller'>
      <div className='mt-3 flex pb-4 border-b border-gray-400'>
        <Image
          src='https://i.pravatar.cc/100'
          alt=''
          width={65}
          height={65}
          className='rounded-lg'
        />

        <div className='ml-2'>
          <span className='block text-lg font-bold'>IKAE Alam Sutera</span>
          <div className='flex text-yellow-500'>
            {[1, 2, 3, 4, 5].map((x, idx) => (
              <StarIcon key={idx} className='w-5 h-5' />
            ))}
          </div>
        </div>
      </div>

      <ul className='mt-4 space-y-4 pb-4 border-b border-gray-400'>
        {[
          'Saldo Penjual',
          'Penghasilan',
          'Penilaian Toko',
          'Promosi Toko',
          'Seller Center',
        ].map((feature) => (
          <li className='flex justify-between' key={feature}>
            <span className='block font-bold text-lg'>{feature}</span>
            <span className='block p-1 border text-lg border-gray-500'>
              <ChevronDownIcon className='w-4 h-4' />
            </span>
          </li>
        ))}
      </ul>

      <ul className='grid grid-cols-3 gap-3 mt-4'>
        {[1, 2, 3, 4, 5, 6].map((x) => (
          <li
            key={x}
            className='border border-gray-300 rounded flex justify-center items-center'>
            <Image
              src={`/images/furniture/beds/1.jpg`}
              alt=''
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
    </Layout>
  );
}
