import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Layout from '../../components/shared/_layout';
import { formatter } from '../../lib/helper';
import { CartItem } from '../../models/CartItem';
import { CartService } from '../../services/CartService';
import chatIcon from '../../public/images/chat.png';

import categories from '../../data/categories.json';
import BottomNav from '../../components/shared/_BottomNav';
import { Else, If, Then } from 'react-if';

export default function CartPage() {
  const [carts, setCarts] = useState([]);
  const [checkeds, setCheckeds] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const crts = CartService.getAll();
      setCarts(crts);

      const checkedArr = [];
      crts.forEach((c) => checkedArr.push(false));
      setCheckeds(checkedArr);
    }
  }, []);

  const clear = () => {
    CartService.clear();
    setCarts([]);
    setCheckeds([]);
  };

  const checkAll = (e) => {
    if (!e.target.checked) {
      setCheckeds(checkeds.map((_) => false));
    } else {
      setCheckeds(checkeds.map((_) => true));
    }
  };

  const getHref = (idx: number): string => {
    const c: CartItem = carts[idx];
    if (c.type === 'interior' || c.type === 'architecture') {
      const category = categories.categories.find((x) => x.id == c.categoryId);
      const sub = category.sub_categories.find((x) => x.id == c.subCategoryId);

      return `/categories/${c.categoryId}/subs/${c.subCategoryId}/portfolios/${sub.type}/${c.id}`;
    }

    return `/categories/${c.categoryId}/subs/${c.subCategoryId}/products/${c.id}`;
  };

  const bottomLinks = [
    {
      title: '',
      image: chatIcon,
      href: '/cart',
    },
    {
      title: '',
      href: '/home',
      text: 'Order',
      onClick: () => {},
    },
  ];

  return (
    <Layout title='Bu!ld-In'>
      <If condition={!carts.length}>
        <Then>
          <div className='text-center'>Your cart is empty</div>
        </Then>
        <Else>
          <div className='flex justify-between mb-4 mt-2'>
            <div className='w-1/2 flex items-center'>
              <input type='checkbox' onChange={checkAll} />
              <span className='block ml-1'>Select All</span>
            </div>

            <button
              type='button'
              onClick={() => clear()}
              className='justify-center inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2'>
              Clear
            </button>
          </div>
        </Else>
      </If>

      <ul className='grid grid-cols-1 gap-4'>
        {carts.map((cart, idx) => {
          return (
            <li key={cart.id} className='flex'>
              <div className='flex items-center w-2/5'>
                <div className='mr-1'>
                  <input
                    onChange={() => {
                      checkeds[idx] = !checkeds[idx];
                      setCheckeds([...checkeds]);
                    }}
                    type='checkbox'
                    checked={checkeds[idx]}
                  />
                </div>
                <Image
                  src={`/images/furniture/beds/2.jpg`}
                  width={400}
                  height={350}
                  alt={cart.id}
                  className='object-cover rounded-lg'
                />
              </div>
              <div className='flex flex-col ml-2 w-3/5'>
                <span className='block font-medium text-sm'>{cart.name}</span>
                <span className='block text-sm'>
                  {formatter.format(cart.price)}
                </span>

                <div className='flex mt-2'>
                  <div className='w-1/2'>
                    <Link href={getHref(idx)} passHref={true}>
                      <button
                        type='button'
                        className='w-full justify-center inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2'>
                        Detail
                      </button>
                    </Link>
                  </div>

                  <div className='ml-2 flex space-x-1'>
                    <button
                      onClick={() => {
                        setCarts(CartService.reduceQty(cart.id));
                      }}
                      className='w-6 h-6 rounded-full bg-gray-800 text-white font-medium'>
                      -
                    </button>
                    <span className=''>
                      <input
                        type='number'
                        className='inline w-12 h-6 text-center border border-gray-300 rounded'
                        value={cart.quantity}
                        onChange={() => {}}
                        min={1}
                      />
                    </span>
                    <button
                      onClick={() => {
                        setCarts(CartService.addQty(cart.id));
                      }}
                      className='w-6 h-6 rounded-full bg-gray-800 text-white font-medium'>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
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

  return {
    props: { session },
  };
}
