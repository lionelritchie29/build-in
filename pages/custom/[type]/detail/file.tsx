import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Layout from '../../../../components/shared/_layout';
import { capitalizeFirstLetter } from '../../../../lib/helper';

type Props = {
  type: 'architecture' | 'interior' | 'furniture';
};

export default function CustomFile({ type }: Props) {
  const files = {
    architecture: ['arsi1.jpg', 'arsi2.jpg', 'arsi3.jpg'],
    interior: ['interior1.jpg', 'interior2.jpg', 'interior3.jpg'],
  };

  return (
    <Layout title='File'>
      <div className='mt-4'>
        <h1 className='font-semibold text-xl'>
          File {capitalizeFirstLetter(type)}
        </h1>

        <div className='grid grid-cols-1 gap-4 mt-3'>
          {files[type].map((file) => (
            <div key={file}>
              <Image
                src={`/images/${file}`}
                className='rounded'
                alt=''
                width={400}
                height={350}
              />
            </div>
          ))}
        </div>
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

  if (type === 'furniture') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session, type },
  };
}
