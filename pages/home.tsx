import { getSession, useSession } from 'next-auth/react';
import Layout from '../components/shared/_layout';
import profileIcon from '../public/images/profile.png';
import categoryIcon from '../public/images/category.png';
import chatIcon from '../public/images/chat.png';
import BottomNav from '../components/shared/_BottomNav';
import { SearchIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { formatter } from '../lib/helper';
import categories from '../data/categories.json';
import furnitures from '../data/furnitures.json';
import others from '../data/others.json';
import materials from '../data/materials.json';
import accesories from '../data/accesories.json';
import { Else, If, Then } from 'react-if';
import Link from 'next/link';
import { useState } from 'react';

export default function Home({ data, rawData }) {
  const [products, setProducts] = useState(data);

  const bottomLinks = [
    {
      title: 'Profile',
      image: profileIcon,
      href: '/profile',
    },
    {
      title: 'Categories',
      image: categoryIcon,
      href: '/categories',
    },
    {
      title: 'chat',
      image: chatIcon,
      href: '/chat',
    },
  ];

  const formatRangePrice = (price: string) => {
    if (typeof price === 'number') return '';
    return `${formatter.format(
      parseInt(price.split('-')[0]),
    )} - ${formatter.format(parseInt(price.split('-')[1]))}`;
  };

  const getHref = (product) => {
    const acc = accesories.accesories.find((c) =>
      c.products.some((p) => p.id === product.id),
    );
    const furn = furnitures.furnitures.find((c) =>
      c.products.some((p) => p.id === product.id),
    );
    const mat = materials.materials.find((c) =>
      c.products.some((p) => p.id === product.id),
    );
    const other = others.others.find((c) =>
      c.products.some((p) => p.id === product.id),
    );
    const category = acc ?? furn ?? mat ?? other;

    return `/categories/${category.category_id}/subs/${category.sub_category_id}/products/${product.id}`;
  };

  const search = (query: string) => {
    if (query === '') {
      setProducts(data);
    } else {
      setProducts(
        rawData.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }
  };

  return (
    <Layout showMenu={true} title='Bu!ld-In' showCart={true} showFilter={true}>
      <div>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
          <input
            onChange={(e) => search(e.target.value)}
            type='text'
            className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm p-2 border border-gray-300 rounded-md'
            placeholder='Search'
          />
        </div>
      </div>

      <Carousel
        className='mt-4'
        showThumbs={false}
        showArrows={true}
        emulateTouch={true}>
        {data
          .filter(
            (d, idx) =>
              idx === data.length - 1 ||
              idx === data.length - 2 ||
              idx === data.length - 3,
          )
          .map((el, index) => (
            <div
              key={index}
              className='border border-gray-300 rounded-md flex'
              style={{ position: 'relative' }}>
              <Image
                className={`tns-lazy-img object-cover flex-1`}
                src={`/images/${el.image}`}
                data-src={el}
                alt=''
                width={400}
                height={300}
              />
            </div>
          ))}
      </Carousel>

      <ul className='grid grid-cols-3 gap-4 mt-4'>
        {products.map((p, idx) => (
          <li className='flex flex-col' key={idx}>
            <Link href={getHref(p)} passHref={true}>
              <div className='cursor-pointer rounded border overflow-auto border-gray-300 flex'>
                <Image
                  src={`/images/${p.image}`}
                  alt=''
                  className='rounded object-cover flex-1'
                  width={150}
                  height={150}
                />
              </div>
            </Link>

            <div>
              <span className='block font-medium text-xs truncate'>
                {p.name}
              </span>
              <span className='block font-medium text-sm truncate'>
                <If condition={typeof p.price === 'number'}>
                  <Then>{formatter.format(p.price)}</Then>
                  <Else>{formatRangePrice(p.price)}</Else>
                </If>
              </span>
            </div>
          </li>
        ))}
      </ul>

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

  const rawData = [];

  accesories.accesories.forEach((p) => rawData.push(...p.products));
  materials.materials.forEach((p) => rawData.push(...p.products));
  furnitures.furnitures.forEach((p) => rawData.push(...p.products));
  others.others.forEach((p) => rawData.push(...p.products));

  const data = [];

  while (data.length < 12) {
    const idx = Math.floor(Math.random() * rawData.length);
    if (!data.find((d) => d.id === rawData[idx].id)) data.push(rawData[idx]);
  }

  return {
    props: { session, data, rawData },
  };
}
