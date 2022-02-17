import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  type: 'architecture' | 'interior' | 'furniture';
  setActiveIdx: Dispatch<SetStateAction<number>>;
};

export default function StepSize({ type, setActiveIdx }: Props) {
  const router = useRouter();

  const buttons = {
    architecture: [
      {
        title: 'Rincian',
        image: 'rincian_arsi.jpg',
        onClick: () => {
          router.push(`${router.asPath}/info`);
        },
      },
      {
        title: 'File',
        image: 'file_arsi.jpg',
        onClick: () => {
          router.push(`${router.asPath}/file`);
        },
      },
    ],
    interior: [
      {
        title: 'Rincian',
        image: 'rincian_interior.jpg',
        onClick: () => {
          router.push(`${router.asPath}/info`);
        },
      },
      {
        title: 'File',
        image: 'file_interior.jpg',
        onClick: () => {
          router.push(`${router.asPath}/file`);
        },
      },
    ],
    furniture: [
      {
        title: 'Rincian',
        image: 'rincian_furniture.jpg',
        onClick: () => {
          router.push(`${router.asPath}/info`);
        },
      },
      {
        title: 'Tracking',
        image: 'tracking_furniture.jpg',
        onClick: () => {
          router.push(`${router.asPath}/file`);
        },
      },
    ],
  };

  return (
    <div>
      <h1 className='text-center text-2xl font-semibold mt-4'>Final</h1>

      <div className='flex flex-col justify-center items-center mt-16'>
        <button onClick={() => buttons[type][0].onClick()}>
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

        <button onClick={() => buttons[type][1].onClick()} className='mt-10'>
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
