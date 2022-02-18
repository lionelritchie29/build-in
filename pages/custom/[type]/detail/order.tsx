import { getSession } from 'next-auth/react';
import Layout from '../../../../components/shared/_layout';
import {
  UserIcon,
  PhoneIcon,
  LocationMarkerIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
  PencilIcon,
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { formatter } from '../../../../lib/helper';
import Link from 'next/link';
import Image from 'next/image';
import OrderOptionOverlay from '../../../../components/OrderOptionOverlay';
import { Shipping } from '../../../../models/Shipping';
import { Payment } from '../../../../models/Payment';
import shippingsData from '../../../../data/shippings.json';
import paymentsData from '../../../../data/payments.json';
import { useRouter } from 'next/router';
import { OrderService } from '../../../../services/OrderService';
import { If, Then } from 'react-if';
import { CustomData } from '../../../../models/CustomData';
import { CustomService } from '../../../../services/CustomService';

type Props = {
  type: 'architecture' | 'interior' | 'furniture';
};

export default function OrderPage({ type }: Props) {
  const shippings: Shipping[] = shippingsData.shippings;
  const payments: Payment[] = paymentsData.payments;
  const [shipping, setShipping] = useState(shippings[0]);
  const [payment, setPayment] = useState(payments[0]);
  const [showForShipping, setShowForShipping] = useState(true);
  const [showChooseOverlay, setShowChooseOverlay] = useState(false);
  const [custom, setCustom] = useState<CustomData>();
  const router = useRouter();

  useEffect(() => {
    OrderService.saveShipping(shipping);
    OrderService.savePayment(payment);
  }, [shipping, payment]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCustom(CustomService.get());
    }
  }, [router]);

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
              disabled={true}
              type='text'
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border px-1 border-gray-300 rounded'
              placeholder='Your Name'
              defaultValue={custom?.name}
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
              disabled={true}
              type='text'
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border px-1 border-gray-300 rounded'
              placeholder='08xxxxxxxxx'
              defaultValue={custom?.phone}
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
              defaultValue={custom?.address}
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border px-1 border-gray-300 rounded'></textarea>
          </div>
        </div>

        <div className='items-center w-full'>
          <div className='flex items-center'>
            <PencilIcon className='w-5 h-5 mr-1' />
            <label className='block w-12 mr-3 font-medium text-gray-700'>
              {type === 'furniture' ? 'Furniture' : 'Project'}
            </label>
          </div>
          <div className='w-full mt-2'>
            <div className='flex'>
              <span className='block'>
                <Image
                  src={`/images/furniture/beds/2.jpg`}
                  alt={payment.desc}
                  width={150}
                  height={100}
                  className='object-cover rounded'
                />
              </span>

              <span className='block ml-2'>
                <h3 className='text-lg font-semibold'>Riung Tower</h3>
                <span className='block text-xs -mt-1'>Bagas Prakarsa</span>
                <span className='block text-lg font-medium mt-2'>
                  {formatter.format(50000000)}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* <If condition={containGoods}>
          <Then>
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
          </Then>
        </If> */}

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
          Total: {formatter.format(50000000)}
        </div>

        <div className='mt-2'>
          <Link
            href={`${router.asPath.replace('order', '')}/success`}
            passHref={true}>
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
        forCart={false}
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

  const { type } = context.query;

  if (!type) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  const previousUrl = context.req.headers.referer;
  if (!previousUrl || !previousUrl.includes(`/custom/${type}/detail`)) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: { session, type },
  };
}
