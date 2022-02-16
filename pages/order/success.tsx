import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { If, Then } from 'react-if';
import Layout from '../../components/shared/_layout';
import { zeroPad } from '../../lib/helper';
import { User } from '../../models/User';
import SuccessImg from '../../public/images/success.png';
import { CartService } from '../../services/CartService';
import { OrderService } from '../../services/OrderService';

export default function OrderSuccess() {
  const date = new Date();
  const session = useSession();
  const user = session.data.user as User;
  const [carts, setCarts] = useState([]);
  const [containGood, setContainGoods] = useState(false);
  const [containServices, setContainServices] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCarts(CartService.getAll());
      setContainGoods(CartService.containGoods());
      setContainServices(CartService.containService());
      setAddress(OrderService.getAddress());
    }
  }, []);

  const getDateString = () => {
    return `${zeroPad(date.getDate(), 2)} / ${zeroPad(
      date.getMonth() + 1,
      2,
    )} / ${date.getFullYear()}`;
  };

  const getRandom = () => {
    return Math.floor(Math.random() * 111111111111) + 111111111;
  };

  return (
    <Layout title='Bu!ld-In'>
      <div className='flex justify-center mt-12'>
        <Image src={SuccessImg} alt='' width={200} height={200} />
      </div>

      <div className='mt-4 border-b border-gray-800 pb-8'>
        <h1 className='font-bold text-xl text-center'>
          Thank you for buying <br />
          Your order has been confirmed
        </h1>

        <div className='text-center mt-4'>
          <span className='block font-semibold text-lg'>{getDateString()}</span>
          <span className='block font-semibold text-lg'>
            Order: BI-{getRandom()}
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
                <span className='block'>GK-{getRandom()}</span>
                <span className='block'>
                  <span className='block'>{user.name}</span>
                  <span className='block text-xs'>{address}</span>
                </span>
              </div>
            </div>

            <button className='inline-flex w-full justify-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 mt-3'>
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
              <div key={cart.id} className='mt-4 border-b border-gray-800 pb-6'>
                <h2 className='font-semibold text-lg mb-4'>
                  Info Jasa (
                  {cart.type === 'architecture' ? 'Arsitektur' : 'Interior'})
                </h2>
                <div className='flex'>
                  <div className='w-1/2 space-y-2'>
                    <span className='block'>Nama User :</span>
                    <span className='block'>
                      Nama{' '}
                      {cart.type === 'architecture' ? 'Arsitek' : 'Desainer'} :
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

                <button className='inline-flex w-full justify-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 mt-3'>
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
            <span className='block'>Rp. 3.300.000</span>
            <span className='block'>Rp. 150.000</span>
            <span className='block'>Rp. 50.000</span>
          </div>
        </div>
      </div>

      <div className='border-b-2 border-gray-900 mt-10'>
        <div className='flex justify-between'>
          <h2 className='font-semibold text-lg mb-4'>Total Bayar</h2>
          <h2 className='font-semibold text-lg mb-4'> Rp3.500.000</h2>
        </div>
      </div>

      <button className='inline-flex w-full justify-center items-center px-2.5 py-1.5 border border-transparent font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 mt-3'>
        Close
      </button>
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

  return {
    props: { session },
  };
}
