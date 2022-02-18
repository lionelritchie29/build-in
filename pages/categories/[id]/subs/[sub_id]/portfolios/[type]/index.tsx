import { getSession } from 'next-auth/react';
import Layout from '../../../../../../../components/shared/_layout';
import architecture_portfolios from '../../../../../../../data/architecture_portfolios.json';
import interior_portfolios from '../../../../../../../data/interior_portfolios.json';
import categories from '../../../../../../../data/categories.json';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PortfolioPage({ data, subCategory }) {
  const router = useRouter();

  return (
    <Layout title={subCategory.title}>
      <div className='mt-3 border-b border-gray-400 pb-4'>
        <div className='flex'>
          <div className='w-1/3'>
            <Image
              src='https://i.pravatar.cc/300'
              alt={data.name}
              width={300}
              height={300}
              className='rounded-lg'
            />
          </div>

          <div className='w-2/3 ml-3'>
            <h1 className='font-semibold text-xl'>{data.name}</h1>
            <span className='block text-lg'>Est. {data.est}</span>
            <span className='block text-lg'>Project: {data.project_count}</span>
          </div>
        </div>

        <div>
          <span className='block text-lg'>
            <span className='font-medium'>Riwayat Pendidikan: </span>
            {data.education}
          </span>

          <span className='block text-lg'>
            <span className='font-medium'>Bergabung Sejak: </span>
            {data.member_since}
          </span>
        </div>
      </div>

      <ul className='mt-4 grid grid-cols-1 gap-4'>
        {data.projects.map((project) => (
          <li className='flex' key={project.id}>
            <div className='w-2/5'>
              <div className='border border-gray-300 rounded-md flex'>
                <Image
                  src={`/images/${project.image}`}
                  alt={project.name}
                  width={400}
                  height={275}
                  className='object-cover flex-1'
                />
              </div>
            </div>

            <div className='w-3/5 ml-2'>
              <span className='block text-sm -mb-2'>
                Project {subCategory.title}
              </span>
              <span className='block font-medium text-lg'>{project.name}</span>

              <Link href={`${router.asPath}/${project.id}`} passHref={true}>
                <button
                  className={classNames(
                    'inline-flex w-full justify-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 mt-3',
                  )}>
                  View Detail
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  const { id: catId, sub_id, type } = context.query;
  const rawData = [
    ...architecture_portfolios.portfolios,
    ...interior_portfolios.portfolios,
  ];

  const data = rawData.find((d) => d.type == type);

  const subCategory = categories.categories
    .find((c) => c.id == catId)
    .sub_categories.find((s) => s.id == sub_id);

  if (!data) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: { session, data, subCategory },
  };
}
