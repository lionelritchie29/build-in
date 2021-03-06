import classNames from 'classnames';
import { getSession } from 'next-auth/react';
import Layout from '../../../../components/shared/_layout';

export default function CustomTracking() {
  const steps = [
    'Proses verifikasi  05/08/2021  14:30 WIB',
    'Proses konsultasi  05/08/2021  15:00 WIB',
    'Proses revisi 1  07/08/2021  11:00 WIB',
    'Proses revisi 2  10/08/2021  10:00 WIB',
    'Proses revisi 3  12/08/2021  12:30 WIB',
    'Proses final  15/08/2021  13:30 WIB',
  ];

  return (
    <Layout title='Tracking'>
      <div className='mt-4'>
        <h1 className='text-lg font-semibold'>Tracking Custom</h1>
        <ul className='mt-3 space-y-7'>
          {steps.map((step, idx) => (
            <li key={step} className='flex items-center'>
              <span
                className='relative block w-6 h-6 rounded-full'
                style={{ background: '#184d4e' }}>
                {idx !== 0 && (
                  <div className='-z-10 absolute bottom-2 right-3 h-16 border-r-2 border-green-900'></div>
                )}
              </span>
              <span className='block font-medium text-sm ml-4'>{step}</span>
            </li>
          ))}
        </ul>
      </div>
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

  const { type } = context.query;

  if (!type) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  const previousUrl = context.req.headers.referer;
  if (!previousUrl || !previousUrl.includes(`/custom/${type}/detail`)) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: { session, type },
  };
}
