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
  userNote: string;
  designerNote: string;
};

type Props = {
  type: 'architecture' | 'interior' | 'furniture';
  setActiveIdx: Dispatch<SetStateAction<number>>;
};

export default function StepThree({ type, setActiveIdx }: Props) {
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
        setValue('userNote', custom.revisionOne?.designerNote ?? '');
        setValue('designerNote', custom.revisionOne?.userNote ?? '');
      }
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<Inputs> = async ({
    userNote,
    designerNote,
  }) => {
    const custom = CustomService.get();
    CustomService.save({
      name: custom.name,
      email: custom.email,
      phone: custom.phone,
      address: custom.address,
      consultation: {
        userNote: custom.consultation?.userNote,
        designerNote: custom.consultation?.designerNote,
      },
      revisionOne: {
        userNote,
        designerNote,
      },
    });
    setActiveIdx(3);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 mt-4'>
      <h1 className='text-center font-semibold text-2xl'>Revisi 1</h1>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Catatan Pembeli
        </label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <textarea
            rows={3}
            {...register('userNote', { required: true })}
            className={classNames(
              'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border px-1 rounded',
              {
                'border-gray-300': !errors.userNote,
                'border-red-300': errors.userNote,
              },
            )}></textarea>
        </div>
        {errors.userNote?.type === 'required' && (
          <p className='text-sm text-red-600' id='email-error'>
            User note is required
          </p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-right text-gray-700'>
          Catatan Desainer
        </label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <textarea
            rows={3}
            {...register('designerNote', { required: true })}
            className={classNames(
              'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border px-1 rounded',
              {
                'border-gray-300': !errors.designerNote,
                'border-red-300': errors.designerNote,
              },
            )}></textarea>
        </div>
        {errors.designerNote?.type === 'required' && (
          <p className='text-sm text-red-600' id='email-error'>
            Designer note is required
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
