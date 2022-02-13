import { ExclamationCircleIcon } from '@heroicons/react/outline';
import Layout from '../../components/shared/_layout';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { AuthService } from '../../services/AuthService';
import { ApiResponse } from '../../models/ApiResponse';
import { zeroPad } from '../../lib/helper';

type Inputs = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
  cpassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [dob, setDob] = useState(new Date());
  const confirmPass = watch('cpassword');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const authService = new AuthService();
    const payload = { ...data, dob: dob.toISOString().substring(0, 10) };

    toast.promise(authService.register(payload), {
      pending: 'Processing your request...',
      success: {
        render({ data }: { data: ApiResponse<any> }) {
          if (data.success) reset();
          return `${data.success ? 'Register Success!' : data.message}`;
        },
      },
      error: 'Ups, something is wrong. Please contact your developer.',
    });
  };

  return (
    <Layout title='Register'>
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
              placeholder='John Doe'
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
              placeholder='08xx xxxx xxxx'
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
                value='male'
                {...register('gender', { required: true })}
              />
              <span className='ml-1'>Male</span>
            </div>

            <div>
              <input
                name='gender'
                type='radio'
                value='female'
                {...register('gender', { required: true })}
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
              {...register('cpassword', {
                validate: (val) => val === confirmPass,
              })}
              placeholder='Confirm Password'
            />
            {errors.cpassword && (
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <ExclamationCircleIcon
                  className='h-5 w-5 text-red-500'
                  aria-hidden='true'
                />
              </div>
            )}
          </div>
          {errors.cpassword && (
            <p className='  text-sm text-red-600' id='email-error'>
              Password confirmation does not match
            </p>
          )}
        </div>

        <div className='mt-4'>
          <button
            type='submit'
            className='inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}
