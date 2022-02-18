import { ExclamationCircleIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Layout from '../../components/shared/_layout';

type Inputs = {
  email: string;
};

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    console.log(email);
  };

  return (
    <Layout title='Forgot Password'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 mt-12'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <input
              type='text'
              className={classNames(
                'block w-full py-2 pl-2 pr-10 border focus:outline-none sm:text-sm rounded-md',
                'border-gray-300',
              )}
              {...register('email', { required: true })}
              placeholder='you@example.com'
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
          {errors.email && (
            <p className='  text-sm text-red-600' id='email-error'>
              Email must be filled
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
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}
