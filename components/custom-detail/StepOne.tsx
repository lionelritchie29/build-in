import { ExclamationCircleIcon } from '@heroicons/react/outline';
import Layout from '../../components/shared/_layout';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CustomService } from '../../services/CustomService';
import { CustomData } from '../../models/CustomData';

type Inputs = {
  name: string;
  address: string;
  email: string;
  phone: string;
};

type Props = {
  type: 'architecture' | 'interior' | 'furniture';
  setActiveIdx: Dispatch<SetStateAction<number>>;
};

export default function StepOne({ type, setActiveIdx }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const custom = CustomService.get();
      if (custom) {
        setValue('name', custom.name ?? '');
        setValue('email', custom.email ?? '');
        setValue('address', custom.address ?? '');
        setValue('phone', custom.phone ?? '');
      }
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    address,
    email,
    phone,
  }) => {
    CustomService.save({
      name,
      address,
      email,
      phone,
    });
    setActiveIdx(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 mt-4'>
      <h1 className='text-center font-semibold text-2xl'>Verifikasi</h1>

      <div>
        <label className='block text-sm font-medium text-gray-700'>Nama</label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <input
            type='text'
            className={classNames(
              'block w-full py-2 pl-2 pr-10 border focus:outline-none sm:text-sm rounded-md',
              { 'border-gray-300': !errors.name },
              { 'border-red-300': errors.name },
            )}
            {...register('name', { required: true })}
            placeholder='Input name'
          />
          {errors.name && (
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <ExclamationCircleIcon
                className='h-5 w-5 text-red-500'
                aria-hidden='true'
              />
            </div>
          )}
        </div>
        {errors.name?.type === 'required' && (
          <p className='text-sm text-red-600' id='email-error'>
            Name is required
          </p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Alamat {type !== 'furniture' && 'Project'}
        </label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <textarea
            rows={3}
            {...register('address', { required: true })}
            className={classNames(
              'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border px-1 rounded',
              {
                'border-gray-300': !errors.address,
                'border-red-300': errors.address,
              },
            )}></textarea>
        </div>
        {errors.address?.type === 'required' && (
          <p className='text-sm text-red-600' id='email-error'>
            Address is required
          </p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>Email</label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <input
            type='text'
            className={classNames(
              'block w-full py-2 pl-2 pr-10 border focus:outline-none sm:text-sm rounded-md',
              { 'border-gray-300': !errors.email },
              { 'border-red-300': errors.email },
            )}
            {...register('email', { required: true })}
            placeholder='Input email'
          />
          {errors.email && (
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <ExclamationCircleIcon
                className='h-5 w-5 text-red-500'
                aria-hidden='true'
              />
            </div>
          )}
        </div>
        {errors.email?.type === 'required' && (
          <p className='text-sm text-red-600' id='email-error'>
            Email is required
          </p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          No. HP
        </label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <input
            type='text'
            className={classNames(
              'block w-full py-2 pl-2 pr-10 border focus:outline-none sm:text-sm rounded-md',
              { 'border-gray-300': !errors.phone },
              { 'border-red-300': errors.phone },
            )}
            {...register('phone', { required: true })}
            placeholder='Input phone number'
          />
          {errors.phone && (
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <ExclamationCircleIcon
                className='h-5 w-5 text-red-500'
                aria-hidden='true'
              />
            </div>
          )}
        </div>
        {errors.phone?.type === 'required' && (
          <p className='text-sm text-red-600' id='email-error'>
            Phone number is required
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
