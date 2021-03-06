import { ExclamationCircleIcon } from '@heroicons/react/outline';
import Layout from '../../components/shared/_layout';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Inputs = {
  interior: string;
  width: number;
  length: number;
  height: number;
  style: string;
  photo: string;
  room: string;
};

export default function CustomInteriorForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (payload) => {
    router.push(`${router.asPath}/detail`);
  };

  const interiors = [
    'Kantor',
    'Residential',
    'Retail',
    'Hotel',
    'Komersial Merch',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 mt-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Interior
        </label>
        <select
          {...register('interior')}
          className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
          defaultValue={interiors[0]}>
          {interiors.map((int) => (
            <option key={int}>{int}</option>
          ))}
        </select>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Ruangan
        </label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <textarea
            rows={3}
            {...register('room', { required: true })}
            className={classNames(
              'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border px-1 rounded',
              {
                'border-gray-300': !errors.room,
                'border-red-300': errors.room,
              },
            )}></textarea>
        </div>
        {errors.room?.type === 'required' && (
          <p className='text-sm text-red-600' id='email-error'>
            Room is required
          </p>
        )}
      </div>

      <div className='grid grid-cols-3 gap-x-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Panjang
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <input
              type='text'
              className={classNames(
                'block w-full p-2 border focus:outline-none sm:text-sm rounded-md',
                { 'border-gray-300': !errors.length },
                { 'border-red-300': errors.length },
              )}
              {...register('length', { required: true })}
              placeholder='Panjang'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Lebar
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <input
              type='text'
              className={classNames(
                'block w-full p-2 border focus:outline-none sm:text-sm rounded-md',
                { 'border-gray-300': !errors.width },
                { 'border-red-300': errors.width },
              )}
              {...register('width', { required: true })}
              placeholder='Lebar'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Tinggi
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <input
              type='text'
              className={classNames(
                'block w-full p-2 border focus:outline-none sm:text-sm rounded-md',
                { 'border-gray-300': !errors.height },
                { 'border-red-300': errors.height },
              )}
              {...register('height', { required: true })}
              placeholder='Tinggi'
            />
          </div>
        </div>
      </div>
      {(errors.height || errors.length || errors.width) && (
        <p className='text-sm text-red-600' id='email-error'>
          Length, Width, and Height is required
        </p>
      )}

      <div>
        <label className='block text-sm font-medium text-gray-700'>Style</label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <input
            type='text'
            className={classNames(
              'block w-full py-2 pl-2 pr-10 border focus:outline-none sm:text-sm rounded-md',
              { 'border-gray-300': !errors.style },
              { 'border-red-300': errors.style },
            )}
            {...register('style', { required: true })}
            placeholder='Input material'
          />
          {errors.style && (
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <ExclamationCircleIcon
                className='h-5 w-5 text-red-500'
                aria-hidden='true'
              />
            </div>
          )}
        </div>
        {errors.style?.type === 'required' && (
          <p className='text-sm text-red-600' id='email-error'>
            Style is required
          </p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Referensi Foto
        </label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <textarea
            rows={3}
            {...register('photo', { required: true })}
            className={classNames(
              'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border px-1 rounded',
              {
                'border-gray-300': !errors.photo,
                'border-red-300': errors.photo,
              },
            )}></textarea>
        </div>
        {errors.photo?.type === 'required' && (
          <p className='text-sm text-red-600' id='email-error'>
            Photo is required
          </p>
        )}
      </div>

      <div className='mt-4'>
        <button
          type='submit'
          disabled={isLoading}
          className={classNames(
            'inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
            {
              'bg-primary-light hover:bg-primary-dark': !isLoading,
              'bg-gray-400': isLoading,
            },
          )}>
          Save
        </button>
      </div>
    </form>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
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
