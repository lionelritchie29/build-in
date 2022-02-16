import { getSession } from 'next-auth/react';
import Layout from '../../components/shared/_layout';
import { LocationMarkerIcon, ShoppingBagIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { CartService } from '../../services/CartService';
import CartItemComponent from '../../components/CartItem';
import { formatter } from '../../lib/helper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { OrderService } from '../../services/OrderService';
import { Shipping } from '../../models/Shipping';
import Image from 'next/image';
import { Payment } from '../../models/Payment';
import { If, Then } from 'react-if';

export default function OrderSubmitPage() {
  const [carts, setCarts] = useState([]);
  const router = useRouter();
  const [shipping, setShipping] = useState<Shipping>({
    desc: '',
    type: '',
    price: 0,
  });
  const [payment, setPayment] = useState<Payment>({ image: '', desc: '' });
  const [containGoods, setContainGoods] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShipping(OrderService.getShipping());
      setPayment(OrderService.getPayment());

      const crts = CartService.getAll();
      if (!crts.length) router.push('/home');
      setCarts(crts);
    }
  }, [router, carts]);

  useEffect(() => {
    if (CartService.containGoods()) setContainGoods(true);
    else setContainGoods(false);
  }, []);

  const addQty = (id: string) => {
    setCarts(CartService.addQty(id));
  };

  const reduceQty = (id: string) => {
    setCarts(CartService.reduceQty(id));
  };

  return (
    <Layout title='Rincian'>
      <h1 className='text-center text-xl font-semibold mb-6'>
        Konfirmasi Pembayaran
      </h1>
      <form className='space-y-3'>
        <div className='items-center w-full'>
          <div className='flex items-center'>
            <LocationMarkerIcon className='w-5 h-5 mr-1' />
            <label className='block w-12 mr-3 font-medium text-gray-700'>
              Alamat
            </label>
          </div>
          <div className='w-full mt-2'>
            <div className='text-sm p-2 border border-gray-200 rounded-md'>
              Jl. Raya Kb. Jeruk No.27, RT.2/RW.9,  Kb. Jeruk, Kec. Kb. Jeruk,
              Kota Jakarta  Barat, Daerah Khusus Ibukota Jakarta  11530
            </div>
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

        <If condition={containGoods}>
          <Then>
            <div className='items-center w-full'>
              <div className='flex items-center'>
                <label className='block text-sm mr-3 font-medium text-gray-700'>
                  Opsi Pengiriman
                </label>
              </div>
              <div className='w-full mt-2'>
                <div className='text-sm p-2 border border-gray-200 rounded-md'>
                  <span className='block'>
                    {shipping.type} : {formatter.format(shipping.price)}
                  </span>
                  <span className='block'>{shipping.desc}</span>
                </div>
              </div>
            </div>
          </Then>
        </If>

        <div className='items-center w-full'>
          <div className='flex items-center'>
            <label className='block text-sm mr-3 font-medium text-gray-700'>
              Metode Pembayaran
            </label>
          </div>
          <div className='w-full mt-2'>
            <div className='text-sm flex items-center p-2 border border-gray-200 rounded-md'>
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
