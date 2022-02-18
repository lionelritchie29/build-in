import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { formatter } from '../lib/helper';
import { CartItem } from '../models/CartItem';
import categories from '../data/categories.json';
import { Else, If, Then } from 'react-if';

type Props = {
  cart: CartItem;
  checkeds?: boolean[];
  setCheckeds?: Dispatch<SetStateAction<boolean[]>>;
  idx: number;
  addQty: (id: string) => void;
  reduceQty: (id: string) => void;
  forCartPage: boolean;
};

export default function CartItemComponent({
  cart,
  checkeds,
  idx,
  setCheckeds,
  addQty,
  reduceQty,
  forCartPage,
}: Props) {
  const getHref = (c: CartItem): string => {
    if (c.type === 'interior' || c.type === 'architecture') {
      const category = categories.categories.find((x) => x.id == c.categoryId);
      const sub = category.sub_categories.find((x) => x.id == c.subCategoryId);

      return `/categories/${c.categoryId}/subs/${c.subCategoryId}/portfolios/${sub.type}/${c.id}`;
    }

    return `/categories/${c.categoryId}/subs/${c.subCategoryId}/products/${c.id}`;
  };

  return (
    <div className='flex'>
      <div className='flex items-center w-2/5'>
        {checkeds && checkeds.length && (
          <div className='mr-1'>
            <input
              onChange={() => {
                if (!checkeds) return;
                checkeds[idx] = !checkeds[idx];
                setCheckeds([...checkeds]);
              }}
              type='checkbox'
              checked={checkeds[idx]}
            />
          </div>
        )}

        <div className='border border-gray-300 rounded-md flex'>
          <Image
            src={`/images/${cart.image}`}
            width={400}
            height={350}
            alt={cart.id}
            className='object-cover flex-1'
          />
        </div>
      </div>
      <div className='flex flex-col ml-2 w-3/5'>
        <span className='block font-medium text-sm'>{cart.name}</span>

        <If condition={forCartPage}>
          <Then>
            <span className='block text-sm'>
              {formatter.format(cart.price)}
            </span>
          </Then>
          <Else>
            <span className='block text-sm'>Brown</span>
          </Else>
        </If>

        <div className='flex mt-2'>
          <div className='w-1/2'>
            <If condition={forCartPage}>
              <Then>
                <Link href={getHref(cart)} passHref={true}>
                  <button
                    type='button'
                    className='w-full justify-center inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2'>
                    Detail
                  </button>
                </Link>
              </Then>
              <Else>
                <span className='block text-sm font-medium'>
                  {formatter.format(cart.price)}
                </span>
              </Else>
            </If>
          </div>

          <div className='ml-2 flex space-x-1'>
            <button
              type='button'
              onClick={() => {
                reduceQty(cart.id);
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
              />
            </span>
            <button
              type='button'
              onClick={() => {
                addQty(cart.id);
              }}
              className='w-6 h-6 rounded-full bg-gray-800 text-white font-medium'>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
