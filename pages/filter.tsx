import { SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/shared/_layout';
import { MAX_NUMBER, MIN_NUMBER } from '../lib/constant';
import { formatter } from '../lib/helper';

export default function FilterPage() {
  const router = useRouter();

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
  const [price, setPrice] = useState([]);
  const [location, setLocation] = useState([]);
  const [style, setStyle] = useState(null);
  const [color, setColor] = useState(null);
  const [brand, setBrand] = useState(null);
  const [other, setOther] = useState([]);

  const handlePriceCheckbox = (e) => {
    if (e.target.checked) {
      if (!price.includes(e.target.value)) {
        setPrice([...price, e.target.value]);
      }
    } else {
      if (price.includes(e.target.value)) {
        setPrice(price.filter((p) => p !== e.target.value));
      }
    }
  };

  const handleLocationCheckbox = (e) => {
    if (e.target.checked) {
      if (!location.includes(e.target.value)) {
        setLocation([...location, e.target.value]);
      }
    } else {
      if (location.includes(e.target.value)) {
        setLocation(location.filter((p) => p !== e.target.value));
      }
    }
  };

  const handleOtherCheckbox = (e) => {
    if (e.target.checked) {
      if (!other.includes(e.target.value)) {
        setOther([...other, e.target.value]);
      }
    } else {
      if (other.includes(e.target.value)) {
        setOther(other.filter((p) => p !== e.target.value));
      }
    }
  };

  const onFilter = () => {
    let minPrice = MAX_NUMBER;
    let maxPrice = MIN_NUMBER;
    price.forEach((p) => {
      const split = p.split('-');
      if (parseInt(split[0]) > maxPrice) {
        maxPrice = parseInt(split[0]);
      }

      if (parseInt(split[0]) < minPrice) {
        minPrice = parseInt(split[0]);
      }

      if (parseInt(split[1]) > maxPrice) {
        maxPrice = parseInt(split[1]);
      }

      if (parseInt(split[1]) < minPrice) {
        minPrice = parseInt(split[1]);
      }
    });

    const query = {
      filter: true,
    };

    if (minPrice !== MAX_NUMBER) query['minPrice'] = minPrice;
    if (maxPrice !== MIN_NUMBER) query['maxPrice'] = maxPrice;
    if (color) query['color'] = color;
    if (style) query['style'] = style;
    if (brand) query['brand'] = brand;
    if (location) query['location'] = location;
    if (other) query['other'] = other;

    router.push({
      pathname: '/home',
      query,
    });
  };

  return (
    <Layout title='Filter'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFilter();
        }}>
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
              onChange={(e) => setStyle(e.target.value)}
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
              onChange={(e) => setBrand(e.target.value)}
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
                    <input
                      value={price}
                      onChange={handlePriceCheckbox}
                      className='block w-6 h-6'
                      type='checkbox'
                    />
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
                    <input
                      value={loc}
                      onChange={handleLocationCheckbox}
                      className='block w-6 h-6'
                      type='checkbox'
                    />
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
              onChange={(e) => setColor(e.target.value)}
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
                    <input
                      value={other}
                      onChange={handleOtherCheckbox}
                      className='block w-6 h-6'
                      type='checkbox'
                    />
                    <span className='block ml-1 text-sm'>{other}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className='mt-2'>
          <button
            type='submit'
            className='bg-primary-light hover:bg-primary-dark inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2'>
            Search
          </button>
        </div>
      </form>
    </Layout>
  );
}
