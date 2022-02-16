import classNames from 'classnames';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'path/posix';
import { useEffect, useState } from 'react';
import { If, Then } from 'react-if';
import OrderSuccessOverlay from '../../components/OrderSuccessOverlay';
import Layout from '../../components/shared/_layout';
import { formatter, zeroPad } from '../../lib/helper';
import { Payment } from '../../models/Payment';
import { Shipping } from '../../models/Shipping';
import { User } from '../../models/User';
import SuccessImg from '../../public/images/success.png';
import { CartService } from '../../services/CartService';
import { OrderService } from '../../services/OrderService';

const getRandom = () => {
  return Math.floor(Math.random() * 111111111111) + 111111111;
};

export default function OrderSuccess({
  randomOrderNumber,
  randomShippingNumber,
}) {
  const date = new Date();
  const session = useSession();
  const user = session.data.user as User;
  const [carts, setCarts] = useState([]);
  const [containGood, setContainGoods] = useState(false);
  const [containServices, setContainServices] = useState(false);
  const [shipping, setShipping] = useState<Shipping>({
    desc: '',
    price: 0,
    type: '',
  });
  const [payment, setPayment] = useState<Payment>({
    desc: '',
    image: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [showTracking, setShowTracking] = useState(false);
  const [trackingType, setTrackingType] = useState<
    'architecture' | 'interior' | 'item'
  >('item');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCarts(CartService.getAll());
      setContainGoods(CartService.containGoods());
      setContainServices(CartService.containService());
      setAddress(OrderService.getAddress());
      setPayment(OrderService.getPayment());
      setShipping(OrderService.getShipping());
      setTotalPrice(CartService.getTotal());
    }
  }, []);

  const getDateString = () => {
    return `${zeroPad(date.getDate(), 2)} / ${zeroPad(
      date.getMonth() + 1,
      2,
    )} / ${date.getFullYear()}`;
  };

  return (
    <Layout title='Bu!ld-In' withPadding={false}>
      <div
        className={classNames(
          'w-full transition-all px-4 py-2 duration-500 bg-white',
          {
            '-translate-y-full': showTracking,
          },
        )}>
        <div className='flex justify-center mt-12'>
          <Image src={SuccessImg} alt='' width={200} height={200} />
        </div>

        <div className='mt-4 border-b border-gray-800 pb-8'>
          <h1 className='font-bold text-xl text-center'>
            Thank you for buying <br />
            Your order has been confirmed
          </h1>

          <div className='text-center mt-4'>
            <span className='block font-semibold text-lg'>
              {getDateString()}
            </span>
            <span className='block font-semibold text-lg'>
              Order: BI-{randomOrderNumber}
            </span>
          </div>
        </div>

        <If condition={containGood}>
          <Then>
            <div className='mt-4 border-b border-gray-800 pb-6'>
              <h2 className='font-semibold text-lg mb-4'>Info Pengiriman</h2>
              <div className='flex'>
                <div className='w-1/2 space-y-2'>
                  <span className='block'>Kurir :</span>
                  <span className='block'>Nomor Resi :</span>
                  <span className='block'>Alamat :</span>
                </div>

                <div className='w-1/2 space-y-2'>
                  <span className='block'>GoSend - Same Day</span>
                  <span className='block'>GK-{randomShippingNumber}</span>
                  <span className='block'>
                    <span className='block'>{user.name}</span>
                    <span className='block text-xs'>{address}</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setTrackingType('item');
                  setShowTracking(true);
                }}
                className='inline-flex w-full justify-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 mt-3'>
                Lacak
              </button>
            </div>
          </Then>
        </If>

        <If condition={containServices}>
          <Then>
            {carts
              .filter((c) => c.type === 'architecture' || c.type === 'interior')
              .map((cart) => (
                <div
                  key={cart.id}
                  className='mt-4 border-b border-gray-800 pb-6'>
                  <h2 className='font-semibold text-lg mb-4'>
                    Info Jasa (
                    {cart.type === 'architecture' ? 'Arsitektur' : 'Interior'})
                  </h2>
                  <div className='flex'>
                    <div className='w-1/2 space-y-2'>
                      <span className='block'>Nama User :</span>
                      <span className='block'>
                        Nama{' '}
                        {cart.type === 'architecture' ? 'Arsitek' : 'Desainer'}{' '}
                        :
                      </span>
                      <span className='block'>No. Telpon :</span>
                      <span className='block'>Nama Proyek :</span>
                      <span className='block'>Alamat :</span>
                    </div>

                    <div className='w-1/2 space-y-2'>
                      <span className='block'>{user.name}</span>
                      <span className='block'>
                        {cart.creator.split('-')[0].trim()}
                      </span>
                      <span className='block'>{user.phone}</span>
                      <span className='block'>{cart.name}</span>
                      <span className='block text-xs'>{address}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setTrackingType(cart.type);
                      setShowTracking(true);
                    }}
                    className='inline-flex w-full justify-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 mt-3'>
                    Lacak
                  </button>
                </div>
              ))}
          </Then>
        </If>

        <div className='mt-4 border-gray-800 border-b pb-1'>
          <h2 className='font-semibold text-lg mb-4'>Rincian Pembayaran</h2>
          <div className='flex'>
            <div className='w-1/2 space-y-2'>
              <span className='block'>Metode Pembayaran:</span>
              <span className='block'>Total Harga (1 barang):</span>
              <span className='block'>Total Ongkos Kirim:</span>
              <span className='block'>Biaya Asuransi:</span>
            </div>

            <div className='w-1/2 space-y-2 text-right'>
              <span className='block'>BCA - Virtual Account</span>
              <span className='block'>{formatter.format(totalPrice)}</span>

              <If condition={containGood}>
                <Then>
                  <span className='block'>
                    {formatter.format(shipping.price)}
                  </span>
                </Then>
              </If>

              <span className='block'>Rp. 50.000</span>
            </div>
          </div>
        </div>

        <div className='border-b-2 border-gray-900 mt-10'>
          <div className='flex justify-between'>
            <h2 className='font-semibold text-lg mb-4'>Total Bayar</h2>
            <h2 className='font-semibold text-lg mb-4'>
              {' '}
              {formatter.format(
                containGood ? totalPrice + shipping.price : totalPrice,
              )}
            </h2>
          </div>
        </div>

        <Link href='/home' passHref={true}>
          <button className='inline-flex w-full justify-center items-center px-2.5 py-1.5 border border-transparent font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 mt-3'>
            Close
          </button>
        </Link>
      </div>

      <OrderSuccessOverlay
        show={showTracking}
        setShow={setShowTracking}
        type={trackingType}
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

  const previousUrl = context.req.headers.referer;
  if (!previousUrl || !previousUrl.includes('/order/submit')) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  const randomOrderNumber = getRandom();
  const randomShippingNumber = getRandom();

  return {
    props: { session, randomOrderNumber, randomShippingNumber },
  };
}
