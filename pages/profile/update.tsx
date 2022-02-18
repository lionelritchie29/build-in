import { ExclamationCircleIcon } from '@heroicons/react/outline';
import Layout from '../../components/shared/_layout';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { UsersService } from '../../services/UsersService';
import { ApiResponse } from '../../models/ApiResponse';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { User } from '../../models/User';

type Inputs = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
  cpassword: string;
};

type Props = {
  user: User;
};

export default function UpdateProfile({ user }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [dob, setDob] = useState(new Date(user.dob));
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState({
    male: user.gender === 'male',
    female: user.gender === 'female',
  });
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const usersService = new UsersService();
    const payload = { ...data, dob: dob.toISOString().substring(0, 10) };

    if (payload.password) {
      if (payload.password.length < 8) {
        setMessage('Password should be at least 8 characters');
        return;
      } else if (!payload.cpassword) {
        setMessage('Confirmation password must be filled');
        return;
      } else if (payload.password !== payload.cpassword) {
        setMessage('Password confirmation does not match');
        return;
      }
      setMessage('');
    }

    setIsLoading(true);
    const res = await toast.promise(usersService.update(user._id, payload), {
      pending: 'Processing your request...',
      success: {
        render({ data }: { data: ApiResponse<any> }) {
          if (data.success) reset();
          return `${data.success ? 'Update success!' : data.message}`;
        },
      },
      error: 'Ups, something is wrong. Please contact your developer.',
    });

    if (res.success) {
      router.push('/profile');
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Layout title='Bu!ld-In'>
      <h1 className='mt-2 mb-4 font-semibold text-xl text-center'>
        Ubah Profile
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Full Name
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <input
              type='text'
              className={classNames(
                'block w-full py-2 pl-2 pr-10 border focus:outline-none sm:text-sm rounded-md',
                'border-gray-300',
              )}
              {...register('name', { required: true })}
              defaultValue={user.name}
              placeholder='John Doe'
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
          {errors.name && (
            <p className='  text-sm text-red-600' id='email-error'>
              Name must be filled
            </p>
          )}
        </div>

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
              defaultValue={user.email}
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
            Phone Number
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <input
              type='text'
              className={classNames(
                'block w-full py-2 pl-2 pr-10 border focus:outline-none sm:text-sm rounded-md',
                'border-gray-300',
              )}
              {...register('phone', { required: true })}
              defaultValue={user.phone}
              placeholder='08xx xxxx xxxx'
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
          {errors.phone && (
            <p className='  text-sm text-red-600' id='email-error'>
              Phone number must be filled
            </p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Gender
          </label>
          <div className='mt-1 flex space-x-4 relative'>
            <div>
              <input
                name='gender'
                type='radio'
                defaultValue='male'
                {...register('gender', { required: true })}
                checked={gender.male}
              />
              <span className='ml-1'>Male</span>
            </div>

            <div>
              <input
                name='gender'
                type='radio'
                defaultValue='female'
                {...register('gender', { required: true })}
                checked={gender.female}
              />
              <span className='ml-1'>Female</span>
            </div>
          </div>
          {errors.gender && (
            <p className='  text-sm text-red-600' id='email-error'>
              Gender must be chosen
            </p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Date of Birth
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <DatePicker
              className='p-2 border border-gray-300 w-full rounded-md shadow-sm'
              selected={dob}
              onChange={(date) => setDob(date)}
            />
          </div>
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
              {...register('password')}
              placeholder='Password'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Confirm Password
          </label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <input
              type='password'
              className={classNames(
                'block w-full py-2 pl-2 pr-10 border focus:outline-none sm:text-sm rounded-md',
                'border-gray-300',
              )}
              {...register('cpassword')}
              placeholder='Confirm Password'
            />
          </div>
        </div>

        <div className='mt-4'>
          <button
            disabled={isLoading}
            type='submit'
            className={classNames(
              'inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
              {
                'bg-primary-light hover:bg-primary-dark': !isLoading,
                'bg-gray-400': isLoading,
              },
            )}>
            Submit
          </button>
          {message && <small className='text-red-500'>{message}</small>}
        </div>
      </form>
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

  const usersService = new UsersService();
  const id = (session.user as User)._id;
  const result = await usersService.get(id);

  if (!result.success) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: { session, user: { ...result.data, password: '' } },
  };
}
