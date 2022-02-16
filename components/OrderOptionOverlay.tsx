import { Else, If, Then } from 'react-if';
import { formatter } from '../lib/helper';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

type Props = {
  payments: {
    image: string;
    desc: string;
  }[];
  shippings: {
    type: string;
    price: number;
    desc: string;
  }[];
  show: boolean;
  showForShipping: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setShipping: Function;
  setPayment: Function;
};

export default function OrderOptionOverlay({
  payments,
  shippings,
  showForShipping,
  show,
  setShow,
  setShipping,
  setPayment,
}: Props) {
  return (
    <div
      className={classNames(
        'absolute top-0 left-0 w-full h-screen p-3 transition-all duration-500',
        {
          'translate-y-full': !show,
        },
      )}
      style={{ background: 'rgba(0,0,0,0.8)' }}>
      <h1 className='text-xl font-medium mb-4 text-gray-200 flex items-center'>
        <button onClick={() => setShow(false)}>
          <ArrowLeftIcon className='w-6 h-6 mr-2' />
        </button>
        Pilih Metode {showForShipping ? 'Pengiriman' : 'Pembayaran'}
      </h1>
      <ul className='space-y-2'>
        <If condition={showForShipping}>
          <Then>
            {shippings.map((shipping) => (
              <li
                onClick={() => {
                  setShipping(shipping);
                  setShow(false);
                }}
                key={shipping.type}
                className='bg-white text-sm p-2 border border-gray-300 rounded-md cursor-pointer shadow relative'>
                <span className='block'>
                  {shipping.type} : {formatter.format(shipping.price)}
                </span>
                <span className='block'>{shipping.desc}</span>
              </li>
            ))}
          </Then>
          <Else>
            {payments.map((payment) => (
              <li
                onClick={() => {
                  setPayment(payment);
                  setShow(false);
                }}
                key={payment.desc}
                className='bg-white flex items-center text-sm p-2 border border-gray-300 rounded-md cursor-pointer shadow relative'>
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
              </li>
            ))}
          </Else>
        </If>
      </ul>
    </div>
  );
}
