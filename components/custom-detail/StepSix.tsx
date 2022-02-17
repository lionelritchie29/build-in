import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';

type Props = {
  type: 'architecture' | 'interior' | 'furniture';
  setActiveIdx: Dispatch<SetStateAction<number>>;
};

export default function StepSize({ type, setActiveIdx }: Props) {
  const buttons = {
    architecture: [
      {
        title: 'Rincian',
        image: 'rincian_arsi.jpg',
      },
      {
        title: 'File',
        image: 'file_arsi.jpg',
      },
    ],
    interior: [
      {
        title: 'Rincian',
        image: 'rincian_interior.jpg',
      },
      {
        title: 'File',
        image: 'file_interior.jpg',
      },
    ],
    furniture: [
      {
        title: 'Rincian',
        image: 'rincian_furniture.jpg',
      },
      {
        title: 'Tracking',
        image: 'tracking_furniture.jpg',
      },
    ],
  };

  return (
    <div>
      <h1 className='text-center text-2xl font-semibold mt-4'>Final</h1>

      <div className='flex flex-col justify-center items-center mt-16'>
        <button>
          <Image
            src={`/images/${buttons[type][0].image}`}
            alt=''
            width={100}
            height={100}
          />
          <span className='block font-semibold text-lg -mt-2'>
            {buttons[type][0].title}
          </span>
        </button>

        <button className='mt-10'>
          <Image
            src={`/images/${buttons[type][1].image}`}
            alt=''
            width={100}
            height={100}
          />

          <span className='block font-semibold text-lg -mt-2'>
            {buttons[type][1].title}
          </span>
        </button>
      </div>
    </div>
  );
}
