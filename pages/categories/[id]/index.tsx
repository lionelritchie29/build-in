import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../../components/shared/_layout';
import dummy from '../../../data/categories.json';
import { Category } from '../../../models/Category';

export default function SubCategoryPage({ category }) {
  return (
    <Layout title={category.title}>
      <ul className='grid grid-cols-2 gap-x-8 gap-y-16 px-2 py-8'>
        {category.sub_categories.map((sub) => (
          <li className='cursor-pointer' key={sub.id}>
            <Link
              href={`/categories/${category.id}/subs/${sub.id}/products`}
              passHref={true}>
              <div className='flex flex-col justify-center'>
                <Image
                  width={125}
                  height={110}
                  src={`/images/${sub.image}`}
                  alt={sub.title}
                />
                <span className='block text-center font-semibold text-xl'>
                  {sub.title}
                </span>
              </div>
            </Link>
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
        destination: '/',
        permanent: false,
      },
    };
  }

  const { id } = context.query;
  const categories: Category[] = dummy.categories;
  const category: Category = categories.find((c) => c.id == id);

  if (!category) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: { session, category },
  };
}
