import { Else, If, Then } from 'react-if';
import { formatter } from '../lib/helper';
import { CheckIcon, ArrowDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { OrderService } from '../services/OrderService';
import { Shipping } from '../models/Shipping';
import { Payment } from '../models/Payment';

type Props = {
  type: 'item' | 'architecture' | 'interior';
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export default function OrderSuccessOverlay({ type, show, setShow }: Props) {
  const itemTrackingImages = [
    'track_item1.jpg',
    'track_item2.jpg',
    'track_item3.jpg',
  ];
  const serviceTrackingImages = [
    'track_service1.jpg',
    'track_service2.jpg',
    'track_service3.jpg',
  ];

  const itemSteps = [
    {
      date: new Date(),
      desc: 'Pembayaran telah diverifikasi. <br/>Pembayaran telah diterima dan pesanan Anda sudah diteruskan ke penjual.',
      active: false,
    },
    {
      date: new Date(),
      desc: 'Pesanan sedang diproses oleh penjual',
      active: false,
    },
    {
      date: new Date(),
      desc: 'Pesanan akan dipickup ke gerai kurir terdekat',
      active: false,
    },
    {
      date: new Date(),
      desc: 'Pesanan Anda dalam proses pengiriman oleh kurir',
      active: true,
    },
  ];

  const interiorSteps = [
    {
      date: new Date(),
      desc: 'Melakukan verifikasi pada detail custom interior.<br/>Melakukan konsultasi awal di detail custom interior',
      active: false,
    },
    {
      date: new Date(),
      desc: 'Melakukan revisi pada proyek di detail custom interior',
      active: false,
    },
    {
      date: new Date(),
      desc: 'Melakukan deal pada proyek',
      active: false,
    },
    {
      date: new Date(),
      desc: 'Sudah melakukan pembayaran dan terkonfirmasi',
      active: true,
    },
  ];

  const architectureSteps = [
    {
      date: new Date(),
      desc: 'Melakukan verifikasi pada detail custom arsitektur.<br/>Melakukan konsultasi awal di detail custom arsitektur',
      active: false,
    },
    {
      date: new Date(),
      desc: 'Melakukan revisi pada proyek di detail custom arsitektur',
      active: false,
    },
    {
      date: new Date(),
      desc: 'Melakukan deal pada proyek',
      active: false,
    },
    {
      date: new Date(),
      desc: 'Sudah melakukan pembayaran dan terkonfirmasi',
      active: true,
    },
  ];

  return (
    <div
      className={classNames(
        'fixed left-0 top-0 bg-white w-full h-screen p-3 transition-all duration-500',
        {
          'translate-y-full': !show,
        },
      )}>
      <div>
        <div>
          <div className='flex justify-around mt-8'>
            {(type === 'item' ? itemTrackingImages : serviceTrackingImages).map(
              (image) => (
                <div key={image}>
                  <Image
                    alt=' '
                    src={`/images/${image}`}
                    className='object-contain'
                    width={50}
                    height={50}
                  />
                </div>
              ),
            )}
          </div>

          <div className='flex justify-around mt-2'>
            <div className='text-white rounded-full w-8 h-8 border border-gray-200 bg-custom-green'>
              <CheckIcon />
            </div>
            <div className='text-white rounded-full w-8 h-8 border border-gray-200 bg-custom-green'>
              <CheckIcon />
            </div>
            <div className='text-white rounded-full w-8 h-8 border border-gray-200 bg-custom-green'>
              <CheckIcon />
            </div>
          </div>
        </div>

        <div className='text-custom-green text-lg text-center font-semibold my-10'>
          {type === 'item' ? 'Pesanan Dikirim' : 'Tracking'}
        </div>
      </div>

      <div>
        <h2 className='border-b-4 border-gray-400'>Status Pemesanan</h2>
        <ul className='space-y-3 mt-4'>
          {(type === 'item'
            ? itemSteps
            : type === 'architecture'
            ? architectureSteps
            : interiorSteps
          ).map((step) => (
            <li key={step.desc} className='flex min-h-[50px]'>
              <div
                className={classNames('w-4 h-4 rounded-full', {
                  'bg-gray-500': !step.active,
                  'bg-custom-green': step.active,
                })}></div>
              <div className='ml-4 w-full'>
                <div className='flex justify-between text-xs'>
                  <span className='block'>10 Agustus 2021</span>
                  <span className='block'>12.21 WIB</span>
                </div>
                <div
                  className='text-sm'
                  dangerouslySetInnerHTML={{ __html: step.desc }}></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex justify-center mt-8'>
        <button
          onClick={() => setShow(false)}
          className='w-10 h-10 rounded-full bg-gray-700 text-white p-1'>
          <ArrowDownIcon />
          {/* <div className='text-gray-800 block text-center w-full'>Kembali</div> */}
        </button>
      </div>
    </div>
  );
}
