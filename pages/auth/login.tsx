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
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    toast.info('Signing in...');
    setIsLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    toast.dismiss();
    if (result?.error) {
      setIsLoading(false);
      toast.error(result.error);
    } else {
      reset();
      toast.success('Login success!');
      router.push('/home');
    }
  };

  return (
    <Layout title='Login'>
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

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <input
              type='password'
              className={classNames(
                'block w-full py-2 pl-2 pr-10 border focus:outline-none sm:text-sm rounded-md',
                'border-gray-300',
              )}
              {...register('password', { required: true, minLength: 8 })}
              placeholder='Password'
            />
            {errors.password && (
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <ExclamationCircleIcon
                  className='h-5 w-5 text-red-500'
                  aria-hidden='true'
                />
              </div>
            )}
          </div>
          {errors.password?.type === 'required' && (
            <p className='text-sm text-red-600' id='email-error'>
              Password is required
            </p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className='  text-sm text-red-600' id='email-error'>
              Password should be at least 8 characters
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
            Login
          </button>

          <div className='text-right text-sm mt-2 font-medium text-gray-500 underline'>
            <Link href='/auth/login'>Forgot password?</Link>

            <div className='mt-2'>
              <Link href='/auth/register'>Dont have account yet? Register</Link>
            </div>
          </div>
        </div>
      </form>
    </Layout>
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
