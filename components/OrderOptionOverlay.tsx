import { Else, If, Then } from 'react-if';
import { formatter } from '../lib/helper';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { OrderService } from '../services/OrderService';
import { Shipping } from '../models/Shipping';
import { Payment } from '../models/Payment';
import { CustomService } from '../services/CustomService';
import useWindowSize from '../hooks/UseWindowSize';

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
  forCart?: boolean;
};

export default function OrderOptionOverlay({
  payments,
  shippings,
  showForShipping,
  show,
  setShow,
  setShipping,
  setPayment,
  forCart,
}: Props) {
  forCart = forCart === undefined ? true : forCart;

  const saveShipping = (shipping: Shipping) => {
    if (forCart) {
      OrderService.saveShipping(shipping);
    }

    setShipping(shipping);
    setShow(false);
  };

  const centerFixed = {
    left: '50%',
    marginLeft: '-14rem',
    background: 'rgba(0,0,0,0.8)',
  };

  const savePayment = (payment: Payment) => {
    if (forCart) {
      OrderService.savePayment(payment);
    } else {
      CustomService.savePayment(payment);
    }

    setPayment(payment);
    setShow(false);
  };

  const size = useWindowSize();

  return (
    <div
      style={size.width > 448 ? centerFixed : { background: 'rgba(0,0,0,0.8)' }}
      className={classNames(
        'fixed top-0 left-0 w-full max-w-md h-screen p-3 transition-all duration-500',
        {
          'translate-y-full': !show,
        },
      )}>
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
                onClick={() => saveShipping(shipping)}
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
                onClick={() => savePayment(payment)}
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
