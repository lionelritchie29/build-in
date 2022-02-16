import { getSession, useSession } from 'next-auth/react';
import Layout from '../../components/shared/_layout';
import {
  UserIcon,
  PhoneIcon,
  LocationMarkerIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { CartService } from '../../services/CartService';
import CartItemComponent from '../../components/CartItem';
import { formatter } from '../../lib/helper';
import Link from 'next/link';
import { User } from '../../models/User';
import Image from 'next/image';
import OrderOptionOverlay from '../../components/OrderOptionOverlay';
import { Shipping } from '../../models/Shipping';
import { Payment } from '../../models/Payment';
import shippingsData from '../../data/shippings.json';
import paymentsData from '../../data/payments.json';

export default function OrderPage() {
  const [carts, setCarts] = useState([]);
  const session = useSession();
  const user = session.data.user as User;

  const shippings: Shipping[] = shippingsData.shippings;
  const payments: Payment[] = paymentsData.payments;
  const [shipping, setShipping] = useState(shippings[0]);
  const [payment, setPayment] = useState(payments[0]);
  const [showForShipping, setShowForShipping] = useState(true);
  const [showChooseOverlay, setShowChooseOverlay] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const crts = CartService.getAll();
      setCarts(crts);
    }
  }, []);

  const addQty = (id: string) => {
    setCarts(CartService.addQty(id));
  };

  const reduceQty = (id: string) => {
    setCarts(CartService.reduceQty(id));
  };

  return (
    <Layout title='Rincian'>
      <form className='space-y-3'>
        <div className='flex items-center w-full'>
          <div className='flex items-center'>
            <UserIcon className='w-5 h-5 mr-1' />
            <label className='block w-12 mr-3 text font-medium text-gray-700'>
              Nama
            </label>
          </div>
          <div className='w-full'>
            <input
              type='text'
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border px-1 border-gray-300 rounded'
              placeholder='Your Name'
              defaultValue={user.name}
            />
          </div>
        </div>

        <div className='flex items-center w-full'>
          <div className='flex items-center'>
            <PhoneIcon className='w-5 h-5 mr-1' />
            <label className='block w-12 mr-3 font-medium text-gray-700'>
              No Hp
            </label>
          </div>
          <div className='w-full'>
            <input
              type='text'
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border px-1 border-gray-300 rounded'
              placeholder='08xxxxxxxxx'
              defaultValue={user.phone}
            />
          </div>
        </div>

        <div className='items-center w-full'>
          <div className='flex items-center'>
            <LocationMarkerIcon className='w-5 h-5 mr-1' />
            <label className='block w-12 mr-3 font-medium text-gray-700'>
              Alamat
            </label>
          </div>
          <div className='w-full mt-2'>
            <textarea
              rows={3}
              defaultValue='Jl. Raya Kb. Jeruk No.27, RT.2/RW.9,  Kb. Jeruk, Kec. Kb. Jeruk,
              Kota Jakarta  Barat, Daerah Khusus Ibukota Jakarta  11530'
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border px-1 border-gray-300 rounded'></textarea>
          </div>
        </div>

        <div className='items-center w-full'>
          <div className='flex items-center'>
            <ShoppingBagIcon className='w-5 h-5 mr-1' />
            <label className='block w-12 mr-3 font-medium text-gray-700'>
              Inventory
            </label>
          </div>
          <div className='w-full mt-2'>
            <ul className='grid grid-cols-1 gap-4'>
              {carts.map((cart, idx) => {
                return (
                  <li key={cart.id}>
                    <CartItemComponent
                      addQty={addQty}
                      reduceQty={reduceQty}
                      cart={cart}
                      idx={idx}
                      forCartPage={false}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className='items-center w-full'>
          <div className='flex items-center'>
            <label className='block text-sm mr-3 font-medium text-gray-700'>
              Opsi Pengiriman
            </label>
          </div>
          <div className='w-full mt-2'>
            <div
              onClick={() => {
                setShowChooseOverlay(true);
                setShowForShipping(true);
              }}
              className='text-sm p-2 border border-gray-300 rounded-md cursor-pointer shadow relative'>
              <span className='block'>
                {shipping.type} : {formatter.format(shipping.price)}
              </span>
              <span className='block'>{shipping.desc}</span>

              <span className='absolute top-0 right-2 h-full flex items-center'>
                <ChevronDownIcon className='w-5 h-5' />
              </span>
            </div>
          </div>
        </div>

        <div className='items-center w-full'>
          <div className='flex items-center'>
            <label className='block text-sm mr-3 font-medium text-gray-700'>
              Metode Pembayaran
            </label>
          </div>
          <div className='w-full mt-2'>
            <div
              onClick={() => {
                setShowChooseOverlay(true);
                setShowForShipping(false);
              }}
              className='text-sm p-2 flex border items-center border-gray-300 rounded-md cursor-pointer shadow relative'>
              <span className='block'>
                <Image
                  src={`/images/${payment.image}`}
                  alt={payment.desc}
                  width={60}
                  height={40}
                  className='object-contain'
                />
              </span>
              <span className='block ml-2'>{payment.desc}</span>

              <span className='absolute top-0 right-2 h-full flex items-center'>
                <ChevronDownIcon className='w-5 h-5' />
              </span>
            </div>
          </div>
        </div>

        <div className='text-right mt-6 font-medium text-lg'>
          Total:{' '}
          {typeof window !== 'undefined' &&
            formatter.format(CartService.getTotal())}
        </div>

        <div className='mt-2'>
          <Link href='/order/submit' passHref={true}>
            <button
              type='submit'
              className='bg-primary-light hover:bg-primary-dark inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2'>
              Order
            </button>
          </Link>
        </div>
      </form>

      <OrderOptionOverlay
        payments={payments}
        shippings={shippings}
        showForShipping={showForShipping}
        show={showChooseOverlay}
        setShow={setShowChooseOverlay}
        setShipping={setShipping}
        setPayment={setPayment}
      />
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
