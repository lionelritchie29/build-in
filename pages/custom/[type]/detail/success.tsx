import classNames from 'classnames';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { If, Then } from 'react-if';
import Layout from '../../../../components/shared/_layout';
import { formatter, zeroPad } from '../../../../lib/helper';
import { CustomData } from '../../../../models/CustomData';
import { Payment } from '../../../../models/Payment';
import { Shipping } from '../../../../models/Shipping';
import SuccessImg from '../../../../public/images/success.png';
import { CustomService } from '../../../../services/CustomService';

const getRandom = () => {
  return Math.floor(Math.random() * 111111111111) + 111111111;
};

export default function CustomSuccess({
  randomOrderNumber,
  randomShippingNumber,
  type,
}) {
  const date = new Date();
  const [shipping, setShipping] = useState<Shipping>();
  const [payment, setPayment] = useState<Payment>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [custom, setCustom] = useState<CustomData>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCustom(CustomService.get());
      setPayment(CustomService.getPayment());
      setTotalPrice(50000000);
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
      <div className='w-full px-4 py-2 bg-white'>
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

        {/* <If condition={type === 'furniture'}>
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
            </div>
          </Then>
        </If> */}

        {/* <If condition={containServices}>
          <Then> */}
        <div className='mt-4 border-b border-gray-800 pb-6'>
          <h2 className='font-semibold text-lg mb-4'>Info</h2>
          <div className='flex'>
            <div className='w-1/2 space-y-2'>
              <span className='block'>Nama User :</span>
              <span className='block'>
                Nama{' '}
                {type === 'architecture'
                  ? 'Arsitek'
                  : type === 'interior'
                  ? 'Desainer'
                  : 'Pembuat'}{' '}
                :
              </span>
              <span className='block'>No. Telpon :</span>
              <span className='block'>Nama Proyek :</span>
              <span className='block'>Alamat :</span>
            </div>

            <div className='w-1/2 space-y-2'>
              <span className='block'>{custom?.name}</span>
              <span className='block'>Bagas Prakarsa</span>
              <span className='block'>{custom?.phone}</span>
              <span className='block'>Riung Tower</span>
              <span className='block text-xs'>{custom?.address}</span>
            </div>
          </div>
        </div>
        {/* </Then>
        </If> */}

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
              <span className='block'>Rp. 50.000</span>
            </div>
          </div>
        </div>

        <div className='border-b-2 border-gray-900 mt-10'>
          <div className='flex justify-between'>
            <h2 className='font-semibold text-lg mb-4'>Total Bayar</h2>
            <h2 className='font-semibold text-lg mb-4'>
              {' '}
              {formatter.format(5050000)}
            </h2>
          </div>
        </div>

        <Link href='/home' passHref={true}>
          <button className='inline-flex w-full justify-center items-center px-2.5 py-1.5 border border-transparent font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 mt-3'>
            Close
          </button>
        </Link>
      </div>
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

  const randomOrderNumber = getRandom();
  const randomShippingNumber = getRandom();
  const { type } = context.query;

  return {
    props: { session, randomOrderNumber, randomShippingNumber, type },
  };
}
